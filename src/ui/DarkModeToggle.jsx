import { useDarkMode } from "../features/context/DarkModeContext";
import ButtonIcon from "./ButtonIcon"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode()
    return (
    <ButtonIcon onClick={toggleDarkMode}>{ !isDarkMode ? <IoMoonOutline/> : <IoSunnyOutline/>}</ButtonIcon>)
}

export default DarkModeToggle
