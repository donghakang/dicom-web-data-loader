import styled from '@emotion/styled'

export const ResultView = styled.div`
  min-height: 100vh;
  margin: 1rem;

  .result-container {
    margin: auto;
    max-width: 768px;
  }

  .result-button-container {
    display: flex;
    justify-content: space-around;

    .cancel:hover {
      color: white;
      background-color: #e74c3c;
    }
  }
`
