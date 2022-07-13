import { validateEmail } from "../src/MyEmail";

it('Rejects Invalid Email Address', () => {
    expect(validateEmail("test")).toBe("error");
    expect(validateEmail("test@")).toBe("error");
    expect(validateEmail("@")).toBe("error");
    expect(validateEmail("test@.com")).toBe("error");
});

it('Accepts Valid Email', () => {
    // Normal e-mail address
    expect(validateEmail("tlucke@subaru.com")).toBe("ok");

    // Gmail + trick
    expect(validateEmail("spamfilter+tluckenbaugh@gmail.com")).toBe("ok");

    // Technically valid, difficult to route
    expect(validateEmail("root@localhost")).toBe("ok");
});
