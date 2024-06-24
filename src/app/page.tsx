'use client'
import Image from "next/image";
import FormComponent from "./components/FormComponent";
import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  return (
    <div className="backgroundImg relative">
      <div className='absolute top-10 right-10'>
        {success && (
          <div className="w-72 rounded-xl">
            <Alert className='rounded-xl bg-paleblue flex items-center' icon={<Image src={'/success.png'} width={30} height={30} alt='Successfully submitted!' />} severity="success">
              Successfully submitted!
            </Alert>
          </div>
        )}
        {success == false && (
          <div className="w-72 rounded-xl">
            <Alert className='rounded-xl bg-rose-200 flex items-center font-mainFont text-lg' icon={<Image src={'/fail.png'} width={30} height={30} alt='Failed to update' />} severity="error">
              Fields were empty!
            </Alert>
          </div>
        )}
      </div>
      <div className="absolute top-20 left-28">
        <FormComponent success={success} setSuccess={setSuccess} />
      </div>
    </div>
  );
}
