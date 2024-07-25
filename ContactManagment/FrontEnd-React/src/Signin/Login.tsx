import { useRef } from "react";
import LoginForm from "./LoginForm";
import LoginHeading from "./LoginHeading";
import { BackgroundCircles } from "../components/design/Hero";
import { Rings } from "../components/design/Header";
import { heroBackground } from "../assets";

const Login = () => {
  const parallaxRef = useRef(null);

  return (
    <>

    <div className="overflow-hidden h-screen">
    <div className="absolute   w-full h-full overflow-hidden">
            <img
              src={heroBackground}
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
      <div
        ref={parallaxRef}
        className="relative h-[100vh] flex justify-center align-middle items-center   overflow-hidden"
      >

        <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
