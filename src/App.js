
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

    await fetch("https://your-n8n-backend-domain/webhook/freelancer-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: form.Name,
        Email: form.Email,
        Task: form.Task,
        "Due Date": form.DueDate,
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
