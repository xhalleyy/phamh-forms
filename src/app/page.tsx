'use client'
import Image from "next/image";
import FormComponent from "./components/FormComponent";
import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  return (
    <div className="backgroundImg relative">
      <div className='absolute top-3 md:top-8 lg:top-10 right-2 md:right-10'>
        {success && (
          <div className="w-72 rounded-xl">
            <Alert className='rounded-xl bg-paleblue flex items-center' icon={<Image src={'/success.png'} width={35} height={35} alt='Successfully submitted!' />} severity="success">
              Successfully submitted!
            </Alert>
          </div>
        )}
        {isSubmitted && !isFilled && success == false && (
          <div className="w-72 rounded-xl">
            <Alert className='rounded-xl bg-paleblue flex items-center' icon={<Image src={'/fail.png'} width={35} height={35} alt='Fields are empty' />} severity="error">
              Fields are empty!
            </Alert>
          </div>
        )}
      </div>
      <div className="absolute top-28 md:top-32 lg:top-10 md:left-28">
        <div className="relative">
          <h1 className="absolute font-darling text-5xl -top-6 left-[33%] text-[#752727] text-shadow">Sign Up</h1>
          <FormComponent success={success} setSuccess={setSuccess} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} isFilled={isFilled} setIsFilled={setIsFilled} />
        </div>
      </div>
    </div>
  );
}
