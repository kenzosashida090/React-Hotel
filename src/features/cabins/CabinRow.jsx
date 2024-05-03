/* eslint-disable react/prop-types */
import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"
import Table from "../../ui/Table";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const {name, max_capacity, regular_price, discount, image, id:cabinId, description} = cabin;
  const {isDeleting,deleteCabin} = useDeleteCabin();
  const {isCreating, createCabin} = useCreateCabin();
  function handleDuplciate () {
      createCabin({
        name: `Copy of ${name}`,
        max_capacity,
        regular_price,
        discount,
        image,
        description
      })
  }
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ?<Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <button disabled={isDeleting} onClick={handleDuplciate}>
          <FaRegCopy/>
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button >
              <CiEdit/>
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin}/>  
          </Modal.Window>
          <Modal.Open opens="delete">
            <button disabled={isDeleting} >
              <MdDeleteOutline/>
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="cabins" disabled={isDeleting}
              onConfirm={()=>deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
