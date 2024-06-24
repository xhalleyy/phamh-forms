'use client'
import React, { useEffect, useState } from 'react'


type FormProp = {
    success: boolean | undefined
    setSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const FormComponent = ({success, setSuccess} : FormProp) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address: '', phoneNumber: '', password: '', confirmPassword: '' })
    // boolean for the condition for the submit button
    const isFilled = form.firstName !== "" && form.lastName !== "" && form.email !== "" && form.address !== "" && form.phoneNumber !== "" && form.password !== "" && form.confirmPassword !== "";
    const [isSubmitted, setIsSubmitted] = useState(false);

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            // Passing through the current values and updating
            // spread operator is setting form to it's own prop, but
            // deconstructing our properties and then overriding 
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleForm = () => {
        isFilled ? setIsSubmitted(true) : setIsSubmitted(false);
        isFilled ? setSuccess(true) : setSuccess(false);
    }

    // useEffect(() => {
    //     console.log(form)
    // }, [form])

    useEffect(() => {
        if (success && isSubmitted) {
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phoneNumber: '',
                password: '',
                confirmPassword: ''
            });
            setSuccess(undefined);
            setIsSubmitted(false);
        }
    }, [success, isSubmitted]);

    return (
        <div className='bg-white h-[600px] w-[550px] rounded-3xl'>
            
            <form action="" className='py-10'>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        First Name
                    </label>
                    <input value={form.firstName} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter First Name" name="firstName" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Last Name
                    </label>
                    <input value={form.lastName} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Last Name" name="lastName" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Email
                    </label>
                    <input value={form.email} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Email" name="email" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Home Address
                    </label>
                    <input value={form.address} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Address" name="address" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Phone Number
                    </label>
                    <input value={form.phoneNumber} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Phone Number" name="phoneNumber" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Password
                    </label>
                    <input value={form.password} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Password" name="password" />
                </div>
                <div className='grid grid-cols-3 items-center mb-5'>
                    <label className='col-span-1 flex justify-center' htmlFor="block rounded p-3">
                        Confirm Password
                    </label>
                    <input value={form.confirmPassword} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Confirm Password" name="confirmPassword" />
                </div>

                <div className='flex justify-end pe-10'>
                    <button onClick={handleForm} className={`text-white py-2 px-4 rounded ${isFilled ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`} type="button">
                        {isFilled ? 'Submit' : 'Clear'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent
