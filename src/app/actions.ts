"use server";

import { client } from "@/auth/client";
import { subjects } from "@/auth/subjects";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
    const cookies = await getCookies();
    const accessToken = cookies.get("access_token");
    const refreshToken = cookies.get("refresh_token");

    if (!accessToken) {
        return false;
    }

    const verified = await client.verify(subjects, accessToken.value, {
        refresh: refreshToken?.value,
    });

    if (verified.err) {
        return false;
    }
    if (verified.tokens) {
        cookies.set({
            name: "access_token",
            value: verified.tokens.access,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 34560000,
        });
        cookies.set({
            name: "refresh_token",
            value: verified.tokens.refresh,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 34560000,
        });
    }
    return true;
}

export async function signIn() {
    const cookies = await getCookies();
    const accessToken = cookies.get("access_token");
    const refreshToken = cookies.get("refresh_token");

    if (accessToken) {
        const verified = await client.verify(subjects, accessToken.value, {
            refresh: refreshToken?.value,
        });
        if (!verified.err && verified.tokens) {
            cookies.set({
                name: "access_token",
                value: verified.tokens.access,
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 34560000,
            });
            cookies.set({
                name: "refresh_token",
                value: verified.tokens.refresh,
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 34560000,
            });
            redirect("/");
        }
    }

    const headers = await getHeaders();
    const host = headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const redirectUrl = client.authorize(
        `${protocol}://${host}/api/auth/callback`,
        "code",
    );
    redirect(redirectUrl);
}

export async function signOut() {
    const cookies = await getCookies();
    cookies.delete("access_token");
    cookies.delete("refresh_token");
    redirect("/");
}
