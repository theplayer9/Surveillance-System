import React, {useState,useEffect,useRef} from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import * as faceapi  from 'face-api.js'


const Surveillance = () => {

  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Report ReportComplaint</title>
        {/* meta tags  */}
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Navbar />
        <p>This is the surveillance page</p>
        <div>
            <span> {initializing ? " PROJECT is initializing" : "PROJECT is ready"}</span>
        </div>
      </main>
    </div>
  )
}

export default Surveillance
