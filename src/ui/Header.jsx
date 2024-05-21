import styled from "styled-components"
import Logut from "../features/authentication/Logut"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
    display:flex;
    background-color:var(--color-grey-0);;
    padding:1.2rem 4.8rem;
    border-bottom:1px solid var(--color-grey-100);
    gap:2.4rem;
    align-items:center;
    justify-content:flex-end;
`;
function Header() {
    return (
        <StyledHeader>
            <UserAvatar/>
            <HeaderMenu/>
        </StyledHeader>
    )
}

export default Header
