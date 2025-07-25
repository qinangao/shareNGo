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

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ErrorModal from "@/components/ErrorModal";
import { useAuth } from "@/hooks/useAuth";
import useHttp from "@/hooks/useHttp";
import ImageUploader from "@/components/ImageUploader";
import { BACKEND_URL } from "@/utils/constants";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(20, { message: "Password must be at most 20 characters." }),
});

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(20, { message: "Password must be at most 20 characters." }),
  image: z.instanceof(File).optional().nullable(),
});

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();

  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  const form = useForm({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      image: null,
    },
  });

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    form.reset({
      username: "",
      email: "",
      password: "",
    });
  };

  const onSubmit = async (values) => {
    const endpoint = isSignUp
      ? `${BACKEND_URL}/users/signup`
      : `${BACKEND_URL}/users/login`;

    if (isSignUp) {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const data = await sendRequest(endpoint, "POST", formData);

        if (data) {
          login(data.userId, data.token);
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    } else {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({
        email: values.email,
        password: values.password,
      });

      try {
        const data = await sendRequest(endpoint, "POST", body, headers);

        if (data) {
          login(data.userId, data.token);
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h2 className="title">{isSignUp ? "Register" : "Login"}</h2>
      <div className="w-full  max-w-xl bg-white rounded-2xl shadow-md p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isSignUp && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSignUp && (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Profile Picture
                    </FormLabel>
                    <FormControl>
                      <ImageUploader
                        onFileSelect={(file) => field.onChange(file)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              className="w-full font-semibold py-2 rounded-xl transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Please wait <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button
              variant="link"
              onClick={toggleAuthMode}
              className="ml-1 text-brand-200 hover:text-dark-50"
            >
              {isSignUp ? "Login" : "Register"}
            </Button>
          </p>
        </div>
      </div>
      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </div>
  );
}

export default AuthForm;
