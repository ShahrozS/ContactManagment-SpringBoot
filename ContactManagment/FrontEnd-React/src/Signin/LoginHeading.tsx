import { curve } from "../assets";
import { Rings } from "../components/design/Header";

interface LoginHeadingProps {
  text: string;
}

const LoginHeading = ({ text }: LoginHeadingProps) => {
  return (
    <>
      <h1 className="text-center font-code h1 font-bold mb-12">
        {text} to{" "}
        <span className="inline-block relative">
          TeleBook{" "}
          <img
            src={curve}
            alt="curve"
            className="absolute top-full left-0 w-full xl:-mt-2"
            width={624}
            height={28}
          />
        </span>
      </h1>
    </>
  );
};

export default LoginHeading;
