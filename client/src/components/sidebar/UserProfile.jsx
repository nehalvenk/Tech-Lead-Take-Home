import { cn } from "../../utils";

const UserProfile = ({ name, isOnline = false, className }) => {
  return (
    <div className={cn("flex items-center gap-3 p-5 border-b border-white/20", className)}>
      <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-semibold flex-shrink-0">
        {name?.charAt(0) ?? "U"}
      </div>
      <div>
        <p className="text-white text-label">{name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={cn("w-2 h-2 rounded-full", isOnline ? "bg-green-400" : "bg-red-500")} />
          <span className="text-white/80 text-xs">{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
