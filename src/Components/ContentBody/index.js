import styled from 'styled-components'

export const ContentBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  :nth-child(even) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
  }
`
