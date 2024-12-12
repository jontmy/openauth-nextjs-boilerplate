import { client } from "@/auth/client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) {
        return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }
    try {
        const tokens = await client.exchange(
            code,
            url.origin + "/api/auth/callback",
        );
        const response = NextResponse.redirect(url.origin + "/");
        response.cookies.set({
            name: "access_token",
            value: tokens.access,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 34560000,
        });
        response.cookies.set({
            name: "refresh_token",
            value: tokens.refresh,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 34560000,
        });
        return response;
    } catch (e) {
        console.error(e);
        return NextResponse.json(e, { status: 500 });
    }
}
