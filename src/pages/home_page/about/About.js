import "./AboutStyle.css";
import '../../../../node_modules/animate.css/animate.css';
import textContent from "../../../constans/textContent.js";
import {useEffect, useState} from "react";

function About() {

  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [additionalComponents, setAdditionalComponents] = useState(<></>);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    }
  );

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    if (scrollPosition > 300) {
      setAdditionalComponents(
        <>
          <div className="about-header">
            <h1 className="animate__animated animate__fadeInRightBig">About Us</h1>
            <hr className="about-hr-line animate__animated animate__fadeInLeftBig"></hr>
            <h5 className="animate__animated animate__fadeInRightBig">{textContent.aboutSubtitle}</h5>
          </div>
          <div className="about-block-container animate__animated animate__fadeInUp">
            <div className="about-block">
              <h4>{textContent.aboutHeaderOne}</h4>
              <p>{textContent.aboutParagraphOne}</p>
            </div>
            <div className="about-block">
              <h4>{textContent.aboutHeaderTwo}</h4>
              <p>{textContent.aboutParagraphTwo}</p>
            </div>
            <div className="about-block">
              <h4>{textContent.aboutHeaderThree}</h4>
              <p>{textContent.aboutParagraphThree}</p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="about-container" id="about">
        {additionalComponents}
    </div>
  );
}

export default About;