import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from '../styles/ReportComplaint.module.css'
// ------for PrimeReact---------
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import { FileUpload } from 'primereact/fileupload'

const ReportComplaint = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' })

  //  ------------Will hadle OnSubmit-------------

  const onSubmit =async(data) =>{
    console.log(data)
    // const JSONdata = JSON.stringify(data)
    // fetch("https://surveillance-system-4b551-default-rtdb.firebaseio.com/userDataRecords.json")
  }

  /** Input field component */

  const Input = ({ label, required, type, placeholder }) => (
    <div>
      <legend>{label}</legend>
      <input
        {...register(label, { required })}
        className={errors[label] && styles.inputInvalid}
        type={type}
        placeholder={placeholder}
      />
      {/* include validation with required or other standard HTML validation rules */}
      {errors[label] && <span>mandatory</span>}
    </div>
  )

  /** Group the person input fields in a component */
  const PersonFields = () => (
    <section className={styles.inputGroup}>
      <h3>Missing Person's Details</h3>
      <Input
        label="Full name :"
        required
        type="text"
        isValid
        placeholder="Ex: Sarthak Gupta"
      />
      <Input label="Birthday :" required type="date" placeholder="dd/mm/aaa" />
    </section>
  )

  /** Group the contact input fields in a component */
  const ContactFields = () => (
    <section className={styles.inputGroup}>
      <h3>Contact</h3>
      <Input
        label="Email :"
        required
        type="email"
        placeholder="exemple@exemple.com"
      />
      <Input
        label="Phone Number :"
        required
        type="tel"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      />
    </section>
  )

  /** Group the address input fields in a component */
  const AddressFields = () => (
    <section className={styles.inputGroup}>
      <h3>Address</h3>
      <Input
        label="Street"
        required
        type="text"
        placeholder="Street name, avenue, etc..."
      />
      <Input label="Number" required type="number" placeholder="000" />
    </section>
  )

  /** Navigation between steps */
  const rightArrow =
    'https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345'
  const leftArrow =
    'https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363'

  const Navigation = () => (
    <section className={styles.navigationControls}>
      {step === fieldGroups.length - 1 && (
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}
        >
          SUBMIT
        </button>
      )}
      {step < fieldGroups.length - 1 && (
        <button
          type="button"
          className={styles.nextButton}
          disabled={!isValid}
          onClick={() => {
            setStep(step + 1)
          }}
        >
          <img src={rightArrow} />
          NEXT
        </button>
      )}
      {step > 0 && (
        <button
          type="button"
          className={styles.backButton}
          onClick={() => {
            setStep(step - 1)
          }}
        >
          <img src={leftArrow} />
          BACK
        </button>
      )}
    </section>
  )
  /** Mark the input group already filled as blue or gray if not */
  const Reference = () => (
    <footer className={styles.reference}>{renderMarkers()}</footer>
  )
  function renderMarkers() {
    let markers = []
    for (let i = 0; i < fieldGroups.length; i++)
      markers.push(
        <span className={step >= i ? styles.markerBlue : styles.markerGray} />
      )
    return markers
  }

  // ------------For multi-steps--------------
  const [step, setStep] = useState(0)

  const fieldGroups = [<PersonFields />, <ContactFields />, <AddressFields />]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Multi part form | React/Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Navbar />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
          <h2>User Register</h2>
          {fieldGroups[step]}
          {step === 0 && (
            <div>
              <h4> Choose the image and press Upload:</h4>
               {/* &nbsp; */}
              <FileUpload name="demo" url="./upload" disabled={!isValid} />
            </div>
          )}
          <Navigation />
          <Reference />
        </form>
        <div> theplayer9</div>
      </main>
    </div>
  )
}

export default ReportComplaint
