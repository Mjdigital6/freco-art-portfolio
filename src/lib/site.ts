import { headers } from "next/headers";

const publicSiteUrl = "https://www.frecoartltd.com";

export async function siteUrl(): Promise<string> {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";

  if (host && host !== "localhost" && !host.startsWith("127.0.0.1")) return `${proto}://${host}`;
  return publicSiteUrl;
}
