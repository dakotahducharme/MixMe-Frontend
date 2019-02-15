import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSong = styled.div`
  width: 200px;
  img {
    width: 100%;
  }
`

const Song = (props) => (
  <StyledSong>
    <p>{props.artists.map(artist => artist.name).join(', ')}</p>
    <p>{props.name}</p>
    <img src={props.album.images[0].url}/>
  </StyledSong>
)

export default Song;
