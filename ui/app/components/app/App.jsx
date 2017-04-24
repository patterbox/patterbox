import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formValues: {
        usernameV: '',
        passwordV: ''
      }
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }
  
  updateFormValue(formValue, event) {
    const formState = { formValues: {} };
    formState.formValues[formValue] = event.target.value;
    
    this.setState(formState);
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
              <NavItem eventKey={3} href="#">Profile</NavItem>
              <NavItem eventKey={4} href="#">History</NavItem>
            </Nav>
          </Navbar>
        </header>
        <section className="container-fluid">
          { this.props.children ? 
            React.cloneElement(this.props.children, {}) 
          : 
            <div>
              <h1>Welcome Page</h1>
              <form>
                <label htmlFor="username">
                  <input 
                    type="text" 
                    name="username" 
                    value={this.state.formValues.usernameV}
                    onChange={this.updateFormValue.bind(this, 'usernameV')}
                  />
                </label>

                <label htmlFor="password">
                  <input 
                    type="password" 
                    name="password" 
                    value={this.state.formValues.passwordV}
                    onChange={this.updateFormValue.bind(this, 'passwordV')}
                  />
                </label>
              </form>
            </div>
          }
        </section>
      </div>
    );
  }

};

export default App;
