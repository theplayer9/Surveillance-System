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
  let ref = null

  // ---------loading the MODELS----------
  useEffect(() => {
    const loadModels = async () => {
      setInitializing(true)
      Promise.all(
        [
          await faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          await faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          await faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          await faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ],
        console.log(faceapi.nets)
      ).then(startVideo)
    }
    loadModels()
    // returned function will be called on component unmount
    return () => {
      ref.pause()
      ref.srcObject.getTracks()[0].stop()
      console.log(ref)
    }
  }, [])

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {},
      })
      .then((stream) => {
        videoRef.current.srcObject = stream
        ref = videoRef.current
        // videoRef.current.play()
      })
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false)
      }
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvas(videoRef.current)

        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        }

        faceapi.matchDimensions(canvasRef.current, displaySize)

        const labels = ['sheldon', 'raj', 'leonard', 'howard']

        // const labeledFaceDescriptors = await Promise.all(
        //   labels.map(async (label) => {
        //     // fetch image data from urls and convert blob to HTMLImage element
        //     const imgUrl = `${label}.png`
        //     const img = await faceapi.fetchImage(imgUrl)

        //     // detect the face with the highest score in the image and compute it's landmarks and face descriptor
        //     const fullFaceDescription = await faceapi
        //       .detectSingleFace(img)
        //       .withFaceLandmarks()
        //       .withFaceDescriptor()

        //     if (!fullFaceDescription) {
        //       throw new Error(`no faces detected for ${label}`)
        //     }

        //     const faceDescriptors = [fullFaceDescription.descriptor]
        //     return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
        //   })
        // )
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions()

        // if (!detections.length) {
        //   return
        // }
        // const faceMatcher = new faceapi.FaceMatcher(detections)

        // if (detections) {
        //   const bestMatch = faceMatcher.findBestMatch(detections.descriptor)
        //   console.log(bestMatch.toString())
        // }

        const resizeDetections = faceapi.resizeResults(detections, displaySize)
        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext('2d')
            .clearRect(0, 0, videoWidth, videoHeight)
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizeDetections)
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections)
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections)
        // canvasRef &&
        //   canvasRef.current &&
        //   faceapi.draw.drawContour(canvasRef.current, resizeDetections)
        console.log(detections)
      }
    }, 100)
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
        <span>
          {' '}
          {initializing ? ' PROJECT is initializing' : 'PROJECT is ready'}
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            height={videoHeight}
            width={videoWidth}
            onPlay={handleVideoOnPlay}
          />
          <canvas ref={canvasRef} style={{ position: 'absolute' }} />
        </div>
      </main>
    </div>
  )
}

export default Surveillance
