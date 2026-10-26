import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import applicationService from "../services/applicationService";
import Navbar from "../components/Navbar";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        let active = true;

        const fetchApplications = async () => {
            try {
                const data = await applicationService.getAll();

                if (active) {
                    setApplications(data);
                }
            } catch (err) {
                if (active) {
                    setError("Failed to load applications.");
                    console.error(err);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchApplications();

        return () => {
            active = false;
        };
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) return;

        setDeletingId(id);
        setError("");

        try {
            await applicationService.delete(id);

            setApplications((previous) =>
                previous.filter((app) => app.id !== id)
            );
        } catch (err) {
            setError("Failed to delete application.");
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredApplications = applications.filter((app) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            app.company_name.toLowerCase().includes(searchText) ||
            app.job_title.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "all" ||
            app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <div>
                        <h1>My Applications</h1>
                        <p>
                            Track and manage your job applications.
                        </p>
                    </div>

                    <Link
                        to="/applications/new"
                        className="btn btn-primary"
                    >
                        + Add Application
                    </Link>
                </div>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <section className="content-card">
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Search company or job title..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="all">All Statuses</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </div>

                    {loading ? (
                        <p>Loading applications...</p>
                    ) : !error && filteredApplications.length === 0 ? (
                        <div className="empty-state">
                            <p>No matching applications found.</p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Job Title</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Date Applied</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredApplications.map((app) => (
                                        <tr key={app.id}>
                                            <td>{app.company_name}</td>

                                            <td>{app.job_title}</td>

                                            <td>{app.location || "—"}</td>

                                            <td>
                                                <span
                                                    className={`status-badge status-${app.status}`}
                                                >
                                                    {app.status}
                                                </span>
                                            </td>

                                            <td>{app.application_date}</td>

                                            <td>
                                                <div className="table-actions">
                                                    <Link
                                                        to={`/applications/${app.id}/edit`}
                                                        className="btn btn-secondary"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger"
                                                        disabled={
                                                            deletingId === app.id
                                                        }
                                                        onClick={() =>
                                                            handleDelete(app.id)
                                                        }
                                                    >
                                                        {deletingId === app.id
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

export default Applications;