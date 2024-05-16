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
  const [confirmPaid, setConfirmPaid] = useState(false)

  useEffect(()=> setConfirmPaid(booking?.is_paid ?? false),[booking])
  if(isLoading) return <Spinner/>
  const {
    booking_id,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;
  function handleCheckin() {
    if(!confirmPaid)  return
    checkin(booking_id)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking_id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox disabled={confirmPaid || isCheckingIn} checked={confirmPaid} onChange={()=>setConfirmPaid((confirm)=>!confirm)} id="confirm">I confirm that {guests.full_name} has paid the total amount of {formatCurrency(total_price)} </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{booking_id}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
