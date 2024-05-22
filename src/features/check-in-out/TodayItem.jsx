/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag"
import {Flag} from "../../ui/Flag"
import Button from "../../ui/Button"
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton"
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({activity}) {
  const {booking_id,status, guests, num_nights} = activity

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.country_flag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.full_name}</Guest>
      <div>{num_nights} nights</div>

      {status === "unconfirmed" && (
        <Button size="small" variations="priamary" as={Link} to={`/checkin/${booking_id}`}>Check In</Button>
      )}
      {status ==="checked-in" && <CheckoutButton bookingId={booking_id}/>}
    </StyledTodayItem>
  )
}

export default TodayItem
