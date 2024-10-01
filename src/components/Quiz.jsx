import { useState, useEffect, useCallback } from "react";
import Question from "./Question";

export default function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy");
        const data = await res.json();
        setQuizData(data.results.map((result, index) => ({
            question: result.question,
            correctAnswer: result.correct_answer,
            choices: shuffleArray([...result.incorrect_answers, result.correct_answer]),
            selectedAnswer: null,
            id: index
        })));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const allAnswered = quizData.every((question) => question.selectedAnswer !== null);
        setAllQuestionsAnswered(allAnswered);
    }, [quizData]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getTotalScore = () => {
        let newScore = 0;
        quizData.forEach((question) => {
            if (question.correctAnswer === question.selectedAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
    };

    const handleOnChangeAnswer = (value, id) => {
        setQuizData((prev) =>
            prev.map((question) =>
                question.id === id ? { ...question, selectedAnswer: value } : question
            )
        );
    };

    const handleOnCheckAnswers = (e) => {
        e.preventDefault();
        if (allQuestionsAnswered) {
            setShowResults(true);
            getTotalScore();
        }
    };

    const newGame = () => {
        setScore(0);
        setShowResults(false);
        setQuizData([]);
        fetchData();
    };

    const questionsComponents = quizData.map((question) => (
        <Question
            question={question}
            key={question.id}
            onChange={handleOnChangeAnswer}
            showResults={showResults}
        />
    ));

    return (
        <div className="quiz-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleOnCheckAnswers}>
                    {questionsComponents}
                    {!showResults && allQuestionsAnswered && (
                        <button type="submit" className="btn-check-answer">
                            Check Answers
                        </button>
                    )}
                    {showResults && (
                        <div className="result-display">
                            <p className="score-display">You scored {score}/5 correct answers</p>
                            <button type="button" onClick={newGame} className="btn-play-again">
                                Play again
                            </button>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}