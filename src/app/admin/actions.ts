"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";
import { deleteInquiry, updateInquiryStatus, type InquiryStatus } from "@/lib/inquiries";
import { saveInsight, saveProject } from "@/lib/site-content";
import type { Insight, Project } from "@/lib/freco-content";

const adminEmail = "frecoartdevelopers@gmail.com";

async function requireAdmin() {
  const user = await getUser();
  if (!user || user.email.toLowerCase() !== adminEmail) {
    throw new Error("You do not have access to manage FRECO ART content.");
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

function parseList(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function parseJson<T>(formData: FormData, key: string): T {
  const value = textValue(formData, key);
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`The ${key} content is not valid.`);
  }
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

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const project = parseJson<Project>(formData, "project");
  if (!project.id || !project.name || !project.slug || !project.description) throw new Error("Add a name, page address and description before saving.");
  await saveProject({ ...project, amenities: Array.isArray(project.amenities) ? project.amenities : [] });
  revalidatePath("/");
  revalidatePath("/developments");
  revalidatePath(`/developments/${project.slug}`);
  revalidatePath("/admin");
}

export async function updateInsight(formData: FormData) {
  await requireAdmin();
  const insight = parseJson<Insight>(formData, "insight");
  if (!insight.id || !insight.title || !insight.slug || !insight.excerpt) throw new Error("Add a title, page address and excerpt before saving.");
  await saveInsight({ ...insight, content: Array.isArray(insight.content) ? insight.content : [] });
  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${insight.slug}`);
  revalidatePath("/admin");
}
