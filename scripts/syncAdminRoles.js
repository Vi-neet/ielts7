const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../ielts7-48b25-firebase-adminsdk-fbsvc-ca91f1dcce.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const ADMIN_EMAILS = [
  "meenunarula1104@gmail.com",
  "varunsaxena5elc@gmail.com",
  ...(process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()),
].filter(Boolean);

async function main() {
  console.log("Fetching users from Firestore...");
  const usersSnap = await db.collection("users").get();
  console.log(`Found ${usersSnap.size} user documents.`);

  for (const docSnap of usersSnap.docs) {
    const data = docSnap.data();
    const userEmail = (data.email || "").toLowerCase().trim();

    if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
      console.log(`Setting admin role for verified email: ${userEmail} (${docSnap.id})`);
      await docSnap.ref.set({ role: "admin" }, { merge: true });
    } else {
      console.log(`Skipping non-admin user: ${userEmail || docSnap.id}`);
    }
  }

  console.log("SUCCESS: Admin roles synchronized for authorized emails.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error upgrading roles:", err);
  process.exit(1);
});
