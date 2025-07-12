import FormField from "../FormField";
import { fieldValidation } from "../../utils/constants";
import useFormHandler from "../../hooks/useFormHandler";

function NewPlace() {
  const { formData, errors, showErrors, handleChange, handleSubmit } =
    useFormHandler({
      title: "",
      address: "",
      description: "",
    });

  // Define what happens when form is valid
  const onValidSubmit = (data) => {
    // console.log("=== FORM SUBMISSION SUCCESS ===");
    console.log("Form submitted successfully with data:", data);
    // console.log("================================");
    // Add your logic here - e.g., API call, navigation, etc.
    // For example:
    // submitPlaceToAPI(data);
    // navigate('/places');
    // For now, just alert to confirm it's working
    // alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Place</h2>
      <form onSubmit={handleSubmit(onValidSubmit)}>
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors"
        >
          Add place
        </button>
      </form>
    </div>
  );
}

export default NewPlace;
