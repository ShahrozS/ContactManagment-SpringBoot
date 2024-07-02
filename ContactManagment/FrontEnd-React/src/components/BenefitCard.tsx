import { useState, CSSProperties } from "react";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import { light } from "@mui/material/styles/createPalette";
import { ArrowLeft, ArrowRight, SwipeLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface BenefitCardProps {
  id: number;
  Contact?: {
    contact_id?: number;
    firstName?: string;
    lastName?: string;
    title?: string;
    emails?: { Email: string; LabelEmail: string }[];
    phones?: { PhoneNumber: string; LabelPhone: string }[];
  };
}

const BenefitCard: React.FC<BenefitCardProps> = ({ id, Contact }) => {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateX = (deltaY / centerY) * -15; // Adjust the -15 to control the tilt amount
    const rotateY = (deltaX / centerX) * 15; // Adjust the 15 to control the tilt amount

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
    });
  };

  const previousIndex = (index: number) => {
    if (index === 0) {
    } else {
      const currIndex = index - 1;
      setCurrentEmailIndex(currIndex);
    }
  };

  const NextIndex = (index: number) => {
    if (index === (Contact?.emails?.length ?? 0) - 1) {
    } else {
      const currIndex = index + 1;
      setCurrentEmailIndex(currIndex);
    }
  };

  const previousPhoneIndex = (index: number) => {
    if (index === 0) {
    } else {
      const currIndex = index - 1;
      setCurrentPhoneIndex(currIndex);
    }
  };

  const NextPhoneIndex = (index: number) => {
    if (index === (Contact?.phones?.length ?? 0) - 1) {
    } else {
      const currIndex = index + 1;
      setCurrentPhoneIndex(currIndex);
    }
  };

  return (
    <div
      className="rounded-lg w-[50rem] bg-n-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] card-container"
      style={{
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg   bg-n-7 z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
        <h5 className="h5 mb-5">
          {Contact?.firstName}
          {Contact?.lastName}
        </h5>
        <p className="body-2 mb-6 text-n-3">{Contact?.title}</p>

        <p className="body-2  text-n-3">{"Emails"}</p>

        <div className="">
          {Contact?.emails?.map((email, index) => (
            <div
              key={index}
              className={`${
                index === currentEmailIndex ? "block" : "hidden"
              } flex text-sm   items-center transition-opacity transition-height ease-in-out duration-300`}
              style={{
                maxWidth: "100%", // Ensures it doesn't overflow horizontally
                whiteSpace: "nowrap", // Prevents wrapping
                textOverflow: "ellipsis", // Show ellipsis if content overflows
              }}
            >
              <IconButton
                className=" pointer-events-auto"
                sx={{ padding: 0, margin: 0 }}
                onClick={() => previousIndex(index)}
              >
                <ArrowLeft
                  className="absolute right-1"
                  sx={{
                    fontSize: "32px",
                    color: "white",
                    display: "block",
                  }}
                />
              </IconButton>
              {email.Email}
              <span className="mr-2 ml-2 font-extrabold">&bull;</span>{" "}
              <div className="rounded-lg bg-opacity-90 text-black font-bold pl-3 pr-3 bg-lime-200">
                {email.LabelEmail}
              </div>
              <IconButton
                className=" pointer-events-auto"
                sx={{ padding: 0, margin: 0 }}
                onClick={() => NextIndex(index)}
              >
                <ArrowRight
                  sx={{
                    fontSize: "32px",
                    color: "white",
                    display: "block",
                  }}
                />
              </IconButton>
            </div>
          ))}
        </div>
        <p className="body-2  mt-4 text-n-3">{"Phone Numbers"}</p>

        {/* PHONE NUMBERS */}
        <div className="">
          {Contact?.phones?.map((phone, index) => (
            <div
              key={index}
              className={`${
                index === currentPhoneIndex ? "block" : "hidden"
              } flex text-sm   items-center transition-opacity transition-height ease-in-out duration-300`}
              style={{
                maxWidth: "100%", // Ensures it doesn't overflow horizontally
                whiteSpace: "nowrap", // Prevents wrapping
                textOverflow: "ellipsis", // Show ellipsis if content overflows
              }}
            >
              <IconButton
                className=" pointer-events-auto"
                sx={{ padding: 0, margin: 0 }}
                onClick={() => previousPhoneIndex(index)}
              >
                <ArrowLeft
                  className="absolute right-1"
                  sx={{
                    fontSize: "32px",
                    color: "white",
                    display: "block",
                  }}
                />
              </IconButton>
              {phone.PhoneNumber}
              <span className="mr-2 ml-2 font-extrabold">&bull;</span>{" "}
              <div className="rounded-lg bg-opacity-90 text-black font-bold pl-3 pr-3 bg-rose-400">
                {phone.LabelPhone}
              </div>
              <IconButton
                className=" pointer-events-auto"
                sx={{ padding: 0, margin: 0 }}
                onClick={() => NextPhoneIndex(index)}
              >
                <ArrowRight
                  sx={{
                    fontSize: "32px",
                    color: "white",
                    display: "block",
                  }}
                />
              </IconButton>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-auto">
          <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
            Edit
          </p>
          <Arrow />
        </div>
      </div>

      {light && <GradientLight />}

      <div
        className="absolute rounded-lg inset-0.5 bg-n-8"
        style={{ clipPath: "url(#benefits)" }}
      ></div>
    </div>
  );
};

export default BenefitCard;
