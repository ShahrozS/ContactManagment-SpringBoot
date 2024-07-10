import { useRef } from "react";
import LoginForm from "./LoginForm";
import LoginHeading from "./LoginHeading";
import { BackgroundCircles } from "../components/design/Hero";
import { Rings } from "../components/design/Header";

const Login = () => {
  const parallaxRef = useRef(null);

  return (
    <>
      <div
        ref={parallaxRef}
        className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"
      >
        <LoginHeading text="Login" />

        <LoginForm />
      </div>
    </>
  );
};

export default Login;
