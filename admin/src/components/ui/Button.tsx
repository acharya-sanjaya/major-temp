import {MouseEventHandler} from "react";
import {cn} from "../../utils/cn";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  className?: string;
  label: string;
  variant: "standard" | "danger" | "success" | "muted" | "premium";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({label, className, type, variant, onClick}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "text-white flex items-center justify-center px-4 py-2 rounded-md cursor-pointer transition-colors uppercase font-bold",
        variant === "standard" && "bg-blue-500 hover:bg-blue-600",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        variant === "success" && "bg-green-500 hover:bg-green-600",
        variant === "muted" && "bg-gray-600 text-gray-200 cursor-not-allowed",
        variant === "premium" &&
          "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700",
        className
      )}
      onClick={variant === "muted" ? undefined : onClick}
    >
      {label}
    </button>
  );
};

export default Button;
