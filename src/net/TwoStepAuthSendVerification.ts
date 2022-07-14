import { LanguageID } from "../components/MyLanguage";
import { getSessionID } from "../stores/Session";
import { myCheck } from "./Fetch";

export interface NETTwoStepAuthSendVerificationParameters {
    contactMethod: "userName" | "phone"
    verificationCode?: string
    languageCode: LanguageID
}


export const requestTwoStepAuthSendVerification = async ({contactMethod, verificationCode, languageCode}: NETTwoStepAuthSendVerificationParameters) => {
    const jsessionid = getSessionID();
    const body = `contactMethod=${contactMethod}&verificationCode=${verificationCode}&languageCode=${languageCode}`;
    return myCheck(`twoStepAuthSendVerification.json;jsessionid=${jsessionid}`, {
        "headers": {},
        "body": body,
        "method": "POST",
    });
}
