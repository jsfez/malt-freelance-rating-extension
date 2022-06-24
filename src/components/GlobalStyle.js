import { createGlobalStyle } from '@xstyled/styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:#f4f4f5;
  }

  [data-backdrop] {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
