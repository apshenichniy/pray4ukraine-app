import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/assets/Gilroy-Bold.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Gilroy-Semibold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Gilroy-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Avenir-Book.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Aftika-SemiBold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
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
