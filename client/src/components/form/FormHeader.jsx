import { ChevronLeft } from "lucide-react";
import StatusBadge from "../StatusBadge";

/**
 * Sticky top bar shown on the submission form.
 * Shows a back button, version label, and (when editing) the current status badge.
 */
const FormHeader = ({ onBack, versionLabel, status }) => (
  <div className="sticky top-0 z-10 flex items-center gap-3 px-10 py-4 bg-white border-b border-neutral-200">
    <button
      type="button"
      onClick={onBack}
      className="text-neutral-900/50 hover:text-neutral-900 transition-colors"
      aria-label="Back to dashboard"
    >
      <ChevronLeft size={20} />
    </button>
    <span className="text-primary-500 font-semibold text-base">{versionLabel}</span>
    {status && <StatusBadge status={status} className="ml-1 text-xs px-2 py-1" />}
  </div>
);

export default FormHeader;
