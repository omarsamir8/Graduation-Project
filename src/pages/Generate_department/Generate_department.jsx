import { useState } from "react";
import "./Generate_department.scss";
import Swal from "sweetalert2";

export default function Generate_department() {
  const [showResult, setShowResult] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false); // State to control showing questions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [recommendedDepartment, setRecommendedDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const departments = ["IS", "CS", "AI", "SC"];
  const departmentQuestions = {
    IS: [
      {
        text: "What does ERP stand for?",
        options: [
          { id: 0, text: "Enterprise Resource Planning", isCorrect: true },
          { id: 1, text: "Electronic Resource Processing", isCorrect: false },
          { id: 2, text: "Event-Driven Programming", isCorrect: false },
          { id: 3, text: "Extended Reporting Protocol", isCorrect: false },
        ],
      },
      {
        text: "What is the primary purpose of a database management system (DBMS)?",
        options: [
          {
            id: 0,
            text: "To store and manage data efficiently",
            isCorrect: true,
          },
          {
            id: 1,
            text: "To create graphical user interfaces",
            isCorrect: false,
          },
          {
            id: 2,
            text: "To perform complex mathematical calculations",
            isCorrect: false,
          },
          {
            id: 3,
            text: "To design algorithms for machine learning",
            isCorrect: false,
          },
        ],
      },
    ],
    CS: [
      {
        text: "What does HTML stand for?",
        options: [
          { id: 0, text: "Hyper Text Markup Language", isCorrect: true },
          {
            id: 1,
            text: "Hyperlink and Text Markup Language",
            isCorrect: false,
          },
          { id: 2, text: "Home Tool Markup Language", isCorrect: false },
          { id: 3, text: "Hyper Terminal Markup Language", isCorrect: false },
        ],
      },
      {
        text: "Which programming language is often used for server-side scripting?",
        options: [
          { id: 0, text: "JavaScript", isCorrect: false },
          { id: 1, text: "Python", isCorrect: false },
          { id: 2, text: "PHP", isCorrect: true },
          { id: 3, text: "Java", isCorrect: false },
        ],
      },
    ],
    AI: [
      {
        text: "What is the main goal of machine learning?",
        options: [
          { id: 0, text: "To optimize algorithms", isCorrect: false },
          { id: 1, text: "To mimic human intelligence", isCorrect: true },
          {
            id: 2,
            text: "To develop advanced user interfaces",
            isCorrect: false,
          },
          { id: 3, text: "To analyze network traffic", isCorrect: false },
        ],
      },
      {
        text: "Which type of neural network architecture is commonly used for image recognition?",
        options: [
          { id: 0, text: "Recurrent Neural Network (RNN)", isCorrect: false },
          {
            id: 1,
            text: "Convolutional Neural Network (CNN)",
            isCorrect: true,
          },
          { id: 2, text: "Feedforward Neural Network (FNN)", isCorrect: false },
          {
            id: 3,
            text: "Radial Basis Function Network (RBFN)",
            isCorrect: false,
          },
        ],
      },
    ],
    SC: [
      {
        text: "What is the fundamental unit of computation in quantum computing?",
        options: [
          { id: 0, text: "Quantum Bit (Qubit)", isCorrect: true },
          { id: 1, text: "Binary Digit (Bit)", isCorrect: false },
          { id: 2, text: "Quantum Byte (Qubyte)", isCorrect: false },
          { id: 3, text: "Quantum Word (Qword)", isCorrect: false },
        ],
      },
      {
        text: "What phenomenon allows quantum particles to exist in multiple states simultaneously?",
        options: [
          { id: 0, text: "Entanglement", isCorrect: false },
          { id: 1, text: "Superposition", isCorrect: true },
          { id: 2, text: "Decoherence", isCorrect: false },
          { id: 3, text: "Interference", isCorrect: false },
        ],
      },
    ],
  };

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestion + 1 < departmentQuestions[selectedDepartment].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      if (
        correctAnswers + 1 ===
        departmentQuestions[selectedDepartment].length
      ) {
        if (selectedDepartment === recommendedDepartment) {
          Swal.fire({
            icon: "success",
            title: "Congratulations",
            text: "This department is suitable for you!",
            timer: 5000,
          }).then(() => {
            setShowResult(false); // Hide the questions
          });
        }
      } else {
        if (selectedDepartment === recommendedDepartment) {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `We do not recommend the ${selectedDepartment} department for you.`,
            timer: 5000,
          }).then(() => {
            setShowResult(false); // Hide the questions
          });
        }
      }
      // Hide questions after SweetAlert is displayed
      setShowQuestions(false);
    }
  };

  const handleStartQuiz = (department) => {
    setSelectedDepartment(department); // Set selected department
    setRecommendedDepartment(department);
    setShowResult(false);
    setShowQuestions(true);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };

  return (
    <div className="col-12 Generate_department_page">
      <h4 className="recommendation_title col-10">
        Dear student, we can recommend a suitable department for you through
        this quiz{" "}
        <span>
          <i className="fa-solid fa-angles-down"></i>
        </span>
      </h4>
      <div className="department_buttons col-12">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => handleStartQuiz(department)}
            className={`${
              selectedDepartment === department ? "active" : ""
            } transparent-background`}
          >
            Start {department} Quiz
          </button>
        ))}
      </div>
      {showQuestions && (
        <div className="col-10 questions">
          <h3 className="col-12">
            Question {currentQuestion + 1} out of{" "}
            {departmentQuestions[recommendedDepartment].length} (
            {recommendedDepartment})
          </h3>
          <h4 className="col-12 question_text">
            {departmentQuestions[recommendedDepartment][currentQuestion].text}
          </h4>
          <ul className="col-11">
            {departmentQuestions[recommendedDepartment][
              currentQuestion
            ].options.map((option) => (
              <li
                onClick={() => optionClicked(option.isCorrect)}
                key={option.id}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showResult && (
        <div className="result col-5">
          <h1>Final result</h1>
          <h3>We recommend {recommendedDepartment} department for you</h3>
          <button onClick={() => handleStartQuiz(recommendedDepartment)}>
            Restart quiz
          </button>
        </div>
      )}
    </div>
  );
}
