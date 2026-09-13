"use server";

import { createInquiry } from "@/lib/inquiries";

export type InquiryActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const successState: InquiryActionState = {
  status: "success",
  message: "Thank you. Your enquiry has been received and is ready for review.",
};

function readText(value: FormDataEntryValue | string | null | undefined, limit = 5000) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function readDraft(formData: FormData) {
  const raw = readText(formData.get("draftData"), 12000);
  if (!raw) return {} as Record<string, string>;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, readText(String(value))]));
  } catch {
    return {} as Record<string, string>;
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitLandInquiry(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const draft = readDraft(formData);
  const name = draft.fullName || readText(formData.get("fullName"));
  const email = draft.email || readText(formData.get("email"));
  const phone = draft.phone || readText(formData.get("phone"));
  const message = draft.additionalInformation || readText(formData.get("additionalInformation"));

  if (!name || !email || !isEmail(email)) {
    return { status: "error", message: "Please provide your name and a valid email address before sending." };
  }

  try {
    await createInquiry({
      inquiryType: "Landowner partnership",
      source: "landowners",
      name,
      phone,
      email,
      message,
      details: draft,
    });
    return successState;
  } catch {
    return { status: "error", message: "We could not save your enquiry just now. Please try again in a moment." };
  }
}

export async function submitInvestorInquiry(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const draft = readDraft(formData);
  const name = draft.name || readText(formData.get("name"));
  const email = draft.email || readText(formData.get("email"));
  const phone = draft.phone || readText(formData.get("phone"));
  const message = draft.message || readText(formData.get("message"));

  if (!name || !email || !isEmail(email)) {
    return { status: "error", message: "Please provide your name and a valid email address before registering interest." };
  }

  try {
    await createInquiry({
      inquiryType: "Investment opportunity",
      source: "investors",
      name,
      phone,
      email,
      message,
      details: draft,
    });
    return successState;
  } catch {
    return { status: "error", message: "We could not save your interest just now. Please try again in a moment." };
  }
}
