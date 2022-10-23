import React from "react";
import Question from "./Components/Question";
import Blob from "./Components/Blob";
import { nanoid } from 'nanoid'

function App() {
  // === STATES DECLARATION ===

  // State containing for the questions data and information whether to check questions
  const [questions, setQuestions] = React.useState({
    data: [],
    checkAnswers: false
  })

  // State containing information about the state of the game 
  const [isFinished, setIsFinished] = React.useState(false)

  // State containing a list of Question components with questions.data inside
  const [quiz, setQuiz] = React.useState([])

  // State contatining information whether data is being fetched
  const [loading, setLoading] = React.useState(false)

  // === EFFECTS DECLARATIONS ===

  // Effect which creates a new list of Questions components when questions.data changes
  React.useEffect(() => {
    let renderedQuestionList = []

    for (let i = 0; i < questions.data.length; i++) {
      const question = questions.data[i]

      renderedQuestionList.push(
        <Question
          key={nanoid()}
          question={question.content}
          correct_answer={question.correct_answer}
          possible_answers={question.possible_answers}
          questionId={i}
          selected={question.currentAnswer}
          handleClick={handleAnswerClick}
          checkAnswers={questions.checkAnswers}
        />
      )
    }

    setQuiz(renderedQuestionList)
  }, [questions])

  // === FUNCTIONS DECLARATIONS ===

  // Starts new quiz game (fetch new questions and update questions.data)
  function startQuiz() {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        let questionList = []

        for (const question of data.results) {
          let possibleAnswers = question.incorrect_answers
            .concat([question.correct_answer])
            .map(answer => formatString(answer))

          possibleAnswers = possibleAnswers.length === 2 ? ["True", "False"] : shuffle(possibleAnswers);

          questionList.push(
            {
              content: formatString(question.question),
              correct_answer: formatString(question.correct_answer),
              possible_answers: possibleAnswers,
              currentAnswer: ""
            }
          )
          setLoading(false)
          setIsFinished(false)
        }

        setQuestions({
          data: questionList
        })
      })
  }

  // Handles user picking an answer
  function handleAnswerClick(event) {
    const { name, value } = event.target

    setQuestions(oldQuestions => {
      const newData = oldQuestions.data
      newData[name].currentAnswer = value
      return ({
        data: newData
      })
    })
  }

  // Updates questions.checkAnswers and isFinished to indicate the game is over
  function checkAnswers() {
    setQuestions(oldQuestions => ({
      ...oldQuestions,
      checkAnswers: true
    }))

    setIsFinished(true)
  }

  // Calculate the points
  function calculatePoints() {
    let score = 0

    for (const question of questions.data) {
      if (question.correct_answer === question.currentAnswer) {
        score++
      }
    }

    return score
  }

  return (
    <main>
      {
        loading ?
          (
            <div className="loader--container">
              <div className="loader--spinner"></div>
            </div>
          ) : (
            questions.data.length !== 0 ?
              (
                // Quiz screen
                <section className="quiz">
                  {quiz}

                  {
                    isFinished ?
                      (
                        // The game is over; display the result
                        <div className="quiz--footer">
                          <p id="quiz--feedback">
                            {`You scored ${calculatePoints()} / 5 correct answers!`}
                          </p>
                          <button id="quiz--play-again" onClick={startQuiz}>
                            Play again
                          </button>
                        </div>
                      ) : (
                        // The game is not over; display a button to finish the game
                        <div className="quiz--footer">
                          <button id="quiz--submit" onClick={checkAnswers}>Check answers</button>
                        </div>
                      )
                  }
                </section>
              ) : (
                // Splash screen; appears only when users enter the website for the first time
                <section className="splash">
                  <h1 className="splash--title">Quizzical</h1>
                  <p className="splash--description">Challenge yourself with questions from the Open Trivia Database!</p>
                  <button className="splash--start" onClick={startQuiz}>Start quiz</button>
                </section>
              )
          )
      }
      <div className="blobs-container">
        <Blob color="#FFFAD1" isSplashScreen={questions.data.length === 0} />
        <Blob color="#DEEBF8" isSplashScreen={questions.data.length === 0} />
      </div>
    </main>
  );
}

// Decodes HTML entities in a naive fashion (replaces all entities with single quotation mark) 
function formatString(str) {
  let result = str.replace(new RegExp("&[a-z0-9#]*;", 'g'), "'");
  return result;
}

// Shuffles an array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default App;