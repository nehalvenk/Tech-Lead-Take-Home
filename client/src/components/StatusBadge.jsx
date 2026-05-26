import { cn } from "../utils";

const variantStyleMap = {
  published:   "bg-primary-700 text-white",
  submitted:   "bg-primary-500 text-white",
  unsubmitted: "bg-secondary-400 text-neutral-900",
};

const LABELS = {
  published:   "Published",
  submitted:   "Submitted",
  unsubmitted: "Unsubmitted",
};

const StatusBadge = ({ status, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-badge uppercase tracking-wide w-36",
        variantStyleMap[status],
        className,
      )}
    >
      {LABELS[status] ?? status}
    </span>
  );
};

export default StatusBadge;
