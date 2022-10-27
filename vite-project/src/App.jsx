import { useState } from "react";
import reactLogo from "./assets/react.svg";
import random from "./assets/utils";
import "./App.css";
import { useEffect } from "react";

import Question from "./components/Question";

import { FidgetSpinner } from "react-loader-spinner";
// import Quiz from "./assets/components/Quiz";

function App() {
  // const [quiz, setQuiz] = useState([])
  // const [start, setStart] = useState(false)
  // const [formData, setFormData] = useState({
  //   submit : ''
  // })

  // console.log(formData.submit)
  const [questionData, setQuestionData] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [score, setScore] = useState(0);

  // console.log(questionData);

  // function handleClick(event) {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       submit: event.target.value,
  //     };
  //   });
  // }

  // console.log(quiz);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://opentdb.com/api.php?amount=3&category=21&difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        let dataArray = data.results;
        setQuestionData(
          dataArray.map((data, index) => {
            return {
              id: index + 1,
              question: data.question,
              options: random([
                ...data.incorrect_answers.map((data, index) => {
                  return {
                    id: index + 1,
                    choice: data,
                    isSelected: false,
                    isCorrect: false,
                  };
                }),
                {
                  id: 4,
                  choice: data.correct_answer,
                  isSelected: false,
                  isCorrect: true,
                },
              ]),
            };
          })
        );
        setIsLoading(false);
      });
    // if(start){

    //   fetch("https://opentdb.com/api.php?amount=5&category=21")
    //     .then(res => res.json())
    //     .then(data => setQuiz(data.results))
    // }
  }, [newGame]);

  function makeSelection(qsid, choiceId) {
    console.log(qsid, choiceId);
    if (!isEnded) {
      setQuestionData((prevData) =>
        prevData.map((data) => {
          return data.id === qsid
            ? {
                ...data,
                options: data.options.map((optionvalue) => {
                  return optionvalue.id === choiceId
                    ? {
                        ...optionvalue,
                        isSelected: !optionvalue.isSelected,
                      }
                    : { ...optionvalue, isSelected: false };
                }),
              }
            : data;
        })
      );
    }
  }

  const renderQuestions = questionData.map((data, index) => {
    return (
      <Question
        key={index}
        question={data.question}
        options={data.options}
        handleClick={makeSelection}
        id={data.id}
        end={isEnded}
      />
    );
  });

  // const quizElements = quiz.map((item) => {
  //   let randomIndex = Math.floor(
  //     Math.random() * (item.incorrect_answers.length + 1)
  //   );
  //   return (
  //     <Quiz
  //       key={item.question}
  //       question={item.question}
  //       options={item.incorrect_answers.splice(
  //         randomIndex,
  //         0,
  //         item.correct_answer
  //       )}
  //       allOptions={item.incorrect_answers}
  //     />
  //   );
  // });

  function endGame() {
    setIsEnded(true);
    questionData.forEach((data) => {
      return data.options.forEach((option) => {
        if (option.isSelected && option.isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });
  }

  function begin() {
    setIsStarted(!isStarted);
    setScore(0);
  }

  function NewGameFunc() {
    setScore(0);
    setNewGame(!newGame);
    setIsEnded(!isEnded);
  }

  return isStarted ? (
    <main>
      {isLoading ? (
        <div className="result-container">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#ff0000", "#00ff00", "#0000ff"]}
            backgroundColor="#F4442E"
          />
          <img src="../public/gems-logo.jpg" />
        </div>
      ) : (
        renderQuestions
      )}
      <div>
        {isEnded && (
          <p>
            You Scored {score}/{questionData.length}
          </p>
        )}
        <button onClick={isEnded ? NewGameFunc : endGame}>
          {isEnded ? "New Game" : "Check Answer"}
        </button>
      </div>
    </main>
  ) : (
    <div>
      <h1>start</h1>
      <button onClick={begin}>start</button>
    </div>
  );
  // isStarted ?
  //   <main>
  //     {isLoading ? <div className="results-container">
  //     <FidgetSpinner
  //         visible={true}
  //         height="80"
  //         width="80"
  //         ariaLabel="dna-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="dna-wrapper"
  //         ballColors={['#ff0000', '#00ff00', '#0000ff']}
  //         backgroundColor="#F4442E"
  //       />
  //     </div>:
  //       renderQuestions
  //     }
  //   </main>
  //   <div className="App">
  //     {!start ? (
  //       <div>
  //         <h1>Begin</h1>
  //         <button onClick={begin}>start</button>
  //       </div>
  //     ) : (
  //       <div>
  //         {quizElements}
  //         <input
  //           type="button"
  //           value="submit"
  //           onClick={handleClick}
  //           name="submit"
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
}

export default App;
