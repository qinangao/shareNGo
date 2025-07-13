import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import Map from "../Map";
import { Link } from "react-router";
import LinkButton from "../LinkButton";
import { useAuth } from "../../hooks/useAuth";

function PlaceItem({
  id,
  image,
  title,
  address,
  creatorId,
  location,
  description,
}) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { isLoggedIn } = useAuth();

  function handleDelete() {
    console.log("delete");
    setIsDelete(false);
  }

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
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>
            <div>
              <p className="text-sm text-gray-600 mb-1">{address}</p>
              <LinkButton onClick={() => setIsMapOpen(true)}>
                View on map
              </LinkButton>
            </div>
            <p className="mb-3 font-normal text-gray-700">{description}</p>

            {isLoggedIn && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/places/${id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
                <Button variant="default" onClick={() => setIsDelete(true)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </li>

      <Modal isOpen={isMapOpen}>
        <div className="flex items-center justify-between pb-5 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{address}</h3>
          <button
            onClick={() => setIsMapOpen(false)}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="h-64 w-full relative">
          <Map location={location} />
        </div>
      </Modal>

      <Modal isOpen={isDelete}>
        <p className="text-gray-800 mb-5 mt-2">
          Are you sure you want to delete this place? Please notre that it can
          not be undone thereafter.
        </p>
        <div className="flex justify-end gap-2 mb-2">
          <Button variant="primary" onClick={() => setIsDelete(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default PlaceItem;
