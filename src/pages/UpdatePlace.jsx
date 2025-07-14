import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." })
    .max(200, { message: "Description must be at most 200 characters." }),
});

function UpdatePlace() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const currentPlace = DUMMY_PLACES.find((item) => item.id === placeId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentPlace?.title || "",
      description: currentPlace?.description || "",
    },
  });

  if (!currentPlace) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-800">
          Could not find the place!
        </h2>
      </div>
    );
  }

  const onSubmit = (values) => {
    console.log("Updated Place:", values);

    // Simulate API update delay
    setTimeout(() => {
      navigate(`/${currentPlace.creator}/places`);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Place</h2>
        <img
          className="w-full h-full object-cover"
          src={currentPlace.imageUrl}
          alt={currentPlace.title}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-dark-100">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter place title"
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-dark-100">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-[180px] border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Describe the place..."
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm mt-1" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full font-semibold py-2 rounded-lg border border-gray-400 text-gray-700"
                onClick={() => navigate(`/${currentPlace.creator}/places`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full font-semibold py-2 rounded-lg text-white transition"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePlace;
