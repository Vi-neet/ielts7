const WEB3FORMS_KEY = "61d09f73-58b6-4762-8542-87325de248f3";

export interface SpeakingEmailPayload {
  type: "new_booking" | "session_confirmed" | "feedback_ready";
  referenceId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  slotDate: string;
  slotTime: string;
  targetBand?: string;
  meetingLink?: string;
  estimatedBand?: string;
  feedbackText?: string;
}

export async function sendSpeakingEmail(payload: SpeakingEmailPayload): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("from_name", "IELTS 7+ Speaking Practice");
    formData.append("replyto", payload.candidateEmail);

    let subject = "";
    let message = "";

    if (payload.type === "new_booking") {
      subject = `[New Booking] IELTS Speaking Practice (${payload.referenceId}) - ${payload.candidateName}`;
      message = `
New IELTS Speaking Practice Session Booked!

Booking Reference: ${payload.referenceId}
Candidate Name: ${payload.candidateName}
Email: ${payload.candidateEmail}
WhatsApp Phone: ${payload.candidatePhone}
Target Band: ${payload.targetBand || "7.0"}

Session Scheduled:
Date: ${payload.slotDate}
Time: ${payload.slotTime}

Manage this booking in the Admin Dashboard: https://ielts7plushouse.com/admin
      `.trim();
    } else if (payload.type === "session_confirmed") {
      subject = `[Confirmed] Your IELTS Speaking Practice Session (${payload.referenceId})`;
      message = `
Hi ${payload.candidateName},

Great news! Your 1-on-1 IELTS Speaking Practice session has been CONFIRMED by our instructor.

Session Details:
- Reference ID: ${payload.referenceId}
- Date: ${payload.slotDate}
- Time: ${payload.slotTime}
- Meeting Link: ${payload.meetingLink || "Will be shared on WhatsApp"}

Join your Google Meet session on time. Good luck with your preparation!

View your session details: https://ielts7plushouse.com/profile
      `.trim();
    } else if (payload.type === "feedback_ready") {
      subject = `[Score Report] IELTS Speaking Practice Feedback (${payload.referenceId})`;
      message = `
Hi ${payload.candidateName},

Your IELTS Speaking Practice feedback report is ready!

Overall Estimated Band: ${payload.estimatedBand || "N/A"}

Examiner Feedback:
${payload.feedbackText || "No feedback summary provided."}

View full session details in your Candidate Dashboard: https://ielts7plushouse.com/profile
      `.trim();
    }

    formData.append("subject", subject);
    formData.append("message", message);
    
    // For new_booking alerts, route to admin email (varunsaxena5elc@gmail.com). Otherwise, route to candidate.
    const recipientEmail = payload.type === "new_booking" ? "varunsaxena5elc@gmail.com" : payload.candidateEmail;
    formData.append("to_email", recipientEmail);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    return result.success === true;
  } catch (err) {
    console.error("Failed to send speaking email:", err);
    return false;
  }
}
