import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
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
  },
  styles: {
    global: {
      a: {
        color: '#964941',
      },
    },
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
