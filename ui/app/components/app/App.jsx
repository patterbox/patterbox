import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
          {/*
          <Navbar>
            <Navbar.brand>
              <a href='/'>PatterBox</a>
            </Navbar.brand>
            <Nav>
              <NavItem eventKey={1} href="/chatroom">ChatRoom</NavItem>
            </Nav>
          </Navbar>
          */}
        </header>
        <section className="container-fluid">
          {this.props.children ? React.cloneElement(this.props.children, {}) 
          : 
          (
            <div>
              Welcome Page
            </div>
          )}
        </section>
      </div>
    );
  }

};

export default App;
