import InitUser from '@/components/InitUser'
import { Nav } from '@/components/Nav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  

  return (
    <RecoilRoot>
      <Nav />
      <InitUser username='' />

      <Component {...pageProps} />

    </RecoilRoot>
  )
}
