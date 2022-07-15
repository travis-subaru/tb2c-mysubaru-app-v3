import { getSessionID } from "../stores/Session";
import { myCheck, myFetch } from "./Fetch";
import { LanguageID } from "../components/MyLanguage";


export interface TwoStepContactInfo {
    phone?: string
    userName?: string
}

export interface TwoStepAuthSendVerifyParameters {
    contactMethod: "userName" | "phone"
    verificationCode?: string
    languageCode: LanguageID
}

export const requestTwoStepAuthContact = async (): Promise<TwoStepContactInfo> => {
    const jsessionid = getSessionID();
    const resp = await myFetch(`twoStepAuthContacts.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": null,
        "method": "POST",
    });
    return resp.success && resp.dataName === "dataMap" ? resp.data : {};
}

export const requestTwoStepAuthSendVerification = async (p: TwoStepAuthSendVerifyParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${p.contactMethod}&verificationCode=${p.verificationCode}&languageCode=${p.languageCode}`;
    return myCheck(`twoStepAuthSendVerification.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}

export const requestTwoStepAuthVerify = async (p: TwoStepAuthSendVerifyParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${p.contactMethod}&verificationCode=${p.verificationCode}&deviceName=${p.deviceName}`;
    return myCheck(`twoStepAuthVerify.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}
