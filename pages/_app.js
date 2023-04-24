import { Footer, Navigation } from '@/components/static-components'
import '@/styles/globals.css'
import { Montserrat } from "next/font/google"

const fontStyle = Montserrat({
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <div className={`${fontStyle.className} mt-[100px]`}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}


