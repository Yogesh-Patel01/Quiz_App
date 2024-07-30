import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../assets/css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:7860/api/quizzes/${id}`)
            .then((response) => {
                setQuiz(response.data);
                console.log(quiz);
                setSelectedAnswers(
                    new Array(response.data.questions.length).fill(null)
                );
                setCorrectAnswers(response.data.questions.map((q) => q.correctAnswer));
            })
            .catch((error) => {
                console.error("Error fetching quiz:", error);
            });
    }, [id]);


    return (
        <div>
            fjbowiuhg
        </div>
    );
};

export default UpdateQuiz;
