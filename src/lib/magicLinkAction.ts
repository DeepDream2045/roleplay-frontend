import { Sleep } from "@/lib/sleep";

const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;

export async function magicLinkRequestService(state: any, payload: any) {
    try {
        const email = payload.get("email");
        console.log(email);

        await Sleep(1000);
        // will fetch API outside next

        const form = new FormData();

        form.append("email", email);
        const req = await fetch(`${MAIN_API_BASE_URL}/login_request/`, {
            method: "POST",
            body: form,
            mode: "cors",
        });

        // console.log(req);

        const response = await req.json();
        // console.log(response);

        return {
            formSubmitted: true,
            emailSuccessSent: true,
        };
    } catch (error) {
        console.log(error);
    }
}

export async function magicLinkVerifyService(prevState: any, formData: any) {
    const title = formData.get("title"); // example to get data
    // another code here
}
