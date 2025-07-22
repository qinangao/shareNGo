import { useNavigate } from "react-router";
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
import useHttp from "@/hooks/useHttp";
import { useAuth } from "@/hooks/useAuth";
import ErrorModal from "../ErrorModal";
import { Spinner } from "../Spinner";
import ImageUploader from "../ImageUploader";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(100, { message: "Address must be at most 100 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." })
    .max(200, { message: "Description must be at most 200 characters." }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "Only JPEG and PNG formats are allowed",
      }
    ),
});

function NewPlace() {
  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  const { token } = useAuth();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
      image: null,
    },
  });
  const onSubmit = async (values) => {
    const endpoint = "http://localhost:5000/api/places";

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("image", values.image);

    const header = { Authorization: "Bearer " + token };

    try {
      const data = await sendRequest(endpoint, "POST", formData, header);
      console.log(data);
      if (data) {
        navigate("/user"); // ✅ Navigate after successful submission
      }
    } catch (error) {
      // error is already handled in useHttp (shows modal), but you can log it
      console.error("Place creation error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-brand-300 shadow-md bg-white p-1 hover:scale-105 transition-transform"
              />
              <h1 className="text-xl lg:text-4xl font-bold text-dark-100">
                Share Your Adventure
              </h1>
            </div>
            <p className="text-dark-50 text-lg">
              Add a new place and inspire fellow travelers
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {isLoading && <Spinner size="large" />}
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-dark-100 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-brand-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          Place Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Hidden Beach Paradise, Mountain Vista Cafe..."
                            className="h-12 border-2 border-gray-200 rounded-xl px-4 text-base placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all duration-200 bg-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-red-100 text-sm mt-2 flex items-center gap-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-dark-100 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-brand-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Location Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Street address, city, country..."
                            className="h-12 border-2 border-gray-200 rounded-xl px-4 text-base placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all duration-200 bg-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-red-100 text-sm mt-2 flex items-center gap-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-dark-100 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-brand-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Share Your Experience
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[140px] border-2 border-gray-200 rounded-xl px-4 py-3 text-base placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all duration-200 bg-white/60 resize-none"
                            placeholder="What makes this place special? Share your memories, tips, or what travelers should know..."
                          />
                        </FormControl>
                        <FormMessage className="text-red-100 text-sm mt-2 flex items-center gap-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-dark-100 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-brand-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4-4a3 3 0 014 0l4 4M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zM8 10h.01"
                            />
                          </svg>
                          Upload Image
                        </FormLabel>
                        <FormControl>
                          <ImageUploader
                            onFileSelect={(file) => field.onChange(file)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage className="text-red-100 text-sm mt-2 flex items-center gap-1" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 font-semibold text-base rounded-xl border-2 border-gray-300 text-dark-50 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                      onClick={() => navigate("/user")}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 font-semibold text-base rounded-xl bg-gradient-to-r from-brand-300 to-brand-400 hover:from-brand-400 hover:to-brand-300 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Place
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer Note */}
        </div>
      </div>
      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default NewPlace;
