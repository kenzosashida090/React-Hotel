import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowDownOnSquare } from "react-icons/hi2";
import CheckoutButton from "../check-in-out/CheckoutButton";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const navigate = useNavigate()
  const {booking, isLoading} = useBooking()
  const {isDeletingBooking, deleteBooking} = useDeleteBooking()
  const moveBack = useMoveBack();
  if(isLoading) return <Spinner/>
  if(!booking) return <Empty resourceName="booking"  />
  const {status,booking_id} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking_id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      
      <ButtonGroup oup>
      { status === "unconfirmed" && <Button onClick={()=>navigate(`/checkin/${booking_id}`)} icon={<HiOutlineArrowDownOnSquare/>}>Check in</Button>}
      {status==="checked-in" && <CheckoutButton bookingId={booking_id}/>}
      <Modal>
        <Modal.Open opens="delete">
        <Button disabled={isDeletingBooking} variation="danger" onClick={deleteBooking} >Delete</Button>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="bookings" disabled={isDeletingBooking} onConfirm={()=>deleteBooking(booking_id,{onSettled:()=>navigate(-1)})}/>
        </Modal.Window>
      </Modal>
        <Button  variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
