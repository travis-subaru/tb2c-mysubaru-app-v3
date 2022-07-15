import { checkVerificationCode } from "../src/model/VerificationCode";

it('Checks Verification Codes', () => {
    expect(checkVerificationCode("")).toBe("blank");
    expect(checkVerificationCode("123")).toBe("partial");
    expect(checkVerificationCode("348975")).toBe("ok");
    expect(checkVerificationCode("34897512314")).toBe("tooLong");
});
