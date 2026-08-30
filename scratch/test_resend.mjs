import { Resend } from "../node_modules/resend/dist/index.mjs";
import fs from "fs";
import path from "path";

const envContent = fs.readFileSync(path.resolve("./.env.local"), "utf8");
const envVars = {};
envContent.split("\n").forEach(line => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    envVars[parts[0].trim()] = parts.slice(1).join("=").trim();
  }
});

async function testResend() {
  const apiKey = envVars.RESEND_API_KEY;
  console.log("Testing Resend API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT FOUND");

  if (!apiKey) {
    console.error("Error: RESEND_API_KEY is missing in .env.local");
    return;
  }

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from: "IELTS 7+ Practice <onboarding@resend.dev>",
      to: ["varunsaxena5elc@gmail.com"],
      subject: "🧪 Test Email: IELTS 7+ Speaking Resend Integration",
      html: "<h1 style='color: #047857;'>Resend Integration Works!</h1><p>Your Resend API Key is active and successfully delivering emails to candidates!</p>"
    });

    console.log("Resend API Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Resend API Exception:", err);
  }
}

testResend();
