import "server-only";

import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export type InquiryStatus = "new" | "in_progress" | "closed";

export type NewInquiry = {
  inquiryType: string;
  source: string;
  name: string;
  phone?: string;
  email: string;
  message?: string;
  details?: Record<string, string>;
};

export async function createInquiry(input: NewInquiry) {
  const [inquiry] = await db.insert(inquiries).values({
    inquiryType: input.inquiryType,
    source: input.source,
    name: input.name,
    phone: input.phone ?? "",
    email: input.email,
    message: input.message ?? "",
    details: JSON.stringify(input.details ?? {}),
  }).returning();
  return inquiry;
}

export async function listInquiries() {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await db.update(inquiries).set({ status, updatedAt: new Date() }).where(eq(inquiries.id, id));
}

export async function deleteInquiry(id: string) {
  await db.delete(inquiries).where(eq(inquiries.id, id));
}
