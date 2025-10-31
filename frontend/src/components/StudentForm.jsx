function StudentForm({ form, setForm, handleSubmit, editingStudent }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Enter course"
        value={form.course}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
