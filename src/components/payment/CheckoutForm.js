import "./CheckoutFormStyle.css";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import StripeService from "../../services/stripeService";
import style from "../../constans/overwriteMaterialUiStyle";
import {Button} from "@mui/material";

function CheckoutForm({membership, displayPayment}) {

  const stripe = useStripe();
  const elements = useElements();

  const updateUserMembership = (membership) => {
    StripeService.updateUserMembership(membership)
      .then(response => {
        if (response.status === 200) {
          displayPayment(false);
        } else {
          console.log("Error" + response.data);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserMembership(membership);
    if (stripe && elements) {
      stripe.confirmPayment({
        elements: elements,
        confirmParams: {
          // TODO: need to be update dynamically, not hardcoded
          return_url: "http://localhost:3000/user-panel",
        }
      }).then(() => {});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form-container">
      <PaymentElement/>
      <Button variant="outlined" size="large" sx={style.signUpButtonStyle} type="submit">Subscribe</Button>
    </form>
  );
}

export default CheckoutForm;
