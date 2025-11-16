import "./PriceStyle.css";
import '../../../../node_modules/animate.css/animate.css';
import textContent from "../../../constans/textContent";
import style from "../../../constans/overwriteMaterialUiStyle";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Modal from "../../../components/modal/Modal";
import GlobalEnums from "../../../constans/globalEnums";
import ModalContent from "../../../constans/modalContent";
import LocalStorageService from "../../../services/localStorageService";
import Payment from "../../../components/payment/Payment";
import CookieService from "../../../services/cookieService";
import StripeService from "../../../services/stripeService";
import {loadStripe} from "@stripe/stripe-js";

function Price() {

  const [accordionVisibleClass, setAccordionVisible] = useState("accordion-arrow active");
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [additionalComponents, setAdditionalComponents] = useState(<></>);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);
  const priceButtons = document.getElementsByClassName("price-button");

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    }
  );

  const rollUpDownAccordion = () => {
    if (accordionVisibleClass === "accordion-arrow") {
      setAccordionVisible("accordion-arrow active");
      for (let i = 0; i < priceButtons.length; i++) {
        priceButtons[i].classList.remove("animate__backInUp");
        priceButtons[i].classList.add("animate__backOutDown");
      }
    } else if (accordionVisibleClass === "accordion-arrow active") {
      setAccordionVisible("accordion-arrow");
      for (let i = 0; i < priceButtons.length; i++) {
        priceButtons[i].style.display = "flex";
        priceButtons[i].classList.add("animate__backInUp");
        priceButtons[i].classList.remove("animate__backOutDown");
      }
    }
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    if (scrollPosition > 3000) {
      setAdditionalComponents(
        <>
          <div className="price-container-header">
            <h1 className="animate__animated animate__fadeInRightBig">Price</h1>
            <hr className="price-hr-line animate__animated animate__fadeInLeftBig"></hr>
            <h5 className="animate__animated animate__fadeInRightBig">{textContent.priceSubtitle}</h5>
          </div>
        </>
      );
    }
  };

  const displayModal = (view) => {
    setOpenModal(view);
  };

  const displayPayment = (view) => {
    setOpenPayment(view);
  };

  const runPayment = (membershipPackage) => {
    if (CookieService.isLogIn()) {
      switch (membershipPackage) {
        case GlobalEnums.MembershipPackage.Silver : {
          setMonthlyPrice(GlobalEnums.MembershipPackage.Silver);
          break;
        }
        case GlobalEnums.MembershipPackage.Diamond : {
          setMonthlyPrice(GlobalEnums.MembershipPackage.Silver);
          break;
        }
        case GlobalEnums.MembershipPackage.Gold : {
          setMonthlyPrice(GlobalEnums.MembershipPackage.Silver);
          break;
        }
      }
      displayPayment(true);
    } else {
      setModalTitle(ModalContent.userNotLoggedInTitle);
      setModalBody(ModalContent.userNotLoggedInBody);
      displayModal(true);
    }
  };

  return (
    <div className="price-container" id="price">
      {additionalComponents}
      <div className="price-box-accordion">
        <label className="price-label" htmlFor="price-checkbox">
          <input className="price-input" id="price-checkbox" type="checkbox"/>
          <div className="accordion-title" onClick={() => rollUpDownAccordion()}>
            <span></span>
            <h2 className="price-header-title">Check our prices</h2>
            <ArrowUpwardIcon fontSize="small" className={accordionVisibleClass}/>
          </div>
          <div className="accordion-content">
            <div className="accordion-package-content">
              <h2 className="accordion-package-title">{textContent.silverPackageTitle}</h2>
              <hr className="price-hr-line"></hr>
              <ul className="accordion-package-list">
                {textContent.silverPackageText.map((point, key) => (<li key={key}><p>{point}</p></li>))}
              </ul>
              <Button variant="outlined" size="large" sx={style.outlinedButtonStyle} className="price-button animate__animated"
                      onClick={() => runPayment(GlobalEnums.MembershipPackage.Silver)}>Subscribe</Button>
            </div>
            <div className="accordion-package-content">
              <h2 className="accordion-package-title">{textContent.diamondPackageTitle}</h2>
              <h4><em>Most Popular</em></h4>
              <hr className="price-hr-line"></hr>
              <ul className="accordion-package-list">
                {textContent.diamondPackageText.map((point, key) => (<li key={key}><p>{point}</p></li>))}
              </ul>
              <Button variant="contained" size="large" sx={style.containedButtonStyle} className="price-button animate__animated"
                      onClick={() => runPayment(GlobalEnums.MembershipPackage.Diamond)}>Subscribe</Button>
            </div>
            <div className="accordion-package-content">
              <h2 className="accordion-package-title">{textContent.goldPackageTitle}</h2>
              <hr className="price-hr-line"></hr>
              <ul className="accordion-package-list">
                {textContent.goldPackageText.map((point, key) => (<li key={key}><p>{point}</p></li>))}
              </ul>
              <Button variant="outlined" size="large" sx={style.outlinedButtonStyle} className="price-button animate__animated"
                      onClick={() => runPayment(GlobalEnums.MembershipPackage.Gold)}>Subscribe</Button>
            </div>
          </div>
        </label>
      </div>
      {openModal && <Modal modalTitle={modalTitle} modalBody={modalBody} displayModal={displayModal}/>}
      {openPayment && <Payment packagePrice={monthlyPrice} stripePromise={loadStripe(StripeService.publicKey)} displayPayment={displayPayment}/>}
    </div>
  );
}

export default Price;