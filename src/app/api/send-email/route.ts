import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, referenceId, candidateName, candidateEmail, candidatePhone, slotDate, slotTime, meetingLink, estimatedBand, feedbackText, targetBand } = body;

    if (!candidateEmail) {
      return NextResponse.json({ success: false, error: "Missing candidate email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "meenunarula1104@gmail.com";

    // Standard HTML email template wrapper
    const wrapHtml = (title: string, bodyContent: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f2; margin: 0; padding: 20px; color: #1a3300; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2ebd8; }
          .header { background: #1a3300; padding: 30px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .content { padding: 30px; }
          .badge { display: inline-block; padding: 6px 14px; background: #ecfdf5; color: #047857; font-weight: bold; border-radius: 20px; font-size: 13px; margin-bottom: 15px; }
          .details-card { background: #f8faf6; border: 1px solid #e2ebd8; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2ebd8; font-size: 14px; }
          .detail-row:last-child { border-bottom: none; }
          .btn { display: inline-block; padding: 14px 28px; background: #10b981; color: #ffffff !important; font-weight: bold; text-decoration: none; border-radius: 12px; margin-top: 20px; font-size: 15px; text-align: center; }
          .footer { background: #fafcf8; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #edf2e8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>IELTS 7+ House</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">1-on-1 Free Speaking Practice</p>
          </div>
          <div class="content">
            ${bodyContent}
          </div>
          <div class="footer">
            <p>IELTS 7+ House — Premium IELTS Preparation Hub</p>
            <p>Need help? Contact Instructor WhatsApp: +91 81780 55015</p>
          </div>
        </div>
      </body>
      </html>
    `;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        if (type === "new_booking") {
          // 1. Send confirmation to Student
          const res1 = await resend.emails.send({
            from: "IELTS 7+ Practice <onboarding@resend.dev>",
            to: [candidateEmail],
            subject: `🎉 Booking Reserved: IELTS Speaking Practice (${referenceId})`,
            html: wrapHtml(
              "Booking Reserved",
              `
              <span class="badge">✓ Booking Confirmed</span>
              <h2>Hi ${candidateName},</h2>
              <p>Your 1-on-1 IELTS Speaking Practice session has been successfully booked!</p>
              
              <div class="details-card">
                <div class="detail-row"><strong>Booking Reference:</strong> <span style="font-family: monospace; color: #047857;">${referenceId}</span></div>
                <div class="detail-row"><strong>Date:</strong> <span>${slotDate}</span></div>
                <div class="detail-row"><strong>Time:</strong> <span>${slotTime}</span></div>
                <div class="detail-row"><strong>Target Band:</strong> <span>${targetBand || "7.0+"}</span></div>
              </div>

              ${meetingLink ? `<p>Your video call room is ready:</p><a href="${meetingLink}" class="btn" target="_blank">Join HD Meeting Room</a>` : ""}
              
              <p style="margin-top: 25px; font-size: 13px; color: #4b5563;">You can view and manage your session anytime in your <a href="https://ielts7plushouse.com/profile" style="color: #047857;">Candidate Dashboard</a>.</p>
              `
            ),
          });

          if (res1.error) throw new Error(res1.error.message);

          // 2. Send notification to Admin
          await resend.emails.send({
            from: "IELTS 7+ System <onboarding@resend.dev>",
            to: [adminEmail],
            subject: `[New Student Booking] ${candidateName} (${referenceId})`,
            html: wrapHtml(
              "New Student Booking",
              `
              <h2>New Speaking Session Booked!</h2>
              <div class="details-card">
                <div class="detail-row"><strong>Candidate:</strong> <span>${candidateName}</span></div>
                <div class="detail-row"><strong>Email:</strong> <span>${candidateEmail}</span></div>
                <div class="detail-row"><strong>WhatsApp:</strong> <span>${candidatePhone}</span></div>
                <div class="detail-row"><strong>Date & Time:</strong> <span>${slotDate} at ${slotTime}</span></div>
                <div class="detail-row"><strong>Ref ID:</strong> <span>${referenceId}</span></div>
              </div>
              <a href="https://ielts7plushouse.com/admin" class="btn">Open Admin Dashboard</a>
              `
            ),
          });
        } else if (type === "session_confirmed") {
          const resConfirmed = await resend.emails.send({
            from: "IELTS 7+ Practice <onboarding@resend.dev>",
            to: [candidateEmail],
            subject: `✅ Confirmed: IELTS Speaking Session (${referenceId})`,
            html: wrapHtml(
              "Session Confirmed",
              `
              <span class="badge">✓ Instructor Confirmed</span>
              <h2>Hi ${candidateName},</h2>
              <p>Your upcoming speaking practice session has been confirmed by your instructor!</p>
              
              <div class="details-card">
                <div class="detail-row"><strong>Date:</strong> <span>${slotDate}</span></div>
                <div class="detail-row"><strong>Time:</strong> <span>${slotTime}</span></div>
                <div class="detail-row"><strong>Meeting Link:</strong> <span>${meetingLink || "Ready below"}</span></div>
              </div>

              <a href="${meetingLink || "https://ielts7plushouse.com/profile"}" class="btn" target="_blank">Join Meeting Call</a>
              `
            ),
          });
          if (resConfirmed.error) throw new Error(resConfirmed.error.message);
        } else if (type === "feedback_ready") {
          const resFeedback = await resend.emails.send({
            from: "IELTS 7+ Practice <onboarding@resend.dev>",
            to: [candidateEmail],
            subject: `📊 Examiner Feedback & Score Report (${referenceId})`,
            html: wrapHtml(
              "Score Report Ready",
              `
              <span class="badge" style="background: #e0f2fe; color: #0369a1;">📊 Band Score Ready</span>
              <h2>Hi ${candidateName},</h2>
              <p>Your IELTS Speaking Practice score report and examiner feedback are ready!</p>
              
              <div class="details-card" style="background: #f0fdf4; border-color: #bbf7d0;">
                <h3 style="margin-top: 0; color: #166534;">Estimated Overall Band Score: ${estimatedBand || "N/A"}</h3>
                <p style="white-space: pre-line; color: #1f2937; font-size: 14px;">${feedbackText || "Great effort! Keep practicing."}</p>
              </div>

              <a href="https://ielts7plushouse.com/profile" class="btn">View Full Dashboard Report</a>
              `
            ),
          });
          if (resFeedback.error) throw new Error(resFeedback.error.message);
        }

        return NextResponse.json({ success: true, provider: "resend" });
      } catch (resendError: any) {
        console.warn("Resend API failed, activating Web3Forms fallback:", resendError.message);
      }
    }

    // Fallback: Web3Forms if RESEND_API_KEY is not configured or fails
    const WEB3FORMS_KEY = "61d09f73-58b6-4762-8542-87325de248f3";
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("from_name", "IELTS 7+ Speaking");
    formData.append("subject", `[IELTS 7+] ${type.replace("_", " ").toUpperCase()} (${referenceId}) - ${candidateName}`);
    formData.append(
      "message",
      `Session Ref: ${referenceId}\nCandidate: ${candidateName}\nEmail: ${candidateEmail}\nPhone: ${candidatePhone}\nDate: ${slotDate} ${slotTime}\nMeeting Link: ${meetingLink || "N/A"}`
    );

    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    return NextResponse.json({ success: true, provider: "web3forms_fallback" });
  } catch (err: any) {
    console.error("Send email error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
