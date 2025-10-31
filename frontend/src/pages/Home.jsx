import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/studentService";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
      setEditingStudent(null);
    } else {
      await addStudent(data);
    }
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Management System</h1>
      <StudentForm onSubmit={handleSubmit} editingStudent={editingStudent} />
      <StudentTable students={students} onEdit={setEditingStudent} onDelete={handleDelete} />
    </div>
  );
}
