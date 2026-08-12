import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        address: "",
        occupation: "",
        organization: "",
        nationality: "",
        additional_information: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setMessageType("");


        try {

            const response = await API.post(
                "/records",
                form
            );


            setMessage(
                response.data.message ||
                "Your information has been successfully registered."
            );

            setMessageType("success");


            setForm({
                name: "",
                email: "",
                phone: "",
                date_of_birth: "",
                gender: "",
                country: "",
                state: "",
                city: "",
                address: "",
                occupation: "",
                organization: "",
                nationality: "",
                additional_information: ""
            });


        } catch (error) {

            const data = error.response?.data;


            setMessage(
                data?.message ||
                "Unable to submit your information."
            );

            setMessageType(
                error.response?.status === 409
                    ? "duplicate"
                    : "error"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="register-page">

            <div className="register-container">

                <div className="register-header">

                    <button
                        className="back-button"
                        onClick={() => navigate("/")}
                    >
                        ← Back
                    </button>

                    <div className="badge">
                        Secure Registration
                    </div>

                    <h1>
                        Tell Us About Yourself
                    </h1>

                    <p>
                        Provide accurate information below.
                        Our system will validate your details
                        and check for existing records.
                    </p>

                </div>


                {message && (

                    <div className={`message ${messageType}`}>

                        {message}

                    </div>

                )}


                <form
                    className="registration-form"
                    onSubmit={handleSubmit}
                >

                    <section>

                        <h2>Personal Information</h2>

                        <div className="form-grid">

                            <div className="field full">

                                <label>Full Name *</label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>Email Address *</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>Mobile Number *</label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+234 801 234 5678"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>Date of Birth *</label>

                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={form.date_of_birth}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>Gender *</label>

                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                    <option value="Prefer not to say">
                                        Prefer not to say
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>


                    <section>

                        <h2>Location</h2>

                        <div className="form-grid">

                            <div className="field">

                                <label>Country *</label>

                                <input
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    placeholder="Nigeria"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>State *</label>

                                <input
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    placeholder="Rivers"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>City *</label>

                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Port Harcourt"
                                    required
                                />

                            </div>


                            <div className="field full">

                                <label>Address *</label>

                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Enter your residential address"
                                    rows="3"
                                    required
                                />

                            </div>

                        </div>

                    </section>


                    <section>

                        <h2>Professional Information</h2>

                        <div className="form-grid">

                            <div className="field">

                                <label>Occupation *</label>

                                <input
                                    name="occupation"
                                    value={form.occupation}
                                    onChange={handleChange}
                                    placeholder="Software Developer"
                                    required
                                />

                            </div>


                            <div className="field">

                                <label>Organization</label>

                                <input
                                    name="organization"
                                    value={form.organization}
                                    onChange={handleChange}
                                    placeholder="Company or organization"
                                />

                            </div>


                            <div className="field">

                                <label>Nationality</label>

                                <input
                                    name="nationality"
                                    value={form.nationality}
                                    onChange={handleChange}
                                    placeholder="Nigerian"
                                />

                            </div>

                        </div>

                    </section>


                    <section>

                        <h2>Additional Information</h2>

                        <textarea
                            className="large-textarea"
                            name="additional_information"
                            value={form.additional_information}
                            onChange={handleChange}
                            placeholder="Any additional information you would like to provide..."
                            rows="5"
                        />

                    </section>


                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Verifying Information..."
                            : "Submit & Verify Information"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;