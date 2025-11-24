import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import StripeService from "../../services/stripeService";

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
          return_url: "http://localhost:3000/user-panel",
        }
      }).then(() => {});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <button>Submit</button>
    </form>
  );
}

export default CheckoutForm;
