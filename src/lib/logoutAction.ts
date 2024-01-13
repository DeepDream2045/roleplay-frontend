import { RedirectType, redirect } from "next/navigation";
import { deleteAuthSession } from "./authSession";

export const logoutAction = async () => {
    "use server";
    await deleteAuthSession();

    redirect("/", RedirectType.replace);
};
