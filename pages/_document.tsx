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
      <Html /* Next.js adds the appropriate lang attribute */>
        <Head>
          <link
            href={'https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Roboto:wght@400&display=swap'}
            rel="stylesheet"
          />
          <link rel="icon" type="image/x-icon" href="/1f413-coin-color-adjusted.ico" />

          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="69244851-f1e4-4941-95b0-f56ce0b194ef"
              src="https://umami-pvn48eb4t-guillermodlpa.vercel.app/umami.js"
            ></script>
          )}
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
