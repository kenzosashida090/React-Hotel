/* eslint-disable react/prop-types */
import Stat from "./Stat"
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { IoBarChartOutline } from "react-icons/io5";
import { formatCurrency } from "../../utils/helpers";
function Stats({bookings, confirmedStays,numDays, cabinCount}) {
    //1.
    const numBookings = bookings.length;
    
    //2.
    const sales = bookings.reduce((acc,cur)=> acc + cur.total_price, 0)
    
    //3.
    const  checkins = confirmedStays.length;

    //4.
    const occupation = Math.floor( (confirmedStays.reduce((acc,cur)=> acc +cur.num_nights, 0) / (numDays * cabinCount ))*100)
    return (
        <>
            <Stat title="Bookings" color="blue" icon={<IoBriefcaseOutline/> } value={numBookings} />
            <Stat title="Sales" color="green" icon={<IoCashOutline/>}  value={formatCurrency(sales)} />
            <Stat title="Check ins" color="indigo" icon={<CiCalendar/>} value={checkins} />
            <Stat title="Occupancy rate" color="yellow" icon={<IoBarChartOutline/>  } value={occupation + "%"} />
        </>
    )
}

export default Stats
