import { useEffect } from "react";

type ToastProps = {
  color: string;
  text: string;
  onClose: () => void;
  className:string;
};

const Toast = ({ color, text, onClose,className }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${
        color === "successful" ? "bg-green-400" : "bg-red-500"
      }  text-white   p-5 h-10 font-bold transition-all flex items-center rounded-md ${className===""?"":className} `}
    >
      {text}
    </div>
  );
};

export default Toast;
