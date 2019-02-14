import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  background-color: #343A40;
  > * {
    padding: 20px;
    margin: 0;
  }
  a {
    color: white;
    text-decoration: none;
  }
`

const Footer = () => (
  <StyledFooter>
    <p>made with love by <a href="https://github.com/dakotahducharme">Dakotah Ducharme</a></p>
  </StyledFooter>
)

export default Footer;
