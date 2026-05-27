import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SubmissionsTable from "../components/dashboard/SubmissionsTable";
import SubmissionFormPage from "./SubmissionFormPage";
import { fetchSubmissions } from "../api";

const MOCK_USER = { name: "Max Bacon", isOnline: false };

const DashboardPage = () => {
  // Navigation
  const [activeNav, setActiveNav] = useState("Dashboard");

  // View: 'dashboard' | 'form'
  const [view, setView] = useState("dashboard");
  const [editingSubmission, setEditingSubmission] = useState(null);

  // Data
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Filters — search is committed on Enter / button click
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // -------------------------------------------------------------------------
  // Data loading
  // -------------------------------------------------------------------------

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const data = await fetchSubmissions({
        search: committedSearch,
        status: statusFilter,
        startDate,
        endDate,
      });
      setSubmissions(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, [committedSearch, statusFilter, startDate, endDate]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  // -------------------------------------------------------------------------
  // Navigation handlers
  // -------------------------------------------------------------------------

  const handleNewSubmission = () => {
    setEditingSubmission(null);
    setView("form");
  };

  const handleEdit = (id) => {
    const found = submissions.find((s) => s.id === id);
    setEditingSubmission(found ?? null);
    setView("form");
  };

  const handleFormDone = useCallback(() => {
    setView("dashboard");
    loadSubmissions();
  }, [loadSubmissions]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={MOCK_USER} activeNav={activeNav} onNavChange={setActiveNav} />

      {view === "form" ? (
        <SubmissionFormPage submission={editingSubmission} onDone={handleFormDone} />
      ) : (
        <main className="flex-1 flex flex-col overflow-auto bg-neutral-100">
          <DashboardHeader
            title="Dashboard"
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            onSearch={() => setCommittedSearch(searchInput)}
            onNewSubmission={handleNewSubmission}
          />

          <div className="px-8 pb-8">
            {fetchError && (
              <p className="mb-4 text-sm text-red-500">
                Failed to load submissions: {fetchError}
              </p>
            )}
            <SubmissionsTable
              submissions={submissions}
              loading={loading}
              onEdit={handleEdit}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default DashboardPage;
