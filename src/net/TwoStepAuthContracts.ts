import { getSessionID } from "../stores/Session";
import { myFetch } from "./Fetch";

export interface TwoStepContactInfo {
    phone?: string
    userName?: string
}

export const requestTwoStepAuthContacts = async (): Promise<TwoStepContactInfo> => {
    const jsessionid = getSessionID();
    const resp = await myFetch(`twoStepAuthContacts.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": null,
        "method": "POST",
    });
    return resp.success && resp.dataName === "dataMap" ? resp.data : {};
}
