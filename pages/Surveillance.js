import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'

const Surveillance = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Report ReportComplaint</title>
        {/* meta tags  */}
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Navbar />
        <p>This is the surveillance page</p>
      </main>
    </div>
  )
}

export default Surveillance
