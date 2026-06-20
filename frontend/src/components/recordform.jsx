import { useState } from "react";
import API from "../services/api";

function RecordForm({ refresh }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] =
    useState("");

  const submit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post("/records", form);

      setMessage(
        response.data.message
      );

      setForm({
        name: "",
        email: "",
        phone: ""
      });

      refresh();

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        error.response?.data?.error
      );

    }

  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value
          })
        }
      />

      <button type="submit">
        Submit
      </button>

      <p>{message}</p>

    </form>
  );
}

export default RecordForm;
