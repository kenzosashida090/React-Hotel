import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"


function AddCabin() {
  return(
    <div>
    <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm/>
        </Modal.Window>
    </Modal>
    </div>
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
