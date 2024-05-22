/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingOut} = useCheckout()
  const navigate = useNavigate()
  if(isCheckingOut) return <Spinner/>
  return (
    <Button onClick={()=>checkout({bookingId})} disabled={isCheckingOut} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
