import { listJobs } from "@/lib/jobs";
import JobsListing from "./JobsListing";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await listJobs();
  return <JobsListing jobs={jobs} />;
}
