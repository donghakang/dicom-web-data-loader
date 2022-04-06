import styled from '@emotion/styled'

export const LightMode = styled.div`
  background-color: ${({ theme }) => theme.light.background} !important;

  color: ${({ theme }) => theme.light.color};
`

export const DarkMode = styled.div`
  background-color: ${({ theme }) => theme.dark.background};
  color: ${({ theme }) => theme.dark.color};
`
