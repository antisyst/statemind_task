import '@/styles/globals.scss'
import type { AppProps } from 'next/app';
import NProgress from "nprogress";
import Router from "next/router";
import HeadPart from '@/utils/_head';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return(
   <>
     <HeadPart/>
     <Component {...pageProps} />
   </>
  )
}
