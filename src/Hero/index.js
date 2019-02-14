import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.div`
  background: url('https://media.giphy.com/media/pkvXV7J3JBozu/giphy.gif');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px;
  h1 {
    font-size: 72px;
    font-weight: bold;
  }
  p {
    font-size: 20px;
    color: #faa542;
    font-weight: 500;
  }

`
const Hero = () => (
  <StyledHero>
    <h1>MixMe.</h1>
    <p>Find new music based off of the songs you already love.<br/>
    Just tell us your favorite artists, and we'll handle the rest.</p>
  </StyledHero>
)

export default Hero;
