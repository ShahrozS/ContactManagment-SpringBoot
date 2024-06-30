import React, { useState, CSSProperties } from "react";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";

interface BenefitCardProps {
  id: string;
  backgroundUrl: string;
  iconUrl: string;
  title: string;
  text: string;
  light?: boolean;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
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
