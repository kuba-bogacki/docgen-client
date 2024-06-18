import "./CarouselStyle.css";
import textContent from "../../../../constans/textContent.js";

function Carousel() {
  return (
    <div className="carousel-container">
      <form className="carousel-form">
        <input className="carousel-input" type="radio" name="fancy" autoFocus value="services" id="services"/>
        <input className="carousel-input" type="radio" name="fancy" value="offer" id="offer"/>
        <label htmlFor="services" className="carousel-label">
          <div className="services-header">
            <h1>Services</h1>
          </div>
          <div className="services-text">
            <p>{textContent.carouselServices}</p>
          </div>
        </label>
        <label htmlFor="offer" className="carousel-label">
          <div className="services-header">
            <h1>Offer</h1>
          </div>
          <div className="services-text">
            <p>{textContent.carouselOffer}</p>
          </div>
        </label>
      </form>
    </div>
  );
}

export default Carousel;