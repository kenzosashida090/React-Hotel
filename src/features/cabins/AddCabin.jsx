import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"
import CabinTable from "./CabinTable"


function AddCabin() {
  return(
    <>
    
    <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm/>
        </Modal.Window>
    </Modal>
    <Modal>
        <Modal.Open opens="table">
            <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
            <CabinTable/>
        </Modal.Window>
    </Modal>
    </>
  )

}
// function AddCabin() {
//   const [showModal, setShowModal] = useState(false)
//   return (
//     <div>
//       <Button  onClick={()=> setShowModal((prev)=> !prev)}>
//         Add new Cabin
//       </Button>
//       {showModal && 
//         <Modal> 
//             <CreateCabinForm onClose={()=>setShowModal(false)}/>
//         </Modal>}
//     </div>
//     )
// }

export default AddCabin
