import { extendTheme } from '@chakra-ui/react';

// Docs
// Default Theme: https://chakra-ui.com/docs/theming/theme
// Customize Theme: https://chakra-ui.com/docs/theming/customize-theme

export default extendTheme({
  colors: {
    primary: {
      50: '#edd9d6',
      100: '#d9b4ae',
      200: '#c48f88',
      300: '#ae6c63',
      400: '#964941',
      500: '#7d2421',
      600: '#6d1415',
      700: '#5d0107',
      800: '#4e0000',
      900: '#400000',
      // for convenience: https://colordesigner.io/gradient-generator
    },
    secondary: {
      50: '#ffead8',
      100: '#ffd5b2',
      200: '#ffc08d',
      300: '#ffab67',
      400: '#ff9640',
      500: '#fd8108',
      600: '#d25e00',
      700: '#a83c00',
      800: '#801600',
      900: '#5d0000',
    },
    gray: {
      50: '#f6f6f6',
      100: '#e3e3e3',
      200: '#c8c8c8',
      300: '#adadad',
      400: '#939393',
      500: '#7a7a7a',
      600: '#616161',
      700: '#4a4a4a',
      800: '#343434',
      900: '##1f1f1f',
    },
  },
  styles: {
    global: {
      a: {
        color: '#964941',
      },
    },
  },
  fonts: {
    heading: 'Hammersmith One',
    body: 'Roboto',
  },
});
