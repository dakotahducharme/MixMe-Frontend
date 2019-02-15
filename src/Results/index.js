import React from 'react';
import styled from 'styled-components'
import Song from '../Song'

const StyledResults = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const showSongs = (songs) => (
  songs.map(song => <Song key={song.id} {...song} />)
);

const Results = ({ songs }) => {
  return(
    <StyledResults>
      {showSongs(songs)}
    </StyledResults>
  );
};

export default Results;
