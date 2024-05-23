/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingOut} = useCheckout()
  if(isCheckingOut) return <Spinner/>
  return (
    <Button onClick={()=>checkout({bookingId})} disabled={isCheckingOut} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
