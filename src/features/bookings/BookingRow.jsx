/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";

import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowDownOnSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    booking_id: id,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    total_price,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate()
  const {isDeletingBooking, deleteBooking} = useDeleteBooking()
  const {checkout, isCheckingout} = useCheckout()

  return (
    <Table.Row >
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id}/>
          <Menus.List id={id}>
            <Menus.Button  onClick={()=>navigate(`/bookings/${id}`)} icon={<FaRegEye/>} >See details</Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button disabled={isDeletingBooking} onClick={deleteBooking} icon={<MdDeleteOutline/>} >Delete</Menus.Button>
            </Modal.Open>
            { status === "unconfirmed" && <Menus.Button onClick={()=>navigate(`/checkin/${id}`)} icon={<HiOutlineArrowDownOnSquare/>}>Check in</Menus.Button>}
              {status === "checked-in" && <Menus.Button disabled={isCheckingout} onClick={()=>checkout({bookingId:id})} icon={<HiOutlineArrowDownOnSquare/>}>Check out</Menus.Button> }
          </Menus.List>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="bookings" disabled={isDeletingBooking} onConfirm={()=> deleteBooking(id, {onSettled:()=>navigate(-1)})} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
