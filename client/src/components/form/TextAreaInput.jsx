import { X } from "lucide-react";
import { cn } from "../../utils";

/**
 * A textarea with an optional character counter and hint text.
 * Shows an error message (with X icon) when `error` is set, otherwise shows `hint`.
 */
const TextAreaInput = ({ value, onChange, error, hint, maxLength, rows = 5, ...props }) => (
  <div>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className={cn(
        "w-full px-4 py-2.5 rounded-lg border text-base text-neutral-900 outline-none transition-colors resize-none bg-white",
        error
          ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
          : "border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
      )}
      {...props}
    />

    {error ? (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <X size={12} />
        {error}
      </p>
    ) : hint ? (
      <p className="mt-1 text-sm text-neutral-900/40 italic">{hint}</p>
    ) : null}

    {maxLength != null && (
      <p className="mt-1 text-xs text-neutral-900/40 text-right">
        {value.length}/{maxLength}
      </p>
    )}
  </div>
);

export default TextAreaInput;
