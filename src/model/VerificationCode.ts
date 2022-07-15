export type VerificationCodeValidationResult = "ok" | "partial" | "blank" | "tooLong";

/**
 * Check validation code
 *
 * This is probably overkill for a six-digit code
 */
export const checkVerificationCode = (code: string): VerificationCodeValidationResult => {
    if (code.length == 0) { return "blank"; }
    if (code.length > 6) { return "tooLong"; }
    return code.length == 6 ? "ok" : "partial";
}
