import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <nav className="navbar">

                <div className="logo">
                    Pristine<span>Code</span> Alpha
                </div>

                <button
                    className="nav-button"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>

            </nav>


            <main className="hero">

                <div className="hero-content">

                    <div className="badge">
                        Intelligent Data Quality Platform
                    </div>

                    <h1>
                        One Record.
                        <br />
                        <span>One Source of Truth.</span>
                    </h1>

                    <p>
                        Pristine Code Alpha validates individual
                        information, detects duplicate records and
                        helps maintain clean, accurate and reliable data.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() => navigate("/register")}
                        >
                            Register Your Information
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            View Dashboard
                        </button>

                    </div>

                </div>


                <div className="hero-card">

                    <div className="card-icon">
                        ✓
                    </div>

                    <h3>
                        Your information matters
                    </h3>

                    <p>
                        Our validation system checks incoming
                        information before it is stored.
                    </p>

                    <div className="verification">

                        <span>✓</span>
                        Data validated

                    </div>

                    <div className="verification">

                        <span>✓</span>
                        Duplicate protection

                    </div>

                    <div className="verification">

                        <span>✓</span>
                        Verified storage

                    </div>

                </div>

            </main>


            <section className="features">

                <div>
                    <h3>Smart Validation</h3>
                    <p>
                        Incoming information is validated
                        before being accepted.
                    </p>
                </div>

                <div>
                    <h3>Duplicate Detection</h3>
                    <p>
                        Existing records are checked to
                        prevent redundant information.
                    </p>
                </div>

                <div>
                    <h3>Data Integrity</h3>
                    <p>
                        Only verified and unique information
                        is stored in the database.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Landing;