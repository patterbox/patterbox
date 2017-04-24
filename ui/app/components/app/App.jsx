import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <header>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">PatterBox</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/">Home</NavItem>
              <NavItem eventKey={2} href="#">Chatrooms</NavItem>
              <NavItem eventKey={2} href="#">Profile</NavItem>
              <NavItem eventKey={2} href="#">History</NavItem>
            </Nav>
          </Navbar>
        </header>
        <section className="container-fluid">
          { this.props.children ? 
            React.cloneElement(this.props.children, {}) 
          : 
            <div>
              Welcome Page
            </div>
          }
        </section>
      </div>
    );
  }

};

export default App;
