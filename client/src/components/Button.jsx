import { Plus, X, ArrowRight, ChevronRight, EllipsisVertical } from "lucide-react";
import React from "react";
import { cn } from "../utils";

const iconButtonMap = {
  x: X
};

const variantStyleMap = {
  primary:
    "bg-primary-500 hover:bg-primary-700 active:bg-primary-700 disabled:opacity-45 text-white",
  cancel:
    "bg-white border border-neutral-200 hover:border-neutral-900 text-neutral-200 hover:text-neutral-900 disabled:opacity-45",
  icon:
    "bg-primary-500 hover:bg-primary-700 active:bg-primary-700 disabled:opacity-45 text-white rounded-full p-2",
};

const Button = ({
  variant,
  disabled = false,
  onClick,
  text,
  icon,
  iconSide,
  className,
}) => {
  const Icon = icon
    ? typeof icon === "string" && Object.hasOwn(iconButtonMap, icon)
      ? iconButtonMap[icon]
      : icon
    : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "box-content rounded-full text-body font-semibold py-3 w-fit flex flex-row items-center justify-center px-6",
        variantStyleMap[variant],
        iconSide === "left" && "flex-row-reverse pl-5",
        iconSide === "right" && "pr-5",
        !!text && !!Icon && "gap-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {text || ""}
      {Icon && React.createElement(Icon, { size: 18 })}
    </button>
  );
};

export default Button;
