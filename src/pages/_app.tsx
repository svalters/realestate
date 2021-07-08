import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import Head from "next/head"
import type { AppProps } from "next/app"

import Nav from "@/components/nav"
import "@/styles/globals.css"

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Real Estate Stats of Latvia</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <div className='dark min-h-full flex'>
        <div className='bg-gray-900 prose dark:prose-dark flex flex-col min-w-full'>
          <Nav />
          <main className='flex flex-col flex-1'>
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </ApolloProvider>
  )
}
export default MyApp
