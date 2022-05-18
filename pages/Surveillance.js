import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import * as faceapi from 'face-api.js'


const Surveillance = () => {
  const [initializing, setInitializing] = useState(false)
  const videoRef = useRef()
  const canvasRef = useRef()
  const videoHeight = 480
  const videoWidth = 640

  // ---------loading the MODELS----------
  useEffect(() => {
    const loadModels = async () => {
      // const MODEL_URL = process.env.PUBLIC_URL + '/models';
      setInitializing(true)
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ],console.log(faceapi.nets),
      ).then(startVideo)
    }
    loadModels()
  }, [])

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia(
      {
        video: {},
      }
    ).then((stream) => {
      videoRef.current.srcObject = stream;
      // videoRef.current.play()
    })
  }

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
          <span>
            {' '}
            {!initializing ? ' PROJECT is initializing' : 'PROJECT is ready'}
          </span>
          <video
            ref={videoRef}
            autoPlay
            muted
            height={videoHeight}
            width={videoWidth}
          />
          <canvas ref={canvasRef} />
        </div>
      </main>
    </div>
  )
}

export default Surveillance
