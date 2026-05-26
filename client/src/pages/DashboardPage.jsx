import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SubmissionsTable from "../components/dashboard/SubmissionsTable";

const MOCK_USER = { name: "Max Bacon", isOnline: false };

const MOCK_SUBMISSIONS = [
  { id: 1, manuscriptNumber: 4757, title: "Cool Idea: But sample size = 2", status: "published", createdAt: "2021-05-17T09:04:00", updatedAt: "2021-05-17T09:05:00" },
  { id: 2, manuscriptNumber: 4754, title: "Reviewer 2 please don't be too harsh this time", status: "published", createdAt: "2021-05-14T01:09:00", updatedAt: "2021-05-17T09:00:00" },
  { id: 3, manuscriptNumber: 4753, title: "Too Esoteric of a Topic", status: "unsubmitted", createdAt: "2021-05-14T06:32:00", updatedAt: "2021-05-18T13:54:00" },
  { id: 4, manuscriptNumber: 4498, title: "Analysis of Brainrot", status: "published", createdAt: "2021-05-13T08:48:00", updatedAt: "2021-05-13T16:09:00" },
];

const DashboardPage = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSubmissions = MOCK_SUBMISSIONS
    .filter((s) => statusFilter === "all" || s.status === statusFilter)
    .filter((s) => s.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={MOCK_USER} activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="flex-1 flex flex-col overflow-auto bg-neutral-100">
        <DashboardHeader
          title="Dashboard"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={() => {}}
          onNewSubmission={() => {}}
        />
        <div className="px-8 pb-8">
          <SubmissionsTable
            submissions={filteredSubmissions}
            onEdit={(id) => {}}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
