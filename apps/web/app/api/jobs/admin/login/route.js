import { passwordsMatch, setJobAdminCookie } from "@/lib/jobAdminAuth";

export async function POST(req) {
  try {
    if (!process.env.JOB_ADMIN_PASSWORD) {
      return Response.json(
        { error: "Job admin password is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    if (!passwordsMatch(body.password)) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    await setJobAdminCookie();
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
