/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingOut} = useCheckout()
  const navigate = useNavigate()

  function handleClick () {
checkout({bookingId})

  }
  if(isCheckingOut) return <Spinner/>
  return (
    <Button onClick={handleClick} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
