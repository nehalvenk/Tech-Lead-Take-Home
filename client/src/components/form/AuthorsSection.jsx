import { useCallback } from "react";
import { X } from "lucide-react";
import TextInput from "./TextInput";
import { cn } from "../../utils";

// ---------------------------------------------------------------------------
// AuthorRow — one row of author fields (first, last, email, affiliation + remove)
// ---------------------------------------------------------------------------

const AuthorRow = ({ author, index, onChange, onRemove, errors, showLabels }) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
    <div>
      {showLabels && <p className="text-sm text-neutral-900/60 mb-1.5">First name</p>}
      <TextInput
        placeholder="First name"
        value={author.firstName}
        onChange={(e) => onChange(index, "firstName", e.target.value)}
        error={errors?.firstName}
      />
    </div>

    <div>
      {showLabels && <p className="text-sm text-neutral-900/60 mb-1.5">Last name</p>}
      <TextInput
        placeholder="Last name"
        value={author.lastName}
        onChange={(e) => onChange(index, "lastName", e.target.value)}
        error={errors?.lastName}
      />
    </div>

    <div>
      {showLabels && <p className="text-sm text-neutral-900/60 mb-1.5">Email address</p>}
      <TextInput
        type="email"
        placeholder="email@example.com"
        value={author.email}
        onChange={(e) => onChange(index, "email", e.target.value)}
        error={errors?.email}
      />
    </div>

    <div className="flex gap-2 items-start">
      <div className="flex-1">
        {showLabels && <p className="text-sm text-neutral-900/60 mb-1.5">Affiliation</p>}
        <TextInput
          placeholder="Institution or organization"
          value={author.affiliation}
          onChange={(e) => onChange(index, "affiliation", e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className={cn(
          "w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-700 text-white flex items-center justify-center transition-colors shrink-0",
          showLabels ? "mt-7" : "mt-0",
        )}
        aria-label="Remove author"
      >
        <X size={14} />
      </button>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// AuthorsSection — manages the list of AuthorRows + "Add another person"
// ---------------------------------------------------------------------------

const EMPTY_AUTHOR = { firstName: "", lastName: "", email: "", affiliation: "" };
const MAX_AUTHORS = 10;

const AuthorsSection = ({ authors, errors, onChange, onAdd, onRemove }) => (
  <div>
    <div className="space-y-6">
      {authors.map((author, i) => (
        <AuthorRow
          key={i}
          index={i}
          author={author}
          onChange={onChange}
          onRemove={onRemove}
          errors={errors[i]}
          showLabels={i === 0}
        />
      ))}
    </div>

    {authors.length < MAX_AUTHORS && (
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 text-primary-500 hover:text-primary-700 font-semibold text-base transition-colors underline"
      >
        Add another person
      </button>
    )}
  </div>
);

export { EMPTY_AUTHOR };
export default AuthorsSection;
