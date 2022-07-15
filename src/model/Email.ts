export type EmailValidationResult = "ok" | "error"

/**
 * Basic e-mail check, may allow some invalid addresses
 */
export const checkEmail = (email: string): EmailValidationResult => {
    const parts = email.split("@");
    if (parts.length != 2) { return "error"; }
    const [locals, domains] = [parts[0].split("."), parts[1].split(".")];
    for (let i = 0; i < locals.length; i++) {
        const local = locals[i];
        if (local.length <= 0 || local.length > 64) { return "error"; }
    }
    for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        if (domain.length <= 0 || domain.length > 63) { return "error"; }
    }
    return "ok";
}
