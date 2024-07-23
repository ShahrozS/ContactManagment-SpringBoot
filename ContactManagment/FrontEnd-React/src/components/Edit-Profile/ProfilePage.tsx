import ButtonGradient from "../../assets/svg/ButtonGradient";
import Header from "../Header";
import LoginHeading from "../../Signin/LoginHeading";
import PasswordEdit from "./PasswordEdit";
import ProfileEdit from "./ProfileEdit";
import "./hinge.css";
import SpiralBinding from "./SpiralBinding";


const ProfilePage = () => {
  return (
    <>
          <Header />

      <div className=" relative pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"></div>
      <LoginHeading text="Update" />
      <div className="flex flex-row justify-center gap-3">
      <ProfileEdit />
      <div className="relative">
      <SpiralBinding/></div>
      <PasswordEdit/>
      </div>
    </>
  );
};

export default ProfilePage;
