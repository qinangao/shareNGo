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

function PlaceItem({
  id,
  image,
  title,
  address,
  // creatorId,
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
            <Button variant="default" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlaceItem;
