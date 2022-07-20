import { Language } from "../components/MyLanguage"

export type Code = "invalidAccount" | "twoStepAuthTooManyAttempts";

export const descriptionForCode = (code: Code, i18n: Language): string => {
    switch (code) {
        case "invalidAccount": return i18n.login.invalidAccount;
        case "twoStepAuthTooManyAttempts": return i18n.login.twoStepAuthTooManyAttempts;
    }
    return code;
}
