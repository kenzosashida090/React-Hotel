import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox"
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {booking, isLoading }= useBooking()
  const {checkin, isCheckingIn} = useCheckin()
  const moveBack = useMoveBack(); 
  const {settings, isLoading:isLoadingSettings} = useSettings()
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  
  useEffect(()=> setConfirmPaid(booking?.is_paid ?? false),[booking])
  if(isLoading || isLoadingSettings) return <Spinner/>
  const {
    booking_id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;
  function handleCheckin() {

    if(!confirmPaid)  return

    if(addBreakfast){
      checkin({bookingId, breakfast:{
        has_breakfast:true,
        extras_price: optionalBreakfastPrice,
        total_price: total_price + optionalBreakfastPrice,

      }})
    }else{
      checkin({bookingId, breakfast:{}})
    }
  }
  const optionalBreakfastPrice = settings.breakfast_price *num_guests *num_nights
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!has_breakfast &&<Box>
        <Checkbox checked={addBreakfast} onChange={()=>{
          setAddBreakfast((prev)=>!prev)
          setConfirmPaid(false)
          }}
          id="breakfast"
          >Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} </Checkbox>
      </Box>}
      <Box>
        <Checkbox disabled={confirmPaid || isCheckingIn} checked={confirmPaid} onChange={()=>setConfirmPaid((confirm)=>!confirm)} id="confirm">I confirm that {guests.full_name} has paid the total amount of {!addBreakfast ? formatCurrency(total_price) :  `${formatCurrency(total_price + optionalBreakfastPrice)} (${formatCurrency(total_price)}  + ${formatCurrency(optionalBreakfastPrice)})`} </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
