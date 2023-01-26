import styled from 'styled-components'
import { Link } from 'react-router-dom';

const UserNameLink = styled(Link)`
  cursor: pointer;
  display: inline-block;
  &:hover {
    cursor: pointer;
    /* background-color: rgba(0.5, 0, 0, 0) */
  }
`

export { UserNameLink }
