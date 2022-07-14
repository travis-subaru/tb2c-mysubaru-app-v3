import { myFetch } from "./Fetch";

interface DataMap {
    phone: string,
    sessionId: string,
    email: string,
}

export const requestForgotPasswordContact = async (email: string): Promise<DataMap | null> => {
    const body = `email=${email}`;
    const resp = await myFetch("forgotPasswordContacts.json", {
        "headers": {},
        "body": body,
        "method": "POST",
    });
    if (resp.success && resp.dataName === "dataMap") {
        return resp.data
    } else {
        return null;
    }
}
