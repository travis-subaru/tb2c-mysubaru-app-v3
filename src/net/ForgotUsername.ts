import { myFetch } from "./Fetch";

export const requestForgotUsername = async (vin: string): Promise<string[]> => {
    const body = `vin=${vin}`;
    const resp = await myFetch("forgotUsername.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
    debugger; // TODO: Report to error channel
    if (resp.success) {
        return resp.data;
    } else {
        return [];
    }
}
