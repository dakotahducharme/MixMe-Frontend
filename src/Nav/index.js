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

  renderMixes = () => {
    const { mixes } = this.props;
    return mixes.map((mix, i) => {
      return(
        <NavItem onClick={() => this.props.openMix(mix)} key={i}>
          <p>{mix.artists.map(artist => artist.name).join(', ')}</p>
        </NavItem>
      )
    })
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
          <NavbarBrand href="/" className="mr-auto">MixMe.</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/dakotahducharme">GitHub</NavLink>
              </NavItem>
              <div id="mixes">
              {this.renderMixes()}
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default Example;
