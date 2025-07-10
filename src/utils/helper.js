import { fieldValidation } from "./constants";

export const validateField = (fieldName, value) => {
  const validation = fieldValidation[fieldName];

  if (!validation) return "";

  if (validation.required && !value.trim()) {
    return "This field is required.";
  }

  if (validation.minLength && value.length < validation.minLength) {
    return `Minimum ${validation.minLength} characters required.`;
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return `Maximum ${validation.maxLength} characters allowed.`;
  }

  return "";
};
