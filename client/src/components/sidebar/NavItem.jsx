import React from "react";
import { cn } from "../../utils";

const NavItem = ({ label, icon: Icon, active = false, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-5 py-3 w-full text-left text-white text-base font-normal transition-colors",
        active ? "bg-white/20" : "hover:bg-white/10",
        className,
      )}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default NavItem;
