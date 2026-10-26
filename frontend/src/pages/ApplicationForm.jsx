import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import applicationService from "../services/applicationService";
import Navbar from "../components/Navbar";

const initialForm = {
    company_name: "",
    job_title: "",
    location: "",
    status: "applied",
    application_date: new Date().toLocaleDateString("en-CA"),
    job_url: "",
    notes: "",
};

function ApplicationForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (!isEditing) return;

        let active = true;

        const fetchApplication = async () => {
            try {
                const application =
                    await applicationService.getById(id);

                if (active) {
                    setFormData({
                        company_name: application.company_name || "",
                        job_title: application.job_title || "",
                        location: application.location || "",
                        status: application.status || "applied",
                        application_date:
                            application.application_date?.slice(0, 10) || "",
                        job_url: application.job_url || "",
                        notes: application.notes || "",
                    });
                }
            } catch (err) {
                if (active) {
                    setError("Failed to load application.");
                    console.error(err);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchApplication();

        return () => {
            active = false;
        };
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setValidationErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");
        setValidationErrors({});

        const payload = {
            ...formData,
            location: formData.location || null,
            job_url: formData.job_url || null,
            notes: formData.notes || null,
        };

        try {
            if (isEditing) {
                await applicationService.update(id, payload);
            } else {
                await applicationService.create(payload);
            }

            navigate("/applications");
        } catch (err) {
            if (err.response?.status === 422) {
                setValidationErrors(
                    err.response.data.errors || {}
                );
            } else {
                setError("Failed to save application.");
            }

            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const fieldError = (field) =>
        validationErrors[field]?.[0];

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <div>
                        <h1>
                            {isEditing
                                ? "Edit Application"
                                : "Add Job Application"}
                        </h1>

                        <p>
                            {isEditing
                                ? "Update your application details."
                                : "Enter the details of your job application."}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <p>Loading application...</p>
                ) : (
                    <section className="content-card form-card">
                        {error && (
                            <div className="alert alert-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Company Name *</label>

                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        required
                                    />

                                    {fieldError("company_name") && (
                                        <small className="field-error">
                                            {fieldError("company_name")}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Job Title *</label>

                                    <input
                                        type="text"
                                        name="job_title"
                                        value={formData.job_title}
                                        onChange={handleChange}
                                        required
                                    />

                                    {fieldError("job_title") && (
                                        <small className="field-error">
                                            {fieldError("job_title")}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Location</label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />

                                    {fieldError("location") && (
                                        <small className="field-error">
                                            {fieldError("location")}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Application Status</label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="withdrawn">Withdrawn</option>
                                    </select>

                                    {fieldError("status") && (
                                        <small className="field-error">
                                            {fieldError("status")}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Application Date *</label>

                                    <input
                                        type="date"
                                        name="application_date"
                                        value={formData.application_date}
                                        onChange={handleChange}
                                        required
                                    />

                                    {fieldError("application_date") && (
                                        <small className="field-error">
                                            {fieldError("application_date")}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Job URL</label>

                                    <input
                                        type="url"
                                        name="job_url"
                                        value={formData.job_url}
                                        onChange={handleChange}
                                        placeholder="https://example.com/job"
                                    />

                                    {fieldError("job_url") && (
                                        <small className="field-error">
                                            {fieldError("job_url")}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Notes</label>

                                <textarea
                                    name="notes"
                                    rows="5"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Additional application details..."
                                />

                                {fieldError("notes") && (
                                    <small className="field-error">
                                        {fieldError("notes")}
                                    </small>
                                )}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate("/applications")
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : isEditing
                                            ? "Update Application"
                                            : "Save Application"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}
            </main>
        </>
    );
}

export default ApplicationForm;