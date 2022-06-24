import {
  defaultTheme,
  generateHexAlphaVariants,
} from '@xstyled/styled-components'

export const theme = {
  ...defaultTheme,
  // Customize your theme here

  colors: {
    ...defaultTheme.colors,
    ...generateHexAlphaVariants({
      primary: '#fc5757',
    }),
    secondary: defaultTheme.colors['blue-gray-700'],
    'secondary-background': defaultTheme.colors['blue-gray-100'],
    'background-hover': defaultTheme.colors['blue-gray-200'],
    border: 'hsl(204, 20%, 88%)',
    link: defaultTheme.colors['blue-500'],
    'link-hover': defaultTheme.colors['blue-400'],
  },
}
