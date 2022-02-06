import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { NextIntlProvider } from 'next-intl';
import theme from '../util/theme';

if (process.env.NODE_ENV === 'development' && process.browser) {
  console.log('%cChakra UI theme', 'background: aquamarine; color: black', theme);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </ChakraProvider>
  );
}

export default MyApp;
