import { ChevronDown } from "lucide-react";

/**
 * options: string[] | { value: string; label: string }[]
 */
const SelectInput = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-base text-neutral-900 outline-none appearance-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors cursor-pointer"
    >
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-900 pointer-events-none"
    />
  </div>
);

export default SelectInput;
