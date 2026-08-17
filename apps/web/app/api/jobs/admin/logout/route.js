import { clearJobAdminCookie } from "@/lib/jobAdminAuth";

export async function POST() {
  await clearJobAdminCookie();
  return Response.json({ success: true });
}
