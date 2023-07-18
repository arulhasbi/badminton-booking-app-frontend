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
  // You can define other custom rules here as well
}
