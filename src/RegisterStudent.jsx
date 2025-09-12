import React, { useRef, useState } from "react";
import "./styles.css";

function RegisterStudent() {
  const nameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const courseRef = useRef();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const registerStudent = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const age = parseInt(ageRef.current.value);
    const email = emailRef.current.value;
    const course = courseRef.current.value;

    console.log("Name", name);
    console.log("Age", age);
    console.log("Email", email);
    console.log("Course", course);

    if (!name || !age || !email || !course) {
      setMessage("Fill All");
      setIsError(true);
      return;
    }

    if (age < 18) {
      setMessage("Age must be 18 or above!");
      setIsError(true);
      return;
    }

    setMessage("Registered successfully!");
    setIsError(false);

    nameRef.current.value = "";
    ageRef.current.value = "";
    emailRef.current.value = "";
    courseRef.current.value = "";
  };

  return (
    <div className="form-container">
      {/* Q1b: Student Registration Form */}
      <form onSubmit={registerStudent}>
        <label>
          Name:
          <input type="text" ref={nameRef} placeholder="Enter Name" />
        </label>
        <label>
          Age:
          <input type="number" ref={ageRef} placeholder="Enter Age" />
        </label>
        <label>
          Email:
          <input type="email" ref={emailRef} placeholder="Enter Email" />
        </label>
        <label>
          Course:
          <input type="text" ref={courseRef} placeholder="Enter Course" />
        </label>
        <button type="Submit">Register</button>
      </form>

      {/* Q4: Feedback Messages */}
      {message && (
        <p className={isError ? "error-message" : "success-message"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default RegisterStudent;
