import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({filter,sortBy,page}){
  //select all (*) from the bookuings table
  //const {data,error} = await supabase.from("bookings").select("*, cabins(name), guests(full_name, email)")//Select everything from the bookings table
  let query =  supabase.from("bookings")
  .select("booking_id,created_at,start_date,end_date,num_nights,num_guests,status,total_price, cabins(name), guests(full_name, email)",{count:"exact"})//Select everything from the bookings table
  //select the important stuff for bookings
  
  //FILTER
  if(filter) query =  query[filter.method || "eq"](filter.field, filter.value)
    //Bookings table will have a cabins and guest as a foreign key. In this cases we could query the data that we want from supabase
  //the first argument it is for the bookings table, then we specifie the other
  //names of the table that are connected to the bookings table
  
  //SORT
  if(sortBy.field && sortBy.direction) query =  query.order(sortBy.field, {ascending:sortBy.direction === "asc"})
  //PAGINATION
  if(page) {
    const from = (page -1) * (PAGE_SIZE)
    const to = (PAGE_SIZE * page) - 1
    query= query.range(from, to)
  }
  const {data,error,count} =  await query
  if(error) throw new Error("There is no bookings found"); 
  return {data, count}
}
export async function getBooking(id) {

  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("booking_id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("booking_id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("booking_id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
