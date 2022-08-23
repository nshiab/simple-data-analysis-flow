import type { AppProps } from "next/app"
import "../style/global.css"

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
