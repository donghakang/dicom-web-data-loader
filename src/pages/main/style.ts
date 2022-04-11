import styled from '@emotion/styled'

export const FileTextContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  h1 {
    margin-top: 60px;
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
        color: #2ecc71;
      }
    }

    a {
      text-decoration: none;
      color: green;

      &:hover {
        color: #2ecc71;
      }
    }
  }

  div {
    margin-top: 20px;
  }
`
