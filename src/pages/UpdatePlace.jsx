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
import { useEffect, useState } from "react";
import useHttp from "@/hooks/useHttp";
import { Spinner } from "@/components/Spinner";
import ErrorModal from "@/components/ErrorModal";
import { useAuth } from "@/hooks/useAuth";
import { ASSET_URL, BACKEND_URL } from "@/utils/constants";

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
  const [currentPlace, setCurrentPlace] = useState(null);
  const { errorMessage, errorModalOpen, sendRequest, clearError, isLoading } =
    useHttp();
  const { token } = useAuth();
  const { placeId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const endpoint = `${BACKEND_URL}/places/${placeId}`;

  useEffect(() => {
    async function fetchPlace() {
      try {
        const data = await sendRequest(endpoint);
        setCurrentPlace(data?.place ?? null);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchPlace();
  }, [sendRequest, endpoint]);

  useEffect(() => {
    if (currentPlace) {
      form.setValue("title", currentPlace.title || "");
      form.setValue("description", currentPlace.description || "");
    }
  }, [currentPlace, form]);

  const onSubmit = async (values) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify(values);
    try {
      const data = await sendRequest(endpoint, "PATCH", body, headers);
      if (data) {
        navigate(`/${currentPlace.creator}/places`);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (!isLoading && currentPlace === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-800">
          Could not find the place!
        </h2>
      </div>
    );
  }

  return (
    <>
      {currentPlace && (
        <div className="flex flex-col items-center justify-center container">
          <h2 className="title">Update Place</h2>
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <img
              className="w-full h-[350px] object-cover"
              src={currentPlace.image}
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
                      <FormLabel className="text-xl text-dark-100">
                        Title
                      </FormLabel>
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
      )}
      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default UpdatePlace;
