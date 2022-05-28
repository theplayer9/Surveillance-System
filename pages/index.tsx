import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from './Navbar'
import { Box } from '@mui/material'
import indexstyles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Surveillance System</title>
        <link rel="icon" href="/favicon.ico" />
        {/* meta tags  */}
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 py-200 text-center">
        <div className={indexstyles.background_image}>
          <Image
            src="/BackgroundIMG.png"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className={indexstyles.somethingElse}>
          <Navbar />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="text-6xl font-bold" >Find the MISSING person</h1>
            <p className="mt-3 text-2xl" >
              Find the MISSING person
              {/* <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                pages/index.tsx
              </code> */}
            </p>
          </Box>
        </div>
      </main>
      {/* ------------footer-------------- */}
      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  )
}

export default Home
