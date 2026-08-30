const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const path = require("path");

async function deployRules() {
  console.log("Authenticating with Firebase Admin Service Account...");
  const auth = new GoogleAuth({
    keyFile: path.join(__dirname, "../ielts7-48b25-firebase-adminsdk-fbsvc-ca91f1dcce.json"),
    scopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/firebase",
    ],
  });

  const client = await auth.getClient();
  const rulesContent = fs.readFileSync(path.join(__dirname, "../firestore.rules"), "utf8");
  const projectId = "ielts7-48b25";

  console.log("Reading firestore.rules and creating new ruleset on Firebase...");
  const createRulesetUrl = `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`;
  const rulesetRes = await client.request({
    url: createRulesetUrl,
    method: "POST",
    data: {
      source: {
        files: [
          {
            name: "firestore.rules",
            content: rulesContent,
          },
        ],
      },
    },
  });

  const rulesetName = rulesetRes.data.name;
  console.log(`Created Ruleset: ${rulesetName}`);

  console.log("Releasing ruleset to 'cloud.firestore'...");
  const updateReleaseUrl = `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases/cloud.firestore`;
  const releaseRes = await client.request({
    url: updateReleaseUrl,
    method: "PATCH",
    data: {
      release: {
        name: `projects/${projectId}/releases/cloud.firestore`,
        rulesetName: rulesetName,
      },
    },
  });

  console.log("SUCCESS: Firestore Security Rules deployed live to Firebase Cloud Firestore!");
  process.exit(0);
}

deployRules().catch((err) => {
  console.error("Error deploying firestore.rules:", err.response?.data || err.message || err);
  process.exit(1);
});
