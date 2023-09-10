// import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import Appbar from '@/components/Appbar';
import { InitUser } from '@/components/InitUser';
// import { useEffect } from 'react';
// import { connectDB } from '@/db/connect';

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   connectDB()
  //     .then(() => {
  //       console.log('Database connection established');
  //     })
  //     .catch(error => {
  //       console.error('Error establishing database connection:', error);
  //     });
  // }, []);
  return <RecoilRoot>
    <Appbar />
    <InitUser />
    <Component {...pageProps} />
  </RecoilRoot>
}
