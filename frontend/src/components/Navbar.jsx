import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            navigate("/login", { replace: true });
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <h2>JobTrack</h2>
            </div>

            <nav className="navbar-links">
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/applications">
                    Applications
                </NavLink>

                <NavLink to="/applications/new">
                    Add Application
                </NavLink>
            </nav>

            <div className="navbar-user">
                <span>{user?.name}</span>

                <button
                    onClick={handleLogout}
                    className="btn btn-danger"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;