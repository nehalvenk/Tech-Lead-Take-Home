import { cn } from "../../utils";
import Button from "../Button";
import SearchBar from "./SearchBar";

const DashboardHeader = ({ title, searchValue, onSearchChange, onSearch, onNewSubmission, className }) => {
  return (
    <div className={cn("flex items-center justify-between px-8 py-6", className)}>
      <h1 className="text-heading">{title}</h1>
      <div className="flex items-center gap-3">
        <SearchBar value={searchValue} onChange={onSearchChange} onSearch={onSearch} />
        <Button variant="primary" text="New submission" icon="add" iconSide="left" onClick={onNewSubmission} className="rounded-lg" />
      </div>
    </div>
  );
};

export default DashboardHeader;
