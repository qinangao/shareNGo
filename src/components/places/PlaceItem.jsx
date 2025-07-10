import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

function PlaceItem({
  image,
  title,
  address,
  creatorId,
  location,
  description,
}) {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <li className="h-full">
        <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full">
          {/* Image Section */}
          <div className="sm:w-1/2 w-full h-64 sm:h-auto">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
            />
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col space-y-4 w-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>
            <div>
              <p className="text-sm text-gray-600 mb-1">{address}</p>
              <button
                onClick={() => setIsMapOpen(true)}
                className="font-medium text-blue-600 hover:underline"
              >
                View on map
              </button>
            </div>
            <p className="mb-3 font-normal text-gray-700">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="primary">Edit</Button>
              <Button variant="default">Delete</Button>
            </div>
          </div>
        </div>
      </li>

      <Modal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title={address}
      >
        <div className="w-full h-64">
          <div>The map </div>
        </div>
      </Modal>
    </>
  );
}

export default PlaceItem;
