import { useState } from "react";
import API from "../services/api";

function DetailedForm({ refresh }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    placeOfBirth: "",
    stateOfOrigin: "",
    occupation: ""
  });

  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/records", form);
      setMessage(response.data.message || "Record added");
      setForm({ name: "", email: "", phone: "", age: "", placeOfBirth: "", stateOfOrigin: "", occupation: "" });
      refresh && refresh();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <form id="detailed-form" onSubmit={submit} className="detailed-form">
      <h2>Add Individual Details</h2>

      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

      <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />

      <input placeholder="Place of Birth" value={form.placeOfBirth} onChange={e => setForm({ ...form, placeOfBirth: e.target.value })} />

      <input placeholder="State of Origin" value={form.stateOfOrigin} onChange={e => setForm({ ...form, stateOfOrigin: e.target.value })} />

      <input placeholder="Occupation" value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} />

      <button type="submit">Submit</button>

      <p className="message">{message}</p>
    </form>
  );
}

export default DetailedForm;
