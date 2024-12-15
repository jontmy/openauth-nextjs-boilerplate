"use server";

import { client } from "@/auth/client";
import { subjects } from "@/auth/subjects";
import { setTokens } from "@/auth/utils";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
    const cookies = await getCookies();
    const accessToken = cookies.get("access_token");
    const refreshToken = cookies.get("refresh_token");
    if (!accessToken) {
        return undefined;
    }

    const verified = await client.verify(subjects, accessToken.value, {
        refresh: refreshToken?.value,
    });
    if (verified.err) {
        return undefined;
    }

    if (verified.tokens) {
        await setTokens(verified.tokens.access, verified.tokens.refresh);
    }
    return verified.subject;
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
            await setTokens(verified.tokens.access, verified.tokens.refresh);
            redirect("/");
        }
    }

    const headers = await getHeaders();
    const host = headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const { url } = await client.authorize(
        `${protocol}://${host}/api/auth/callback`,
        "code",
    );
    redirect(url);
}

export async function signOut() {
    const cookies = await getCookies();
    cookies.delete("access_token");
    cookies.delete("refresh_token");
    redirect("/");
}
