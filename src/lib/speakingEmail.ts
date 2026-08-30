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
    const baseUrl = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result.success === true;
  } catch (err) {
    console.error("Failed to send speaking email:", err);
    return false;
  }
}
