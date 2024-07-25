import { heroBackground } from "../assets";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Header from "../components/Header";
import LoginHeading from "./LoginHeading";
import RegistrationForm from "./RegistrationForm";

const Registration = () => {
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
        className="relative h-[100vh] flex justify-center align-middle items-center   overflow-hidden"
      >

        <RegistrationForm />
        </div>
      </div>
    </>
  );
};

export default Registration;
