import "./FaqStyle.css";
import '../../../node_modules/animate.css/animate.css';
import textContent from "../../constans/textContent";

function Faq() {

  const showAnswer = (answer) => {
    let currentDiv = document.getElementsByClassName("faq-component")[answer];
    let currentQuestion = document.getElementsByClassName("faq-question")[answer];
    let currentAnswer = document.getElementsByClassName("faq-answer")[answer];
    currentDiv.classList.add("display-answer");
    currentQuestion.style.color = "#181D31";
    currentAnswer.style.color = "#181D31";
  }

  const hideAnswer = (answer) => {
    let currentDiv = document.getElementsByClassName("faq-component")[answer];
    let currentQuestion = document.getElementsByClassName("faq-question")[answer];
    let currentAnswer = document.getElementsByClassName("faq-answer")[answer];
    currentDiv.classList.remove("display-answer");
    currentQuestion.style.color = "floralwhite";
    currentAnswer.style.color = "transparent";
  }

  return (
    <div className="faq-container">
      <div className="faq-body">
        <div className="faq-header">
          <h1 className="animate__animated animate__fadeInRightBig">Frequently Asked Questions</h1>
          <hr className="faq-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <h4 className="animate__animated animate__fadeInRightBig">We have collected the most frequently asked questions and tried to answer them in the best possible way</h4>
        </div>
        <div className="faq-component" onMouseOver={() => showAnswer(0)} onMouseLeave={() => hideAnswer(0)}>
          <h4 className="faq-question">{textContent.questionOne}</h4>
          <h4 className="faq-answer">{textContent.answerOne}</h4>
        </div>
        <div className="faq-component" onMouseOver={() => showAnswer(1)} onMouseLeave={() => hideAnswer(1)}>
          <h4 className="faq-question">{textContent.questionTwo}</h4>
          <h4 className="faq-answer">{textContent.answerTwo}</h4>
        </div>
        <div className="faq-component" onMouseOver={() => showAnswer(2)} onMouseLeave={() => hideAnswer(2)}>
          <h4 className="faq-question">{textContent.questionThree}</h4>
          <h4 className="faq-answer">{textContent.answerThree}</h4>
        </div>
        <div className="faq-component" onMouseOver={() => showAnswer(3)} onMouseLeave={() => hideAnswer(3)}>
          <h4 className="faq-question">{textContent.questionFour}</h4>
          <h4 className="faq-answer">{textContent.answerFour}</h4>
        </div>
      </div>
    </div>
  );
}

export default Faq;