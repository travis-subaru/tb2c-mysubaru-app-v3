import { NetworkResponse } from "../stores/Response";
import { myFetch } from "./Fetch";

export const requestForgotUsername = async (vin: string): Promise<NetworkResponse> => {
    const body = `vin=${vin}`;
    return await myFetch("forgotUsername.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}
