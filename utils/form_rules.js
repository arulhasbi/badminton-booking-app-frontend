import { defineRule } from "vee-validate";

export function defineCustomRules() {
  defineRule("digits_between", (value, [min, max]) => {
    if (!value) {
      return true;
    }

    const length = String(value).length;

    if (length < min || length > max) {
      return `The field must be between ${min} and ${max} digits.`;
    }

    return true;
  });

  defineRule("strong_password", (value) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(value)) {
      return "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    return true;
  });
}
