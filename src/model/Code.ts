import { Language } from "./Language"

export type ErrorCode = "networkError" | "statusError" | "jsonError" | "parseError" | "invalidAccount" | "InvalidCredentials" | "twoStepAuthTooManyAttempts" | "VINLookupFailed" | "NotImplemented";

export const descriptionForErrorCode = (i18n: Language, code: ErrorCode): string => {
    if (code === "invalidAccount") { return i18n.login.invalidAccount; }
    if (code === "twoStepAuthTooManyAttempts") { return i18n.login.twoStepAuthTooManyAttempts; }
    if (code === "InvalidCredentials") { return i18n.remoteService.InvalidCredentials.invalidPin; }
    if (code === "VINLookupFailed") { return i18n.forgotUsernameFailPanel.pageDescription; }
    return `${i18n.message.fatalMessage} (${code})`
}

export const descriptionForEndpoint = (i18n: Language, endpoint: string): string => {
    return endpoint; // TODO: Endpoint text
}
