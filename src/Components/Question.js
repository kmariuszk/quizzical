import React from "react"
import { nanoid } from "nanoid"

// Question component consisting of question and possible answers
// Contains all functionality needed to select and display correct answer
function Question(props) {

    const answersElement = []

    // Process all possible answers to create a list of it with proper styling
    for (let i = 0; i < props.possible_answers.length; i++) {
        let colorClass = ""

        switch (true) {
            case (!props.checkAnswers):
                break
            case (props.selected === props.correct_answer && props.possible_answers[i] === props.correct_answer):
                colorClass = "question--correct-answer"
                break
            case (props.selected !== props.correct_answer && props.possible_answers[i] === props.correct_answer):
                colorClass = "question--correct-answer"
                break
            case (props.selected !== props.correct_answer && props.possible_answers[i] === props.selected):
                colorClass = "question--incorrect-answer"
                break
            default:
                colorClass = "question--blank-answer"
                break
        }

        answersElement.push(
            <button
                key={nanoid()}
                disabled={props.checkAnswers}
                className={
                    `question--answer-button 
                        ${colorClass}
                        ${props.selected === props.possible_answers[i] ? "question--selected" : ""}`
                }
                type="button"
                name={props.questionId}
                value={props.possible_answers[i]}
                onClick={(event) => props.handleClick(event)}
            >
                {props.possible_answers[i]}
            </button>
        )
    }

    return (
        <div className="question">
            <p className="question--question">
                {props.question}
            </p>
            <div className="question--answers-container">
                {answersElement}
            </div>
            <hr/>
        </div>
    )
}

export default Question