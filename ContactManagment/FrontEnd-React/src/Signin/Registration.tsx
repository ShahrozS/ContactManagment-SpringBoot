import ButtonGradient from "../assets/svg/ButtonGradient";
import Header from "../components/Header";
import LoginHeading from "./LoginHeading";
import RegistrationForm from "./RegistrationForm";

const Registration = () => {
  return (
    <>
      <div className=" pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"></div>
      <LoginHeading text="Register" />
      <RegistrationForm />
    </>
  );
};

export default Registration;
