import AuthForm from "@/components/AuthForm";

function Auth() {
  return (
    <div className="flex w-full h-screen overflow-hidden md:items-center bg-[url('/assets/login-image.jpg')] bg-cover md:bg-none">
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="/assets/login-image.jpg"
          alt="Home"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="w-full md:w-1/2">
        <AuthForm />
      </div>
    </div>
  );
}

export default Auth;
