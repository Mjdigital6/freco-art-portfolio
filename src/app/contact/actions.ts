"use server";

import { createInquiry } from "@/lib/inquiries";
import { sendEmailOrThrow } from "@/lib/email";

const recipient = "frecoartdevelopers@gmail.com";

type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: ContactActionState = { status: "idle", message: "" };

function valueOf(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function safeSubject(value: string) {
  return value.replace(/[\r\n]/g, " ").slice(0, 120);
}

export async function submitContactInquiry(
  _previousState: ContactActionState = initialState,
  formData: FormData,
): Promise<ContactActionState> {
  const enquiryType = valueOf(formData, "enquiryType");
  const name = valueOf(formData, "name");
  const phone = valueOf(formData, "phone");
  const email = valueOf(formData, "email");
  const message = valueOf(formData, "message");

  if (!enquiryType || !name || !email || !message) {
    return { status: "error", message: "Please complete the required fields before sending your enquiry." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address so we can reply to you." };
  }

  const details = { enquiryType, name, phone, email, message, pageSource: valueOf(formData, "pageSource") };
  const html = `
    <h2>New FRECO ART enquiry</h2>
    <p><strong>Enquiry type:</strong> ${escapeHtml(enquiryType)}</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    await createInquiry({
      inquiryType: enquiryType,
      source: "contact",
      name,
      phone,
      email,
      message,
      details,
    });
  } catch {
    return { status: "error", message: "We could not save your enquiry just now. Please try again in a moment." };
  }

  try {
    await sendEmailOrThrow({
      to: recipient,
      subject: safeSubject(`[FRECO ART] ${enquiryType} — ${name}`),
      html,
      replyTo: email,
      fromName: "FRECO ART LTD",
    });
    return { status: "success", message: "Your enquiry has been sent. We will get in touch through the details you provided." };
  } catch {
    return { status: "error", message: "Your enquiry was saved, but the email notification could not be sent just now. It is still available in the admin workspace." };
  }
}
