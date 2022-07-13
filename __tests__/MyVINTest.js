import { computeVINCheckDigit, isVINValid } from "../src/MyVIN";

it('Checks standard VIN', () => {
    expect(computeVINCheckDigit("11111111111111111")).toBe("1"); // Standard test
    expect(computeVINCheckDigit("5GZCZ43D13S812715")).toBe("1"); // Valid VIN
    expect(computeVINCheckDigit("SGZCZ43D13S812715")).toBe("X"); // Invalid VIN, actual check digit
});

it('Rejects Invalid VINs', () => {
    const badVINs = [
        "ABC", // Obviously wrong
        "SGZCZ43D13S812715", // From Wikipedia
    ];
    badVINs.forEach(VIN => expect(isVINValid(VIN)).toBe(false));
});

it('Accepts Valid VINs', () => {
    const goodVINs = [
        "1FADP3F20EL425205", // My old ford
        "5GZCZ43D13S812715", // From Wikipedia
    ];
    goodVINs.forEach(VIN => expect(isVINValid(VIN)).toBe(true));
});
