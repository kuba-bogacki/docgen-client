import {PaymentElement} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {Dialog} from "@mui/material";
import {Elements} from "@stripe/react-stripe-js";
import StripeService from "../../services/stripeService";
import GlobalEnums from "../../constans/globalEnums";

function Payment({packagePrice, membership, stripePromise, displayPayment}) {

  const [paymentOpen, setPaymentOpen] = useState(true);
  const [stripeClientSecret, setStripeClientSecret] = useState("");

  useEffect(() => {
    fetchStripeClientSecret();
  }, []);

  const closePayment = () => {
    displayPayment(false);
    setPaymentOpen(false)
  };

  const fetchStripeClientSecret = () => {
    console.log("fetchStripeClientSecret");
    let paymentData = {
      membership : membership,
      packagePrice : packagePrice,
      priceCurrency : GlobalEnums.PriceCurrency.PLN
    }
    StripeService.createStripePaymentSession(paymentData)
      .then(response => {
        if (response.status === 201) {
          setStripeClientSecret(response.data.clientSecret);
        } else {
          console.log("Error" + response.data);
        }
      });
  };

  const options = {
    clientSecret: stripeClientSecret,
    appearance: {
      theme: "stripe",
    },
    loader: "auto",
  };

  return (
    <div className="payment-container">
      <Dialog open={paymentOpen} onClose={closePayment}>
        <Elements options={options} stripe={stripePromise}>
          <form>
            <PaymentElement/>
            <button>Submit</button>
            <h1>Submit</h1>
          </form>
        </Elements>
      </Dialog>
    </div>
  );
}

export default Payment;