import styled from '@emotion/styled'

export const FileTextContainer = styled.div`
  h1 {
    font-size: 4.25rem;
    font-weight: 900;
  }

  span {
    button {
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      font-size: 1rem;
      text-decoration: none;
      color: green;
      cursor: pointer;

      &:hover {
        color: blue;
      }
    }

    a {
      text-decoration: none;
      color: green;

      &:hover {
        color: blue;
      }
    }
  }

  div {
    margin-top: 20px;
  }
`
