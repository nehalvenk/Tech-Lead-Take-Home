import { Search } from "lucide-react";
import { cn } from "../../utils";

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search", className }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border border-neutral-200 rounded-lg bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-200 outline-none w-64 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all"
      />
      <button
        onClick={onSearch}
        className="w-9 h-9 rounded-full bg-primary-500 hover:bg-primary-700 text-white flex items-center justify-center transition-colors shrink-0"
      >
        <Search size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
