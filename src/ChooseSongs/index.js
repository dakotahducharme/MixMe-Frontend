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
const ChooseSongs = ({onChange, onSubmit, query}) => {
  return(
    <div>
      <form>
        <Input onChange={onChange} value={query} defaultValue="Artist Name" type="text" />
        <button color="white" id="submit" onClick={onSubmit}>add</button >
      </form>
    </div>
  )
}

export default ChooseSongs;
