import { useState } from "react";
import FormField from "../FormField";
import { validateField } from "../../utils/helper";
import { fieldValidation } from "../../utils/constants";

function NewPlace() {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  function validateForm() {
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
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (showErrors && errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: validateField(id, value),
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrors(true);

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      // Here you could send it to an API or handle it however you need

      // Reset form after successful submission
      setFormData({
        title: "",
        address: "",
        description: "",
      });
      setErrors({});
      setShowErrors(false);
    } else {
      console.log("Form validation failed");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Place</h2>

      <div>
        <FormField
          label="Title"
          id="title"
          placeholder="The place you want to share"
          value={formData.title}
          onChange={handleChange}
          minLength={fieldValidation.title.minLength}
          maxLength={fieldValidation.title.maxLength}
          showError={showErrors}
          error={errors.title}
        />

        <FormField
          label="Address"
          id="address"
          placeholder="Enter the address"
          value={formData.address}
          onChange={handleChange}
          minLength={fieldValidation.address.minLength}
          maxLength={fieldValidation.address.maxLength}
          showError={showErrors}
          error={errors.address}
        />

        <FormField
          label="Description"
          id="description"
          placeholder="Describe the place"
          textarea
          value={formData.description}
          onChange={handleChange}
          minLength={fieldValidation.description.minLength}
          maxLength={fieldValidation.description.maxLength}
          showError={showErrors}
          error={errors.description}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors"
        >
          Add place
        </button>
      </div>
    </div>
  );
}

export default NewPlace;
