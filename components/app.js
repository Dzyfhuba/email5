import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const { name, email } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" && email === "") {
      alert("Name and Email are required");
    } else {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // send request
        await axios.post(
          `http://localhost:5000/api/email`,
          { name, email },
          config
        );
        setLoading(false);
        setForm({
          ...form,
          name: "",
          email: "",
        });
      } catch (error) {
        setLoading(false);
        alert("Some thing went wrong");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        id="name"
        type="text"
        value={name}
        name="name"
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        id="email"
        type="text"
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="Email Address"
      />
      <button type="submit">{loading ? <>Sending...</> : <>Submit</>}</button>
    </form>
  );
};

export default Form;