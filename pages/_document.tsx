import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

/**
 * @see {@link https://nextjs.org/docs/advanced-features/custom-document}
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href={'https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Roboto:wght@400&display=swap'}
            rel="stylesheet"
          />
          <link rel="icon" type="image/x-icon" href="/1f413-coin-color-adjusted.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;