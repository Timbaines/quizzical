import { useState } from 'react';
import Quiz from './components/Quiz';
import './style.css';

export default function App() {
    const [getQuiz, setGetQuiz] = useState(false);

    function handleGetQuiz() {
        setGetQuiz(true);
    }

    return (
        <main>
            <div className="blob-top"></div>
            {getQuiz ? (
                <Quiz/>
            ) : (
                <div className="start-container">
                    <h1 className="primary-heading">Quizzical</h1>
                    <p className="primary-description">How many questions can you correctly answer?</p>
                    <button onClick={handleGetQuiz} className="btn-start">Start Quiz</button>
                </div>
            )}
            <div className="blob-bottom"></div>
        </main>
    );
}