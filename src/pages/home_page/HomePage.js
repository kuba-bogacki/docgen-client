import "./HomePageStyle.css";
import textContent from "../../constans/textContent.js";
import Section from "./section/Section";
import About from "./about/About";
import Services from "./services/Services";
import Price from "./price/Price";

function HomePage() {
  return (
    <div className="home-page-container">
      <Section sectionNumber="one" sectionHeader={textContent.sectionOneHeader} sectionText={textContent.sectionOne}/>
      <About/>
      <Section sectionNumber="two" sectionHeader={textContent.sectionTwoHeader} sectionText={textContent.sectionTwo}/>
      <Services/>
      <Section sectionNumber="three" sectionHeader={textContent.sectionThreeHeader} sectionText={textContent.sectionThree}/>
      <Price/>
      <Section sectionNumber="four" sectionHeader={textContent.sectionFourHeader} sectionText={textContent.sectionFour}/>
    </div>
  );
}

export default HomePage;