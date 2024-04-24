import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import styled from "styled-components"

const Main = styled.main`
    background-color:var(--color-grey-50);;
    padding:4rem 4.8rem 6.4rem;
`
const StyledAppLayout = styled.div`
    display:grid;
    height:100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
`
const Container = styled.div`
  max-width:120rem;
  margin:0 auto;
  display:flex;
  flex-direction:column;
  gap:3.2rem;
` // Set the position of the container to avoid the adjujstment of the size
function AppLayout() {
    return (
        <StyledAppLayout>
          <Header/>
          <Sidebar/>
          <Main>
          <Container>
            <Outlet/> {/* Outlet render all the children routes*/}
          </Container>
          </Main>
        </StyledAppLayout>
    )
}

export default AppLayout
