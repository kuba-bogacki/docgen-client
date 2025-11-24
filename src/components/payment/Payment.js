import {Elements} from "@stripe/react-stripe-js";
import {useEffect, useRef, useState} from "react";
import {Dialog} from "@mui/material";
import StripeService from "../../services/stripeService";
import GlobalEnums from "../../constans/globalEnums";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment({packagePrice, membership, displayPayment}) {

  const effectCalled = useRef(false);
  const stripePromise = loadStripe(StripeService.publicKey);

  const [paymentOpen, setPaymentOpen] = useState(true);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [stripeClientSecret, setStripeClientSecret] = useState("");

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;
    fetchStripeClientSecret();
  }, []);

  const fetchStripeClientSecret = () => {
    let paymentData = {
      membership : membership,
      packagePrice : packagePrice,
      priceCurrency : GlobalEnums.PriceCurrency.PLN
    }
    StripeService.createStripePaymentSession(paymentData)
      .then(response => {
        if (response.status === 201) {
          setPaymentIntentId(response.data.paymentIntentId);
          setStripeClientSecret(response.data.paymentClientSecret);
        } else {
          console.log("Error" + response.data);
        }
      });
  };

  const cancelPayment = () => {
    StripeService.cancelStripePaymentSession(paymentIntentId)
      .then(response => {
        if (response.status === 202) {
          displayPayment(false);
          setPaymentOpen(false)
        } else {
          console.log("Error" + response.data);
        }
      });
  };

  const options = {
    clientSecret: stripeClientSecret,
    appearance: {
      theme: "stripe",
    }
  };

  return (
    <div className="payment-container">
      <Dialog open={paymentOpen} onClose={cancelPayment}>
        {stripeClientSecret &&
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm membership={membership} displayPayment={displayPayment}/>
        </Elements>
        }
      </Dialog>
    </div>
  );
}

export default Payment;