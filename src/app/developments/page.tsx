import { DevelopmentsList } from "@/components/developments-list";
import { getProjects } from "@/lib/site-content";

export default async function DevelopmentsPage() {
  return <DevelopmentsList projects={await getProjects()} />;
}
