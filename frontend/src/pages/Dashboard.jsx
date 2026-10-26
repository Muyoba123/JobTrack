import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import applicationService from "../services/applicationService";
import Navbar from "../components/Navbar";

function Dashboard() {
    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                    setError("Failed to load dashboard data.");
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

    const stats = {
        total: applications.length,

        applied: applications.filter(
            (app) => app.status === "applied"
        ).length,

        interviews: applications.filter(
            (app) => app.status === "interview"
        ).length,

        offers: applications.filter(
            (app) => app.status === "offer"
        ).length,

        rejected: applications.filter(
            (app) => app.status === "rejected"
        ).length,
    };

    const recentApplications = applications.slice(0, 5);

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>
                            Welcome back, {user?.name}!
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

                {loading ? (
                    <p>Loading dashboard...</p>
                ) : !error ? (
                    <>
                        <section className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Applications</h3>
                                <p>{stats.total}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Applied</h3>
                                <p>{stats.applied}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Interviews</h3>
                                <p>{stats.interviews}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Offers</h3>
                                <p>{stats.offers}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Rejected</h3>
                                <p>{stats.rejected}</p>
                            </div>
                        </section>

                        <section className="content-card">
                            <div className="section-header">
                                <h2>Recent Applications</h2>

                                <Link to="/applications">
                                    View All
                                </Link>
                            </div>

                            {recentApplications.length === 0 ? (
                                <div className="empty-state">
                                    <p>
                                        You haven't added any job
                                        applications yet.
                                    </p>

                                    <Link
                                        to="/applications/new"
                                        className="btn btn-primary"
                                    >
                                        Add Your First Application
                                    </Link>
                                </div>
                            ) : (
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Company</th>
                                                <th>Position</th>
                                                <th>Status</th>
                                                <th>Date Applied</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentApplications.map(
                                                (app) => (
                                                    <tr key={app.id}>
                                                        <td>
                                                            {app.company_name}
                                                        </td>

                                                        <td>
                                                            {app.job_title}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`status-badge status-${app.status}`}
                                                            >
                                                                {app.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {app.application_date}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </>
                ) : null}
            </main>
        </>
    );
}

export default Dashboard;