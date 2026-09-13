"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";
import { deleteInquiry, updateInquiryStatus, type InquiryStatus } from "@/lib/inquiries";

const adminEmail = "frecoartdevelopers@gmail.com";

async function requireAdmin() {
  const user = await getUser();
  if (!user || user.email.toLowerCase() !== adminEmail) {
    throw new Error("You do not have access to manage enquiries.");
  }
  return user;
}

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validStatus(value: string): value is InquiryStatus {
  return value === "new" || value === "in_progress" || value === "closed";
}

export async function changeInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = textValue(formData, "id");
  const status = textValue(formData, "status");
  if (!id || !validStatus(status)) throw new Error("That enquiry update is not valid.");
  await updateInquiryStatus(id, status);
  revalidatePath("/admin");
}

export async function removeInquiry(formData: FormData) {
  await requireAdmin();
  const id = textValue(formData, "id");
  if (!id) throw new Error("That enquiry could not be found.");
  await deleteInquiry(id);
  revalidatePath("/admin");
}
