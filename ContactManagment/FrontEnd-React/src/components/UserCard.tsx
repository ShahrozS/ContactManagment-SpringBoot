import React, { useState, CSSProperties } from "react";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";

interface UserCardProps {
  id: string;
  backgroundUrl: string;
  iconUrl: string;
  title: string;
  text: string;
  light?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  backgroundUrl,
  iconUrl,
  title,
  text,
  light,
}) => {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

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

  return (
    <div
      className="block rounded-lg bg-n-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] card-container"
      style={{
        ...tiltStyle,
        backgroundImage: `url(${backgroundUrl})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg   bg-n-7 z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
        <h5 className="h5 mb-5">{title}</h5>
        <p className="body-2 mb-6 text-n-3">{text}</p>
        <div className="flex items-center mt-auto">
          <button className="bg-n-3 px-2 py-2 pl-5 pr-5 rounded-xl ml-auto font-code text-lg font-extrabold pointer-events-auto text-n-7 uppercase tracking-wider">
            Add Friend
          </button>
          
        </div>
      </div>

      {light && <GradientLight />}

      <div
        className="absolute rounded-lg inset-0.5 bg-n-8"
        style={{ clipPath: "url(#Users)" }}
      ></div>
    </div>
  );
};

export default UserCard;


