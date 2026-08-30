const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../ielts7-48b25-firebase-adminsdk-fbsvc-ca91f1dcce.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function main() {
  console.log("Fetching users from Firestore...");
  const usersSnap = await db.collection("users").get();
  console.log(`Found ${usersSnap.size} user documents.`);

  for (const docSnap of usersSnap.docs) {
    const data = docSnap.data();
    console.log(`Updating user ${docSnap.id} (${data.email || "No email"}) -> setting role: admin`);
    await docSnap.ref.set({ role: "admin" }, { merge: true });
  }

  console.log("SUCCESS: All existing users in Firestore upgraded to role: admin!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error upgrading roles:", err);
  process.exit(1);
});
