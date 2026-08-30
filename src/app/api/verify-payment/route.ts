import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

// Initialize Firebase Admin SDK using modular exports
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ielts7-48b25";

let hasAdminCredentials = false;

if (getApps().length === 0) {
  try {
    // 1. Check environment variables first (safest for serverless/cloud environments)
    if (clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
      hasAdminCredentials = true;
      console.log("Firebase Admin initialized successfully using service account environment variables.");
    } else {
      // 2. Fallback to local service account file if available
      try {
        const rootFiles = fs.readdirSync(process.cwd());
        const serviceAccountFile = rootFiles.find(
          (f) =>
            f === "firebase-service-account.json" ||
            (f.includes("firebase-adminsdk") && f.endsWith(".json"))
        );

        if (serviceAccountFile) {
          const serviceAccountPath = path.join(process.cwd(), serviceAccountFile);
          const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
          initializeApp({
            credential: cert(serviceAccount),
          });
          hasAdminCredentials = true;
          console.log(`Firebase Admin initialized successfully using dynamic key file: ${serviceAccountFile}`);
        } else {
          initializeApp({ projectId });
          console.warn("⚠️ Firebase Admin initialized without credentials (keys missing).");
        }
      } catch (fsErr) {
        initializeApp({ projectId });
        console.warn("⚠️ Firebase Admin initialized without credentials (filesystem read error).", fsErr);
      }
    }
  } catch (err) {
    console.error("Firebase Admin initialization error:", err);
  }
} else {
  // Check if credentials are present
  hasAdminCredentials = !!(clientEmail && privateKey);
  if (!hasAdminCredentials) {
    try {
      const rootFiles = fs.readdirSync(process.cwd());
      const serviceAccountFile = rootFiles.find(
        (f) =>
          f === "firebase-service-account.json" ||
          (f.includes("firebase-adminsdk") && f.endsWith(".json"))
      );
      hasAdminCredentials = !!serviceAccountFile;
    } catch {
      hasAdminCredentials = false;
    }
  }
}

export async function POST(request: Request) {
  try {
    // --- Verify Server-Side Authentication ---
    const authHeader = request.headers.get("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing or invalid authorization token." },
        { status: 401 }
      );
    }

    const idToken = authHeader.substring(7).trim();
    if (!idToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Empty authentication token provided." },
        { status: 401 }
      );
    }

    let verifiedUid: string;
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      verifiedUid = decodedToken.uid;
    } catch (authErr: any) {
      console.error("Firebase ID token verification failed:", authErr);
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or expired session token. Please re-login." },
        { status: 401 }
      );
    }

    // --- Parse Request Body ---
    const { paymentId, taskType, essayText, notes } = await request.json();

    if (!paymentId || !taskType || !essayText) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (paymentId, taskType, essayText)." },
        { status: 400 }
      );
    }

    if (taskType !== "task_1" && taskType !== "task_2") {
      return NextResponse.json(
        { success: false, error: "Invalid taskType. Must be 'task_1' or 'task_2'." },
        { status: 400 }
      );
    }

    const words = essayText.trim().split(/\s+/).filter(Boolean);
    if (words.length < 50) {
      return NextResponse.json(
        { success: false, error: `Essay is too short (${words.length} words). Minimum is 50 words.` },
        { status: 400 }
      );
    }
    if (words.length > 1000) {
      return NextResponse.json(
        { success: false, error: `Essay exceeds word limit (${words.length} words). Maximum is 1000 words.` },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: "Razorpay credentials are not configured on the server." },
        { status: 500 }
      );
    }

    if (!paymentId.startsWith("pay_") || paymentId.length <= 10) {
      return NextResponse.json(
        { success: false, error: "Invalid payment ID format." },
        { status: 400 }
      );
    }

    // --- Secure Server-Side Razorpay API Verification ---
    const rzpAuthHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
    
    const rzpResponse = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: rzpAuthHeader,
      },
    });

    if (!rzpResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed with Razorpay API." },
        { status: 400 }
      );
    }

    let payment = await rzpResponse.json();
    console.log("Razorpay payment status:", {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
    });

    // If payment is authorized but not yet captured, auto-capture it via Razorpay API
    if (payment.status === "authorized") {
      try {
        const captureRes = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/capture`, {
          method: "POST",
          headers: {
            Authorization: rzpAuthHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: payment.amount || 4900, currency: "INR" }),
        });
        if (captureRes.ok) {
          payment = await captureRes.json();
          console.log("Payment successfully auto-captured:", payment.id, payment.status);
        } else {
          console.warn("Auto-capture returned non-ok status:", await captureRes.text());
        }
      } catch (captureErr) {
        console.error("Auto-capture failed:", captureErr);
      }
    }

    // Enforce: status MUST be captured, currency INR, amount 4900 paise (₹49)
    const isValidStatus = payment.status === "captured";
    const isValidAmount = payment.amount === 4900;
    const isValidCurrency = payment.currency === "INR";

    if (!isValidStatus || !isValidAmount || !isValidCurrency) {
      console.error("Payment validation check failed:", {
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
      });
      return NextResponse.json(
        {
          success: false,
          error: `Payment validation failed: status is '${payment.status}' (expected 'captured'), amount is ₹${(payment.amount || 0) / 100} (expected ₹49).`,
        },
        { status: 400 }
      );
    }

    // --- Enforce Credentials Check ---
    if (!hasAdminCredentials) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Firebase Admin credentials are not configured on the server." 
        },
        { status: 500 }
      );
    }

    // --- Prevent Double-Spending Bypasses ---
    const db = getFirestore();
    const duplicateQuery = await db
      .collection("writingSubmissions")
      .where("paymentId", "==", paymentId)
      .limit(1)
      .get();

    if (!duplicateQuery.empty) {
      return NextResponse.json(
        { success: false, error: "This Payment ID has already been used for an essay submission." },
        { status: 400 }
      );
    }

    // --- Save Verified Essay Submission ---
    const submissionRef = db.collection("writingSubmissions").doc();
    const timestamp = FieldValue.serverTimestamp();

    await submissionRef.set({
      uid: verifiedUid,
      taskType,
      submissionMethod: "text",
      essayText,
      storagePath: null,
      fileName: null,
      fileSize: null,
      wordCount: words.length,
      notes: notes?.trim() || null,
      status: "submitted",
      paymentId,
      submittedAt: timestamp,
      updatedAt: timestamp,
    });

    return NextResponse.json({ success: true, submissionId: submissionRef.id });
  } catch (error: any) {
    console.error("verify-payment API handler error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
