import type { AppProps } from 'next/app'
import PersistentDrawerLeft from '../components/UI/Drawer'
import '../styles/order.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PersistentDrawerLeft>
      <Component {...pageProps} />
    </PersistentDrawerLeft>)

}

export default MyApp
