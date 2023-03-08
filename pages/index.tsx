import type { NextPage } from 'next'
import Main from '../components/Containers/Main'
import Head from 'next/head'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href={process.env.PAGE_ICON_URL} />
      </Head>

      <Main>
      </Main>


    </>
  )
}

export default Home
