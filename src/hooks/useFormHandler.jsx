import { useState } from "react";
import { validateField } from "../utils/helper";

function useFormHandler(initialState) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (showErrors && errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: validateField(id, value),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (onValidSubmit) => (e) => {
    e.preventDefault();
    setShowErrors(true);

    // console.log("Form submitted - Form Data:", formData);
    // console.log("Validation starting...");

    if (validateForm()) {
      // console.log("Validation passed!");
      // console.log("Calling onValidSubmit with data:", formData);

      // Make sure onValidSubmit is a function before calling it
      if (typeof onValidSubmit === "function") {
        onValidSubmit(formData);
      } else {
        console.warn("onValidSubmit is not a function:", onValidSubmit);
      }
    } else {
      console.log("Validation failed", errors);
    }
  };

  const resetError = () => {
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    showErrors,
    handleChange,
    handleSubmit,
    resetError,
  };
}

export default useFormHandler;
