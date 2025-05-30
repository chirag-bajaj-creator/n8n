import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Task: "",
    DueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionDate = new Date().toISOString().split("T")[0]; // <-- Add this line

    await fetch("https://n8n-service-fjos.onrender.com/webhook/bca5435f-16cf-4d9a-9eb9-56b92f76895c", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: form.Name,
        Email: form.Email,
        Task: form.Task,
        "Due Date": form.DueDate,
        "Submission Date": submissionDate, // <-- Send this to n8n
      }),
    });

    alert("Task submitted successfully!");
    setForm({ Name: "", Email: "", Task: "", DueDate: "" });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Submit Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" placeholder="Name" onChange={handleChange} value={form.Name} required /><br /><br />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} value={form.Email} required /><br /><br />
        <input type="text" name="Task" placeholder="Task" onChange={handleChange} value={form.Task} required /><br /><br />
        <input type="date" name="DueDate" onChange={handleChange} value={form.DueDate} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
