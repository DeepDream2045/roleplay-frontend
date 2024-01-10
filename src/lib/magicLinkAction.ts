import { Sleep } from "@/lib/sleep";

export async function magicLinkRequestService(state: any, payload: any) {
    const email = payload.get("email");
    console.log(email);

    await Sleep(3500);
    // will fetch API outside next
}

export async function magicLinkVerifyService(prevState, formData) {
    const title = formData.get("title"); // example to get data
    // another code here
}
