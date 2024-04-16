
import styled from 'styled-components' // styled component library
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

// const H1 = styled.h1` // styled. html element
//   font-size:30px;
//   font-weight: 600;
// `;

const StyledApp = styled.main`
  
  padding:20px
` //StyledApp it is a conventional name to style the div of the component parent in this case App

function App() {

  return (
    <>
    
      <GlobalStyles/> 
      <StyledApp>
      <Row >
        <Row type="horizontal">
          <Heading as="h1">React Hotel</Heading>  {/* as prop will render the html element that we pass into in this case h1 */}
          <div>
            <Heading as="h2">H2 Component</Heading> 
            <Button >Check in</Button>
            <Button variation="secondary" size="large">Check Out</Button>
          </div>
        </Row>
        <Row >
          <Heading as="h3">Form</Heading>
          <form>
          <Input type='number' placeholder='Number of guests' />
          <Input  type='number' placeholder='Number of guests' />
          </form>
        </Row>
      </Row>
      </StyledApp>
    </>
  )
}

export default App
