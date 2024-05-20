import ButtonIcon from "../../ui/ButtonIcon"
import { CiLogout } from "react-icons/ci";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logut() {
    const {logout, isLoading} = useLogout()
    return (
       <ButtonIcon disabled={isLoading} onClick={logout}>
          {!isLoading ? <CiLogout/> : <SpinnerMini/>}
       </ButtonIcon>
    )
}

export default Logut
