import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

function Home() {
  const { isLoggedIn } = useAuth();

  const path = isLoggedIn ? "/places/new" : "/auth";

  return (
    <div className="container flex flex-col items-center">
      <h1 className="title">Discover Amazing Places</h1>
      <p className="text-center md:text-lg text-dark-50">
        Explore stunning destinations and hidden gems shared by our community of
        passionate travelers from around the world.
      </p>
      <Link to={path}>
        <Button
          variant="default"
          className="mt-5 px-8 md:mt-[50px] md:px-10 md:py-6 md:text-lg"
        >
          Get Start
        </Button>
      </Link>
      <div class="max-w-[1000px] mx-auto mt-[50px]">
        <img
          src="/assets/home-image.jpg"
          alt="Home"
          class="rounded-xl opacity-80 w-full "
        />
      </div>
    </div>
  );
}

export default Home;
