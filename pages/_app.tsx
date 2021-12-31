import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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
      200: '#CCCCCC',
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
