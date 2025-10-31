import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/students"; // backend URL

  // Fetch students from backend
  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStudents(res.data);

      // Alert if no students found
      if (res.data.length === 0) {
        alert("No students found in the database!");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Error connecting to the server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent.id}`, form);
        setEditingStudent(null);
        alert("Student updated successfully!");
      } else {
        await axios.post(API_URL, form);
        alert("Student added successfully!");
      }
      setForm({ name: "", email: "", course: "" });
      getStudents();
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Failed to save student!");
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setForm({ name: student.name, email: student.email, course: student.course });
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Student deleted successfully!");
      getStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student!");
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold text-center mt-4">Student Management System</h1>

      <StudentForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingStudent={editingStudent}
      />

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentTable
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
