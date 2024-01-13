"use server";

import { RedirectType, redirect } from "next/navigation";

export default async function clientRedirect(url: string, type: RedirectType) {
    redirect(`${url}`, type);
}
