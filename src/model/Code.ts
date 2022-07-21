import { Language } from "../components/MyLanguage"

export type ErrorCode = "networkError" | "statusError" | "jsonError" | "parseError" | "invalidAccount" | "InvalidCredentials" | "twoStepAuthTooManyAttempts" | "VINLookupFailed";

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
    if (code.type == "error") {
        if (code.code === "invalidAccount") { return i18n.login.invalidAccount;  }
        if (code.code === "twoStepAuthTooManyAttempts") { return i18n.login.twoStepAuthTooManyAttempts;  }
        if (code.code === "InvalidCredentials") { return i18n.remoteService.InvalidCredentials.invalidPin;  }
        if (code.code === "VINLookupFailed") { return i18n.forgotUsernameFailPanel.pageDescription;  }
        return `${i18n.message.fatalMessage} (${code.code})`
    } else {
        return code.endpoint;
    }
}
