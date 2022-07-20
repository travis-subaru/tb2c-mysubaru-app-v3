import { Language } from "../components/MyLanguage"

export type ErrorCode = "networkError" | "statusError" | "jsonError" | "parseError" | "invalidAccount" | "InvalidCredentials" | "twoStepAuthTooManyAttempts";

export interface Error {
    type: "error"
    code: ErrorCode | null
}

export interface Endpoint {
    type: "endpoint"
    endpoint: string
}

export type Code = Error | Endpoint;

export const descriptionForCode = (code: Code, i18n: Language): string => {
    debugger;
    if (code.type == "error") {
        switch (code.code) {
            case "invalidAccount": return i18n.login.invalidAccount;
            case "twoStepAuthTooManyAttempts": return i18n.login.twoStepAuthTooManyAttempts;
            case "InvalidCredentials": return i18n.remoteService.InvalidCredentials.invalidPin;
            default: return `${i18n.message.fatalMessage} (${code.code})`;
        }
    } else {
        return code.endpoint;
    }
}
