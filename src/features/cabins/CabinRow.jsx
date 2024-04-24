/* eslint-disable react/prop-types */
import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {

  const {name, max_capacity, regular_price, discount, image, id:cabinId} = cabin
  const queryClient = useQueryClient(); // Get the instance of the queryClient 
  const {isLoading:isDeliting, mutate}=useMutation({
    mutationFn:deleteCabin, // (id)=> deleteCabin(id) the same thing
    onSuccess:()=>{ 
      toast.success("Cabin successfully  deleted");
      queryClient.invalidateQueries({
        queryKey:["cabin"]
      }) //InvalidateQueries will tell to react query that the cache is not valid anymore so it needs to fetch the data again
    }, //tell react query  what to do as soon as the mutation was successfull
    onError:(err)=> toast.error(err.message),
  }) // useMutation hook (reactQuery) allows to mutate data like delete,update an item, this will return a isLoading state and a mutate function taht we can use on the button
  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button disabled={isDeliting} onClick={()=>mutate(cabinId)}>Delete</button>
    </TableRow>
  )
}

export default CabinRow
