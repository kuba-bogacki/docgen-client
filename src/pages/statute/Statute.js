import "./StatuteStyle.css";
import '../../../node_modules/animate.css/animate.css';
import textContent from "../../constans/textContent";

function Statute() {
  return (
    <div className="statute-container">
      <div className="statute-body">
        <div className="statute-header">
          <h1 className="animate__animated animate__fadeInRightBig">Website statute</h1>
          <hr className="statute-hr-line animate__animated animate__fadeInLeftBig"></hr>
          <h4 className="animate__animated animate__fadeInRightBig">Terms of use of the website and services offered</h4>
        </div>
        <div className="statute-paragraph">
          <h3>§ 1 - General concepts</h3>
          <ul className="paragraph-list">
            {textContent.paragraphOne.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 2 - General provisions</h3>
          <ul className="paragraph-list">
            {textContent.paragraphTwo.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 3 - Terms of Use of the Website</h3>
          <ul className="paragraph-list">
            {textContent.paragraphThree.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 4 - Terms and conditions of registration</h3>
          <ul className="paragraph-list">
            {textContent.paragraphFour.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 5 - Newsletter service conditions</h3>
          <ul className="paragraph-list">
            {textContent.paragraphFive.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 6 - Terms of communication and provision of other services on the Website</h3>
          <ul className="paragraph-list">
            {textContent.paragraphSix.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 7 - Collecting data about Service Recipients</h3>
          <ul className="paragraph-list">
            {textContent.paragraphSeven.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 8 - Copyright</h3>
          <ul className="paragraph-list">
            {textContent.paragraphEight.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 9 - Amendments to the Regulations</h3>
          <ul className="paragraph-list">
            {textContent.paragraphNine.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
        <div className="statute-paragraph">
          <h3>§ 10 - Final Provisions</h3>
          <ul className="paragraph-list">
            {textContent.paragraphTen.map((item, key) => (<li key={key}><p>{item}</p></li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Statute;