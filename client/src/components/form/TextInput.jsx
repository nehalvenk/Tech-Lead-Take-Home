import { X } from "lucide-react";
import { cn } from "../../utils";

const TextInput = ({ error, className, ...props }) => (
  <div>
    <input
      className={cn(
        "w-full px-4 py-2.5 rounded-lg border text-base text-neutral-900 outline-none transition-colors bg-white",
        error
          ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
          : "border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
        className,
      )}
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <X size={12} />
        {error}
      </p>
    )}
  </div>
);

export default TextInput;
