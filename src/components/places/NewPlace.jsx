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

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  address: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." })
    .max(200, { message: "Description must be at most 200 characters." }),
});

function NewPlace() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
    },
  });
  const onSubmit = (values) => {
    console.log("New Place:", values);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Place</h2>
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-dark-100">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter address"
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
                onClick={() => navigate("/user")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full font-semibold py-2 rounded-lg text-white transition"
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewPlace;
