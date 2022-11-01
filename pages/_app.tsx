import "../styles/scss/volt.scss";
import "../styles/pagination.css";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import type { AppProps } from 'next/app';
import Router from "next/router";
import NProgress from 'nprogress'



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  
  return <Component {...pageProps} />;
}
