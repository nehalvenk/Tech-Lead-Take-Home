import { ChevronDown } from "lucide-react";
import { cn } from "../../utils";
import SubmissionsTableRow from "./SubmissionsTableRow";

const STATUS_OPTIONS = [
  { value: "all", label: "Status" },
  { value: "published", label: "Published" },
  { value: "submitted", label: "Submitted" },
  { value: "unsubmitted", label: "Unsubmitted" },
];

const COLUMNS = ["Manuscript Number", "Title", "Status", "Created", "Updated", "Actions"];

const SubmissionsTable = ({ submissions, onEdit, statusFilter, onStatusFilterChange, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
        <h2 className="text-subheading">Your Submissions</h2>
        <ChevronDown size={20} className="text-neutral-900" />
      </div>

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
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </th>
                ) : (
                  <th key={col} className="px-6 py-3 text-xs font-black uppercase tracking-wide text-neutral-900 whitespace-nowrap">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
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
