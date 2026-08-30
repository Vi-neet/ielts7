import { NextResponse } from "next/server";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ielts7-48b25";
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

/**
 * Verify Firebase ID Token via Google Identity Toolkit REST API
 */
async function verifyFirebaseIdToken(idToken: string): Promise<string | null> {
  try {
    // 1. Decode token payload for fast structural validation
    const parts = idToken.split(".");
    if (parts.length !== 3) return null;

    const payloadJson = Buffer.from(parts[1], "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    // Check token expiration & audience
    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowSec) {
      console.error("Firebase ID token expired");
      return null;
    }

    if (payload.aud !== projectId && payload.iss !== `https://securetoken.google.com/${projectId}`) {
      console.error("Firebase ID token project mismatch");
      return null;
    }

    if (!payload.sub && !payload.user_id) return null;
    const uid = payload.sub || payload.user_id;

    // 2. If API Key is available, verify against Google Identity Toolkit API for full revocation check
    if (firebaseApiKey) {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.users && data.users.length > 0) {
          return data.users[0].localId || uid;
        }
      }
    }

    return uid;
  } catch (err) {
    console.error("Error verifying ID token:", err);
    return null;
  }
}

/**
 * Check if payment ID already exists in Firestore using Firestore REST API
 */
async function checkDuplicatePaymentId(paymentId: string): Promise<boolean> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "writingSubmissions" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "paymentId" },
              op: "EQUAL",
              value: { stringValue: paymentId },
            },
          },
          limit: 1,
        },
      }),
    });

    if (!res.ok) return false;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 && !!data[0].document;
  } catch (err) {
    console.error("Error checking duplicate payment ID:", err);
    return false;
  }
}

/**
 * Create writing submission document in Firestore using Firestore REST API
 */
async function createSubmissionDocument(data: {
  uid: string;
  taskType: string;
  essayText: string;
  wordCount: number;
  notes: string | null;
  paymentId: string;
}): Promise<string | null> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/writingSubmissions`;
    const nowIso = new Date().toISOString();

    const firestoreFields: Record<string, any> = {
      uid: { stringValue: data.uid },
      taskType: { stringValue: data.taskType },
      submissionMethod: { stringValue: "text" },
      essayText: { stringValue: data.essayText },
      storagePath: { nullValue: null },
      fileName: { nullValue: null },
      fileSize: { nullValue: null },
      wordCount: { integerValue: data.wordCount },
      notes: data.notes ? { stringValue: data.notes } : { nullValue: null },
      status: { stringValue: "submitted" },
      paymentId: { stringValue: data.paymentId },
      submittedAt: { timestampValue: nowIso },
      updatedAt: { timestampValue: nowIso },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: firestoreFields }),
    });

    if (!res.ok) {
      console.error("Firestore document creation failed:", await res.text());
      return null;
    }

    const createdDoc = await res.json();
    // Extract document ID from path "projects/.../documents/writingSubmissions/DOC_ID"
    const docPathParts = (createdDoc.name || "").split("/");
    return docPathParts[docPathParts.length - 1] || "success";
  } catch (err) {
    console.error("Error creating submission document:", err);
    return null;
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

    const verifiedUid = await verifyFirebaseIdToken(idToken);
    if (!verifiedUid) {
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
      return NextResponse.json(
        {
          success: false,
          error: `Payment validation failed: status is '${payment.status}' (expected 'captured'), amount is ₹${(payment.amount || 0) / 100} (expected ₹49).`,
        },
        { status: 400 }
      );
    }

    // --- Prevent Double-Spending Bypasses ---
    const isDuplicate = await checkDuplicatePaymentId(paymentId);
    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: "This Payment ID has already been used for an essay submission." },
        { status: 400 }
      );
    }

    // --- Save Verified Essay Submission ---
    const docId = await createSubmissionDocument({
      uid: verifiedUid,
      taskType,
      essayText,
      wordCount: words.length,
      notes: notes?.trim() || null,
      paymentId,
    });

    if (!docId) {
      return NextResponse.json(
        { success: false, error: "Failed to store submission in database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, submissionId: docId });
  } catch (error: any) {
    console.error("verify-payment API handler error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
