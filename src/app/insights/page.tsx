import { InsightsList } from "@/components/insights-list";
import { getInsights } from "@/lib/site-content";

export default async function InsightsPage() {
  return <InsightsList insights={await getInsights()} />;
}
