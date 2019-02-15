import React from 'react';
import styled from 'styled-components'



const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: grey;
  background: white;
  border: none;
  border-radius: 3px;
`

// Render a styled text input with the standard input color, and one with a custom input color
const ChooseSongs = ({onChange, onSubmit, value}) => {
  return(
    <div>
      <form>
      <h5>Choose up to 5 Artists</h5>
        <Input onChange={onChange} value={value} placeholder="Artist Name" type="text" />
        <button color="white" id="submit" onClick={onSubmit}>add</button >
      </form>
    </div>
  )
}

export default ChooseSongs;
