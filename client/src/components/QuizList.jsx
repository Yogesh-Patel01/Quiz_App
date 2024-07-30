import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizes, setCurrentQuizes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    axios
      .get("http://localhost:7860/api/quizzes/all")
      .then((response) => {
        setQuizzes(response.data);
        // Simulate a 2-second loading delay
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false); // Make sure loading is set to false even in case of an error
      });
  }, []);

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentQuizzes = filteredQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );
  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
  };

  const handleDelete = (index) =>{
    alert("Delete CAlled " + index); // Update the state with the new array
  }

  const handleUpdate = () => {
    alert("Update");
  }

  return (
    <div className="container margin-top">
      <h2 className="mb-4">Available Quizzes</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        // Loading card
        <div className="card p-4">
          <h3>Loading...</h3>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          {/* You can add a loading spinner or any other loading UI here */}
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <p>No quizzes available matching your search criteria.</p>
      ) : (
        <div>
          <ul className="list-group">
            {currentQuizzes.map((quiz, index) => (
              <li className="row quiz-item" ker={index}>
                <div className="col-10 quiz-link">
                  <Link
                    key={quiz._id}
                    to={`/play/${quiz._id}`}
                    className="quiz-link"
                    > 
                    <h5 className="mb-1">{`Quiz.${indexOfFirstQuiz + index + 1} - ${
                      quiz.title
                    }`}</h5>
                    <p className="mb-1">{quiz.description}</p>
                  </Link>
                </div>
                <div className="col pt-2">
                  {/* quize Delete button */}
                  <button className="float-end btn btn-danger ms-4" onClick={() => handleDelete(index)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  {/* Quiz update button */}
                  <Link 
                    className="float-end btn btn-primary"
                    // add update page link
                    to={`/updateQuiz/${quiz._id}`}
                    >
                    <i class="fa-solid fa-file-pen"></i>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-3">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default QuizList;
