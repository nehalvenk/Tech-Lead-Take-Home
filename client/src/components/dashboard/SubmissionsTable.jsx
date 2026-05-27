import { ChevronDown, X } from "lucide-react";
import { cn } from "../../utils";
import SubmissionsTableRow from "./SubmissionsTableRow";

const STATUS_OPTIONS = [
  { value: "all", label: "Status" },
  { value: "published", label: "Published" },
  { value: "submitted", label: "Submitted" },
  { value: "unsubmitted", label: "Unsubmitted" },
];

const COLUMNS = ["Manuscript Number", "Title", "Status", "Created", "Updated", "Actions"];

const DATE_INPUT_CLASS =
  "border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-900 bg-white outline-none focus:border-primary-500 cursor-pointer";

const SubmissionsTable = ({
  submissions,
  loading,
  onEdit,
  statusFilter,
  onStatusFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}) => {
  const hasDateFilter = startDate || endDate;

  return (
    <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
      {/* Table card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
        <h2 className="text-subheading">Your Submissions</h2>
        <ChevronDown size={20} className="text-neutral-900" />
      </div>

      {/* Date filter bar */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-neutral-200 bg-neutral-100/60">
        <span className="text-xs font-black uppercase tracking-wide text-neutral-900">
          Filter by date
        </span>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-900/60">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            max={endDate || undefined}
            className={DATE_INPUT_CLASS}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-900/60">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate || undefined}
            className={DATE_INPUT_CLASS}
          />
        </div>
        {hasDateFilter && (
          <button
            onClick={() => { onStartDateChange(""); onEndDateChange(""); }}
            className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-700 font-semibold transition-colors"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              {COLUMNS.map((col) =>
                col === "Status" ? (
                  <th key={col} className="px-6 py-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => onStatusFilterChange(e.target.value)}
                      className="text-xs font-black uppercase tracking-wide text-neutral-900 bg-transparent border border-neutral-200 rounded px-2 py-1 cursor-pointer outline-none"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </th>
                ) : (
                  <th
                    key={col}
                    className="px-6 py-3 text-xs font-black uppercase tracking-wide text-neutral-900 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-body text-neutral-200">
                  Loading…
                </td>
              </tr>
            ) : submissions.length > 0 ? (
              submissions.map((submission) => (
                <SubmissionsTableRow
                  key={submission.id}
                  submission={submission}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-body text-neutral-200">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsTable;
