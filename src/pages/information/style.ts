import styled from '@emotion/styled'

const StyledInformationView = styled.div`
  min-height: 100vh;
  margin: 1rem;

  .information-container {
    max-width: 768px;
    margin: auto;

    ul {
      padding: 0;
      list-style-type: none;
      margin: auto;

      li {
        border-bottom: 1px solid #ccc;
        padding: 0.5rem;

        .info {
        }
        .info-eg {
          margin-left: 20px;
          color: #bababa;
        }
      }

      li:nth-of-type(1) {
        border-top: 1px solid #ccc;
      }
    }

    div {
      margin: 20px auto;
      max-width: 768px;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        margin: auto;
      }
    }
  }
`

export default StyledInformationView
