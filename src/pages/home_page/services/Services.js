import "./ServicesStyle.css";
import "../../../../node_modules/animate.css/animate.css";
import Carousel from "./carousel/Carousel";
import textContent from "../../../constans/textContent";
import {useEffect, useState} from "react";

function Services() {

  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [additionalComponents, setAdditionalComponents] = useState(<></>);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    }
  );

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    if (scrollPosition > 1700) {
      setAdditionalComponents(
        <>
          <div className="services-container-header">
            <h1 className="animate__animated animate__fadeInRightBig">Practice Area</h1>
            <hr className="services-hr-line animate__animated animate__fadeInLeftBig"></hr>
            <h5 className="animate__animated animate__fadeInRightBig">{textContent.servicesSubtitle}</h5>
          </div>
          <Carousel/>
        </>
      );
    }
  }

  return (
    <div className="services-container" id="service">
      {additionalComponents}
    </div>
  );
}

export default Services;