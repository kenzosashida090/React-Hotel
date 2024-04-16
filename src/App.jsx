
import styled from 'styled-components' // styled component library

const H1 = styled.h1` // styled. html element
  font-size:30px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2 rem 1.6rem;
  font-weight: 500;
  border:none;
  border-radius: 7px;
  background-color: purple;
  color:white;
  margin:20px;
`
const Input = styled.input `
  border:1px solid #ddd;
  border-radius:8px;
  padding:0.8rem 1.2rem;

`

const StyledApp = styled.main`
  background-color:orange;
  padding:20px
` //StyledApp it is a conventional name to style the div of the component parent in this case App

function App() {

  return (
    <StyledApp>
      <H1>Gentlemen&apos;s Hotel Club</H1>
      <Button>Check in</Button>
      <Input type='number' placeholder='Number of guests' />
      <Input  type='number' placeholder='Number of guests' />
    </StyledApp>
  )
}

export default App
