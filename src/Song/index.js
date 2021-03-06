import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSong = styled.div`
  width: 200px;
  padding: 8px;
  img {
    width: 100%;
  }
`

const Song = (props) => (
  <StyledSong>
  <img src={props.artwork}/>
    <small>{props.artists}</small>
    <p>{props.name}</p>
  </StyledSong>
)

export default Song;
