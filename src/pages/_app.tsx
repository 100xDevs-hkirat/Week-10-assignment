import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from 'recoil'
import {InitUser} from '@/components/InitUser';
import Appbar from '@/components/Appbar';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <RecoilRoot>
    <Appbar />
    <InitUser />
  <Component {...pageProps} />
  </RecoilRoot >
    </>
  )
}
