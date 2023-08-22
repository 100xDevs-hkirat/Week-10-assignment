// import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <Component {...pageProps} />
    </RecoilRoot>
}
