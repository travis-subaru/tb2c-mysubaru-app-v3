import { computeVINCheckDigit, validateVIN } from "../src/MyVIN";

it('Checks standard VIN', () => {
    expect(computeVINCheckDigit("11111111111111111")).toBe("1"); // Standard test
    expect(computeVINCheckDigit("5GZCZ43D13S812715")).toBe("1"); // Valid VIN
    expect(computeVINCheckDigit("SGZCZ43D13S812715")).toBe("X"); // Invalid VIN, actual check digit
});

it('Rejects Invalid VINs', () => {
    expect(validateVIN("ABC")).toBe("length"); // Obviously wrong
    expect(validateVIN("SGZCZ43D13S812715")).toBe("checkdigit"); // From Wikipedia
});

it('Accepts Valid VINs', () => {
    expect(validateVIN("1FADP3F20EL425205")).toBe("ok"); // My old ford
    expect(validateVIN("5GZCZ43D13S812715")).toBe("ok"); // From Wikipedia
    expect(validateVIN("4S3BMAA66D1038385")).toBe("ok"); // QA vehicle
});
