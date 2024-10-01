import PropTypes from 'prop-types';

export default function Question({ question, onChange, showResults }) {
    const isCorrect = (choice) => showResults && choice === question.correctAnswer;
    const isIncorrect = (choice) => showResults && choice === question.selectedAnswer && choice !== question.correctAnswer;
    const getButtonClass = (choice) => {
        if (isCorrect(choice)) return 'btn-answer correct';
        if (isIncorrect(choice)) return 'btn-answer incorrect';
        return 'btn-answer' + (choice === question.selectedAnswer ? ' active' : '');
    };

    return (
        <div className="question-container">
            <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="selection-container">
                {question.choices.map((choice, index) => (
                    <button
                        key={index}
                        className={getButtonClass(choice)}
                        onClick={() => onChange(choice, question.id)}
                        dangerouslySetInnerHTML={{ __html: choice }}
                        disabled={showResults}
                    />
                ))}
            </div>
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        correctAnswer: PropTypes.string.isRequired,
        choices: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectedAnswer: PropTypes.string,
        id: PropTypes.number.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    showResults: PropTypes.bool.isRequired,
};
