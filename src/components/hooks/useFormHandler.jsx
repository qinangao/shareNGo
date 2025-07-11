import { useState } from "react";
import { validateField } from "../../utils/helper";

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

    if (validateForm()) {
      onValidSubmit(formData);
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
