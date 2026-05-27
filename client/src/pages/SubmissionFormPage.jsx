import { useState, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import Button from "../components/Button";
import FieldLabel from "../components/form/FieldLabel";
import TextInput from "../components/form/TextInput";
import SelectInput from "../components/form/SelectInput";
import TextAreaInput from "../components/form/TextAreaInput";
import AuthorsSection, { EMPTY_AUTHOR } from "../components/form/AuthorsSection";
import FormHeader from "../components/form/FormHeader";
import { createSubmission, updateSubmission } from "../api";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RESEARCH_TYPES = ["Software", "Dataset", "Article", "Preprint", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOI_RE = /^10\.\d{4,}\/\S+$/;
const TITLE_MAX = 300;
const ABSTRACT_MAX = 3000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatHeaderDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function isValidEmail(email) {
  return EMAIL_RE.test(email);
}

// ---------------------------------------------------------------------------
// SubmissionFormPage
// ---------------------------------------------------------------------------

const SubmissionFormPage = ({ submission, onDone }) => {
  const isEdit = Boolean(submission);

  const [form, setForm] = useState({
    title: submission?.title ?? "",
    researchObjectType: submission?.researchObjectType ?? "Software",
    authors: submission?.authors?.length ? submission.authors : [{ ...EMPTY_AUTHOR }],
    doi: submission?.doi ?? "",
    abstract: submission?.abstract ?? "",
  });

  const [touched, setTouched] = useState({ title: false, authors: false, doi: false });
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // -------------------------------------------------------------------------
  // Validation
  // -------------------------------------------------------------------------

  const titleError = useMemo(() => {
    if (!touched.title) return "";
    if (!form.title.trim()) return "Title is required";
    if (form.title.trim().length > TITLE_MAX) return `Title must be ${TITLE_MAX} characters or fewer`;
    return "";
  }, [form.title, touched.title]);

  const abstractError = useMemo(() => {
    if (form.abstract.length > ABSTRACT_MAX) return `Abstract must be ${ABSTRACT_MAX} characters or fewer`;
    return "";
  }, [form.abstract]);

  const doiError = useMemo(() => {
    if (!touched.doi) return "";
    if (form.doi.trim() && !DOI_RE.test(form.doi.trim())) return "DOI must be in the format 10.XXXX/suffix (e.g. 10.1000/xyz123)";
    return "";
  }, [form.doi, touched.doi]);

  const authorErrors = useMemo(() => {
    const emailCounts = {};
    form.authors.forEach((a) => {
      const key = a.email.trim().toLowerCase();
      if (key) emailCounts[key] = (emailCounts[key] || 0) + 1;
    });

    return form.authors.map((a) => {
      const errs = {};
      const anyFilled = a.firstName || a.lastName || a.email || a.affiliation;
      const shouldValidate = touched.authors || anyFilled || form.authors.length > 1;
      if (shouldValidate && anyFilled) {
        if (!a.firstName.trim()) errs.firstName = "Required";
        if (!a.lastName.trim()) errs.lastName = "Required";
      }
      if (a.email) {
        if (!isValidEmail(a.email)) errs.email = "Invalid email format";
        else if (emailCounts[a.email.trim().toLowerCase()] > 1) errs.email = "Duplicate email";
      }
      return errs;
    });
  }, [form.authors, touched.authors]);

  const isValid = useMemo(() => {
    if (!form.title.trim() || form.title.trim().length > TITLE_MAX) return false;
    if (form.abstract.length > ABSTRACT_MAX) return false;
    if (form.doi.trim() && !DOI_RE.test(form.doi.trim())) return false;
    const emails = form.authors.map((a) => a.email.trim().toLowerCase()).filter(Boolean);
    if (new Set(emails).size !== emails.length) return false;
    for (const a of form.authors) {
      const anyFilled = a.firstName || a.lastName || a.email || a.affiliation;
      if (anyFilled) {
        if (!a.firstName.trim() || !a.lastName.trim()) return false;
        if (a.email && !isValidEmail(a.email)) return false;
      }
    }
    return true;
  }, [form]);

  // -------------------------------------------------------------------------
  // Author handlers
  // -------------------------------------------------------------------------

  const handleAuthorChange = useCallback((index, field, value) => {
    setForm((f) => {
      const authors = [...f.authors];
      authors[index] = { ...authors[index], [field]: value };
      return { ...f, authors };
    });
  }, []);

  const handleAddAuthor = () =>
    setForm((f) => ({ ...f, authors: [...f.authors, { ...EMPTY_AUTHOR }] }));

  const handleRemoveAuthor = useCallback((index) => {
    setForm((f) => {
      if (f.authors.length === 1) return { ...f, authors: [{ ...EMPTY_AUTHOR }] };
      return { ...f, authors: f.authors.filter((_, i) => i !== index) };
    });
  }, []);

  // -------------------------------------------------------------------------
  // Save / Submit
  // -------------------------------------------------------------------------

  const buildPayload = (status) => ({
    title: form.title.trim(),
    researchObjectType: form.researchObjectType,
    authors: form.authors.filter((a) => a.firstName.trim() || a.lastName.trim()),
    doi: form.doi.trim(),
    abstract: form.abstract.trim(),
    status,
  });

  const handleSave = async (targetStatus) => {
    setTouched({ title: true, authors: true, doi: true });
    if (!isValid) return;
    setSubmitting(true);
    setServerError("");
    try {
      const payload = buildPayload(targetStatus);
      if (isEdit) {
        await updateSubmission(submission.id, payload);
      } else {
        await createSubmission(payload);
      }
      onDone();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  const versionLabel = isEdit
    ? `Version 1 · Last updated: ${formatHeaderDate(submission.updatedAt) ?? "—"}`
    : "New Submission";

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-neutral-100">
      <FormHeader
        onBack={onDone}
        versionLabel={versionLabel}
        status={isEdit ? submission.status : null}
      />

      <div className="max-w-3xl mx-auto w-full px-10 py-10">
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">
          Research Object Submission Form
        </h1>
        <p className="text-base text-neutral-900/60 mb-2">
          Please fill out the form below to complete your submission.
        </p>
        <p className="text-sm text-red-500 mb-8">* Indicates required field</p>

        {serverError && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
            <X size={14} />
            {serverError}
          </div>
        )}

        {/* Type of Research Object */}
        <div>
          <FieldLabel>Type of Research Object</FieldLabel>
          <SelectInput
            value={form.researchObjectType}
            onChange={(e) => setForm((f) => ({ ...f, researchObjectType: e.target.value }))}
            options={RESEARCH_TYPES}
          />
        </div>

        {/* Title */}
        <div className="mt-6">
          <FieldLabel required>Title</FieldLabel>
          <TextInput
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
            placeholder="Enter manuscript title"
            error={titleError}
            maxLength={TITLE_MAX + 1}
          />
          <p className="mt-1 text-xs text-neutral-900/40 text-right">
            {form.title.length}/{TITLE_MAX}
          </p>
        </div>

        {/* Co-Authors */}
        <div className="mt-8 mb-5">
          <hr className="border-neutral-200 mb-5" />
          <h2 className="text-xl font-bold text-neutral-900">Add Co-Authors</h2>
        </div>
        <AuthorsSection
          authors={form.authors}
          errors={authorErrors}
          onChange={handleAuthorChange}
          onAdd={handleAddAuthor}
          onRemove={handleRemoveAuthor}
        />

        {/* DOI */}
        <div className="mt-8">
          <FieldLabel>DOI</FieldLabel>
          <TextInput
            value={form.doi}
            onChange={(e) => setForm((f) => ({ ...f, doi: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, doi: true }))}
            placeholder="e.g. 10.1000/xyz123"
            error={doiError}
          />
        </div>

        {/* Abstract */}
        <div className="mt-6">
          <FieldLabel>Abstract</FieldLabel>
          <TextAreaInput
            value={form.abstract}
            onChange={(e) => setForm((f) => ({ ...f, abstract: e.target.value }))}
            error={abstractError}
            hint="Please provide a short summary of your submission"
            maxLength={ABSTRACT_MAX}
            rows={5}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-neutral-200">
          <Button
            variant="cancel"
            text="Save Draft"
            onClick={() => handleSave("unsubmitted")}
            disabled={submitting}
            className="rounded-lg"
          />
          <Button
            variant="primary"
            text="Submit"
            onClick={() => handleSave("submitted")}
            disabled={submitting || !isValid}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionFormPage;
