import type { NextPage } from 'next'
import Head from 'next/head'
import { Main } from 'containers/main/Main'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SW React App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
    </div>
  )
}

export default Home
