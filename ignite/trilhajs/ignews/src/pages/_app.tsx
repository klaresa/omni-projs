import { AppProps } from "next/app";
import { Provider as NextAuth } from 'next-auth/client';
import { Header } from "../components/Header";
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <NextAuth session={pageProps.session}>
        <Header/>
        <Component {...pageProps} />
      </NextAuth>
  )
}

export default MyApp
