import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {isLoading, bookings} = useRecentBookings()
  const {stays, confirmedStays , isLoading1 } = useRecentStays()
  if(isLoading || isLoading1) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <div>STATISTICS</div>
      <div>TODAY&apos;S ACTIVITY</div>
      <div>CHART STAY DURATION</div>
      <div>CHART SALES</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
