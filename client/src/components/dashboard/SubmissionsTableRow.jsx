import Button from "../Button";
import StatusBadge from "../StatusBadge";
import { formatDateParts } from "../../utils";

const DateCell = ({ dateStr }) => {
  const { date, time } = formatDateParts(dateStr);
  return (
    <td className="px-6 py-5 whitespace-nowrap">
      <div className="text-base font-normal text-neutral-900">{date}</div>
      <div className="text-sm text-neutral-900/60 mt-0.5">at {time}</div>
    </td>
  );
};

const SubmissionsTableRow = ({ submission, onEdit }) => {
  const { id, manuscriptNumber, title, status, createdAt, updatedAt } = submission;

  return (
    <tr className="border-t border-neutral-200 hover:bg-neutral-100/60 transition-colors">
      <td className="px-6 py-5 text-base text-neutral-900">{manuscriptNumber}</td>
      <td className="px-6 py-5 text-base font-semibold text-neutral-900 max-w-xs">{title}</td>
      <td className="px-6 py-5">
        <StatusBadge status={status} />
      </td>
      <DateCell dateStr={createdAt} />
      <DateCell dateStr={updatedAt} />
      <td className="px-6 py-5">
        <Button
          variant="primary"
          text="EDIT"
          onClick={() => onEdit(id)}
          className="rounded w-28 justify-center"
        />
      </td>
    </tr>
  );
};

export default SubmissionsTableRow;
