"use server";

import { DASHBOARD_BASE_URL } from "@/constants/environtment";
import { redirect } from "next/navigation";

export async function redirectToChatPath() {
    "use server";
    redirect(`${DASHBOARD_BASE_URL}/chats`);
}
