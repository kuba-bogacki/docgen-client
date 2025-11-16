import {PaymentElement} from "@stripe/react-stripe-js/checkout";
import {useEffect, useState} from "react";
import {Dialog} from "@mui/material";
import {Elements} from "@stripe/react-stripe-js";
import StripeService from "../../services/stripeService";
import GlobalEnums from "../../constans/globalEnums";

function Payment({packagePrice, stripePromise, displayPayment}) {

  const [paymentOpen, setPaymentOpen] = useState(true);
  const [stripeSecretKey, setStripeSecretKey] = useState("");

  useEffect(() => {
    fetchStripeSecretKey();
  }, []);

  const closePayment = () => {
    displayPayment(false);
    setPaymentOpen(false)
  };

  const fetchStripeSecretKey = () => {
    console.log("fetchStripeSecretKey");
    let paymentData = {
      packagePrice : packagePrice,
      priceCurrency : GlobalEnums.PriceCurrency.PLN
    }
    // StripeService.runStripePaymentSession(paymentData)
    //   .then(response => {
    //     if (response.status === 200) {
    //       setStripeSecretKey(response.data.stripeSecretKey);
    //     } else {
    //       console.log("Error" + response.data);
    //     }
    //   });
  };

  const appearance = {
    theme: 'stripe',
  };

  const loader = 'auto';

  return (
    <div className="payment-container">
      <Dialog open={paymentOpen} onClose={closePayment}>
        <Elements options={{stripeSecretKey, appearance, loader}} stripe={stripePromise}>
          {/*<form>*/}
            {/*<PaymentElement/>*/}
            {/*<button>Submit</button>*/}
            <h1>Submit</h1>
          {/*</form>*/}
        </Elements>
      </Dialog>
    </div>
  );
}

export default Payment;