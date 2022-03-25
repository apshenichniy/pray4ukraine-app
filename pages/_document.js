/* eslint-disable @next/next/next-script-for-ga */
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
            href="/assets/Gilroy-Medium.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Gilroy-Black.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Gilroy-Extrabold.woff"
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
          <link
            rel="preload"
            href="/assets/Aftika-ExtraBold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <title>PRAY4UKRAINE</title>
          <meta name="description" content="NFT collection created in official partnership with www.comebackalive.in.ua to help war affected families in Ukraine." />
          <meta name="keywords" content="nft, Ukraine, support Ukraine" />
          <meta name="author" content="Pray4Ukraine" /> 

          <meta property="og:title" content="PRAY4UKRAINE" />
          <meta property="og:description" content="NFT collection created in official partnership with www.comebackalive.in.ua to help war affected families in Ukraine." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.pray4ukraine.world/" />
          <meta property="og:site_name" content="Pray4Ukraine" />
          <meta property="og:image" content="https://www.pray4ukraine.world/logo.jpg" />
          <meta property="og:locale" content="en_US" />

          <link rel="icon" type="image/x-icon" href="/logo.jpg"></link>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-CVEPZW061W"></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CVEPZW061W');`}}>
          </script>
          <script dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            // Insert Twitter Pixel ID and Standard Event data below
            twq('init','o87q0');
            twq('track','PageView');`}}>
          </script>
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
