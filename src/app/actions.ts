"use server";

import { headers } from "next/headers";

export interface BlueprintSubmissionState {
  success: boolean;
  message: string;
}

// Sliding-window rate limiter per IP (max 3 submissions per 10 minutes)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_TRACKED_IPS = 2000;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (ipRequests.size > MAX_TRACKED_IPS) {
    ipRequests.clear();
  }

  const timestamps = (ipRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

function sanitizeText(raw: unknown, maxLength: number): string {
  return String(raw ?? "")
    .replace(/[\u0000-\u001F\u007F<>`$\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function submitBlueprintRequest(
  _prevState: BlueprintSubmissionState,
  formData: FormData
): Promise<BlueprintSubmissionState> {
  // 1. Honeypot trap check
  const honeypot = formData.get("company_website_trap");
  if (honeypot) {
    return { success: true, message: "OK" };
  }

  const locale = formData.get("locale") === "en" ? "en" : "id";

  // 2. Bot speed-trap check (reject instant automated POSTs < 2.2s after mount)
  const renderedAt = Number(formData.get("form_rendered_at") ?? 0);
  if (!renderedAt || Date.now() - renderedAt < 2200) {
    return {
      success: false,
      message:
        locale === "id"
          ? "Permintaan terlalu cepat. Mohon tunggu sebentar lalu coba lagi."
          : "Submission too fast. Please wait a moment and try again.",
    };
  }

  // 3. Per-IP sliding-window rate limit check
  const reqHeaders = await headers();
  const forwardedFor = reqHeaders.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    reqHeaders.get("x-real-ip") ||
    "unknown-ip";

  if (isRateLimited(clientIp)) {
    return {
      success: false,
      message:
        locale === "id"
          ? "Terlalu banyak pengiriman dari koneksi Anda. Silakan hubungi kami via WhatsApp."
          : "Too many submissions from your connection. Please message us on WhatsApp.",
    };
  }

  // 4. Strict sanitization & length enforcement
  const name = sanitizeText(formData.get("name"), 80);
  const whatsapp = sanitizeText(formData.get("whatsapp"), 24);
  const email = sanitizeText(formData.get("email"), 120).toLowerCase();
  const business = sanitizeText(formData.get("business"), 100);
  const plan = sanitizeText(formData.get("plan"), 80);
  const slot = sanitizeText(formData.get("slot"), 50);

  if (!name || !whatsapp || !email || !business) {
    return {
      success: false,
      message:
        locale === "id"
          ? "Mohon lengkapi nama, nomor WhatsApp, email, dan nama bisnis Anda."
          : "Please complete your name, WhatsApp number, email, and business name.",
    };
  }

  // 5. Phone number & email format validation
  if (!/^[+0-9()\-\s]{8,22}$/.test(whatsapp)) {
    return {
      success: false,
      message:
        locale === "id"
          ? "Mohon masukkan nomor WhatsApp yang valid."
          : "Please enter a valid WhatsApp phone number.",
    };
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return {
      success: false,
      message:
        locale === "id"
          ? "Mohon masukkan alamat email yang valid."
          : "Please enter a valid work email address.",
    };
  }

  return {
    success: true,
    message:
      locale === "id"
        ? `Terima kasih ${name}! Konsep gratis untuk ${business} (${plan}) sedang disiapkan. Kami akan menghubungi WhatsApp ${whatsapp} (${slot}).`
        : `Thank you ${name}! Your free concept for ${business} (${plan}) is queued. We will reach out on WhatsApp (${whatsapp}) for your slot (${slot}).`,
  };
}
