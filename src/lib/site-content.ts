import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contentOverrides } from "@/db/schema";
import { insights as defaultInsights, projects as defaultProjects, type Insight, type Project } from "@/lib/freco-content";

function parseOverride<T>(value: string | undefined): Partial<T> | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as Partial<T>;
  } catch {
    return null;
  }
}

async function getOverride(key: string) {
  const [entry] = await db.select().from(contentOverrides).where(eq(contentOverrides.key, key)).limit(1);
  return entry?.value;
}

function mergeRecord<T extends { id: string }>(record: T, override: Partial<T> | null): T {
  return override ? { ...record, ...override, id: record.id } : record;
}

export async function getProjects(): Promise<Project[]> {
  const entries = await Promise.all(defaultProjects.map(async (project) => mergeRecord(project, parseOverride<Project>(await getOverride(`project:${project.id}`)))));
  return entries;
}

export async function getInsights(): Promise<Insight[]> {
  const entries = await Promise.all(defaultInsights.map(async (insight) => mergeRecord(insight, parseOverride<Insight>(await getOverride(`insight:${insight.id}`)))));
  return entries;
}

export async function saveProject(project: Project) {
  await db.insert(contentOverrides).values({
    key: `project:${project.id}`,
    value: JSON.stringify(project),
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: contentOverrides.key,
    set: { value: JSON.stringify(project), updatedAt: new Date() },
  });
}

export async function saveInsight(insight: Insight) {
  await db.insert(contentOverrides).values({
    key: `insight:${insight.id}`,
    value: JSON.stringify(insight),
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: contentOverrides.key,
    set: { value: JSON.stringify(insight), updatedAt: new Date() },
  });
}
