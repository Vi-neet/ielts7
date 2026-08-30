import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeMeetingUrl(url?: string | null): string {
  if (!url) return "";
  let clean = url.trim();
  if (!clean) return "";
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "https://" + clean;
  }
  return clean;
}

export function isGoogleMeetRoomUrl(url?: string | null): boolean {
  if (!url) return false;
  const normalized = normalizeMeetingUrl(url);
  try {
    const parsed = new URL(normalized);
    if (parsed.hostname.includes("meet.google.com")) {
      const pathname = parsed.pathname.replace(/^\/+|\/+$/g, "");
      return pathname.length > 0;
    }
    return parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

export const DEFAULT_MEET_LINK = "https://meet.google.com/abc-defg-hij";


