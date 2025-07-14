import { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import FormField from "../components/FormField";
import { fieldValidation } from "../utils/constants";
import useFormHandler from "../hooks/useFormHandler";

// Dummy data for demonstration
const DUMMY_PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMnNyQjI5LDUexeUDV92SXnYSISARRYsMUKZmZPlwFEK_-BjeXbEchorS41RugzL7X2k&usqp=CAU",
    title: "South Park",
    address: "Park Vale Rd, Macclesfield SK11 8AD",
    description:
      "South Park is a friendly neighbourhood in Macclesfield, England, known for its community spirit and walkability.",
    creator: "u1",
    location: { lat: 53.2509364, lng: -2.1320182 },
  },
  {
    id: "p2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMnNyQjI5LDUexeUDV92SXnYSISARRYsMUKZmZPlwFEK_-BjeXbEchorS41RugzL7X2k&usqp=CAU",
    title: "West Park",
    address: "Park Vale Rd, Macclesfield SK11 8AD",
    description:
      "South Park is a friendly neighbourhood in Macclesfield, England, known for its community spirit and walkability.",
    creator: "u2",
    location: { lat: 53.2509364, lng: -2.1320182 },
  },
];

function UpdatePlace() {
  const { placeId } = useParams();

  const {
    formData,
    errors,
    showErrors,
    handleChange,
    handleSubmit,
    setFormData,
  } = useFormHandler({
    title: "",
    address: "",
    description: "",
  });

  const currentPlace = DUMMY_PLACES.find((item) => item.id === placeId);

  // Load existing data into the form
  useEffect(() => {
    if (currentPlace) {
      setFormData({
        title: currentPlace.title,
        address: currentPlace.address,
        description: currentPlace.description,
      });
    }
  }, [currentPlace, setFormData]);

  // Final submission logic
  function onUpdateSubmit(updatedData) {
    console.log("Updated Place Data:", updatedData);
    // You could now send `updatedData` to your backend or API
    // Example: api.updatePlace(placeId, updatedData)
  }

  // If no matching place is found
  if (!currentPlace) {
    return (
      <div className="error_container">
        <h2 className="text-xl font-semibold">Could not find the place!</h2>
      </div>
    );
  }

  return (
    <form
      className="max-w-3xl mx-auto mt-10"
      onSubmit={handleSubmit(onUpdateSubmit)}
    >
      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        {/* Image */}
        <div className="w-full h-64 sm:h-80 md:h-[22rem]">
          <img
            className="w-full h-full object-cover"
            src={currentPlace.imageUrl}
            alt={formData.title}
          />
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Place</h2>

          <FormField
            label="Title"
            id="title"
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
            value={formData.address}
            disabled={true}
          />

          <FormField
            label="Description"
            id="description"
            textarea
            value={formData.description}
            onChange={handleChange}
            minLength={fieldValidation.description.minLength}
            maxLength={fieldValidation.description.maxLength}
            showError={showErrors}
            error={errors.description}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="default">
              Update
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdatePlace;
