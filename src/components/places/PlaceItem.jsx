import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Map from "../Map";
import { Link } from "react-router";
import LinkButton from "../LinkButton";
import { useAuth } from "@/hooks/useAuth";
import useHttp from "@/hooks/useHttp";

import ErrorModal from "../ErrorModal";
import { Loader2Icon } from "lucide-react";
import { ASSET_URL, BACKEND_URL } from "@/utils/constants";

function PlaceItem({
  id,
  image,
  title,
  address,
  creatorId,
  location,
  description,
  onDelete,
}) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { userId, token } = useAuth();
  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  async function handleDelete() {
    setIsDelete(false);

    const header = { Authorization: "Bearer " + token };
    try {
      await sendRequest(`${BACKEND_URL}/places/${id}`, "DELETE", null, header);
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  // How many chars before showing "Read more" toggle
  const DESCRIPTION_TRUNCATE_LIMIT = 40;
  const isDescriptionLong = description.length > DESCRIPTION_TRUNCATE_LIMIT;

  return (
    <>
      <li>
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Image Section */}
          <div className="w-full h-64">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
            />
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col">
            {/* Title and Address */}
            <div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                {title}
              </h5>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">{address}</p>
                <LinkButton onClick={() => setIsMapOpen(true)}>
                  View on map
                </LinkButton>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-4">
              <div
                className="font-normal text-gray-700"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                <div>
                  {showFullDescription || !isDescriptionLong
                    ? description
                    : description.slice(0, DESCRIPTION_TRUNCATE_LIMIT) + "..."}
                </div>

                {isDescriptionLong && (
                  <button
                    className="text-blue-600 underline text-sm mt-1"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    type="button"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>

            {/* Buttons Section */}
            {userId === creatorId && (
              <div className="flex flex-wrap gap-2">
                <Link to={`/places/${id}`}>
                  <Button variant="default">Edit</Button>
                </Link>
                <Button variant="outline" onClick={() => setIsDelete(true)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </li>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">{address}</DialogTitle>

            <div className="h-64 w-full relative">
              <Map location={location} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-2">Delete place</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this place?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="default"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting" : "Delete"}
              {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default PlaceItem;
