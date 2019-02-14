import React from 'react';
import styled from 'styled-components';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';



class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand href="/" className="mr-auto">Mix Me.</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/dakotahducharme">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://localhost:5000/api/spotify/artist?query=retirement%20party">mom jeans</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default Example;
