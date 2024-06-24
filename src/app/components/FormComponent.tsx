'use client'
import React, { useEffect, useState } from 'react'
import { Datepicker, TextInput } from "flowbite-react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Tooltip } from '@mui/material';

type FormProp = {
    success: boolean | undefined
    setSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const FormComponent = ({ success, setSuccess }: FormProp) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', birthday: '', address: '', phoneNumber: '', password: '', confirmPassword: '' })
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [passwordError, setPasswordError] = useState('');
    const [passVisibility, setPassVisibility] = useState(false)
    const [confirmVisibility, setConfirmVisibility] = useState(false)

    const isFilled = form.firstName !== "" && form.lastName !== "" && form.email !== "" && form.password !== "" && form.confirmPassword !== "";
    // const isFilled = Object.values(form).every(value => value !== "");

    const validEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const validPhoneNumber = (number: string) => {
        const phonePattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
        return phonePattern.test(number);
    }

    const validatePassword = () => {
        if (form.password !== form.confirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleDateChange = (date: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = date.target.value; // Extract the date value from the event
        setForm({ ...form, birthday: selectedDate });
    };

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            // Passing through the current values and updating
            // spread operator is setting form to it's own prop, but
            // deconstructing our properties and then overriding 
            ...form,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
            setPasswordError('');
        }
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isEmailValid = validEmail(form.email);
        let isPhoneValid = true;
        const matchedPasswords = validatePassword()

        if (form.phoneNumber !== '') {
            isPhoneValid = validPhoneNumber(form.phoneNumber)
        }
        if (isFilled && isEmailValid && isPhoneValid && matchedPasswords) {
            setSuccess(true);
        }


        setEmailError(isEmailValid ? '' : 'Invalid email format. Please make sure there is an @ with no spaces.');
        setPhoneError(isPhoneValid ? '' : 'Invalid phone number format, ex: (XXX)-XXX-XXXX');

        setIsSubmitted(true);
    }

    useEffect(() => {
        if (success) {
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                birthday: '',
                address: '',
                phoneNumber: '',
                password: '',
                confirmPassword: ''
            });

            const timer = setTimeout(() => {
                setSuccess(undefined);
            }, 8000);

            return () => clearTimeout(timer);

        }
    }, [success]);

    return (
        <div className='bg-white/90 border-4 border-[#fe81bb] h-[630px] w-[550px] rounded-3xl shadow-md'>

            <form onSubmit={handleForm} action="" className='pt-10'>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        First Name*
                    </label>
                    <TextInput value={form.firstName} onChange={updateForm} type="text" className="col-span-2 me-10 bg-white active:bg-[#feffc7] focus-within:bg-[#feffc7]" placeholder="Enter First Name" name="firstName" required maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Last Name*
                    </label>
                    <TextInput value={form.lastName} onChange={updateForm} type="text" className="col-span-2 me-10" placeholder="Enter Last Name" name="lastName" required maxLength={100} />
                    {/* <input value={form.lastName} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Last Name" name="lastName" required maxLength={100} /> */}
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && emailError && <div className="text-red-500 col-span-3 flex justify-center text-sm font-bold">{emailError}</div>}
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Email*
                    </label>
                    <TextInput value={form.email} onChange={updateForm} type="text" className="col-span-2 me-10" placeholder="ex: hello123@gmail.com" name="email" required />
                    {/* <input value={form.email} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="ex: hello123@gmail.com" name="email" required /> */}
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Birthday*
                    </label>
                    <Datepicker
                        // value={form.birthday}
                        onChange={handleDateChange}
                        className=""
                        maxDate={new Date()}
                        name="birthday"
                        id="birthday"
                        required
                    />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Home Address
                    </label>
                    <TextInput value={form.address} onChange={updateForm} type="text" className="col-span-2 me-10" placeholder="Enter Address" name="address" maxLength={100} />
                    {/* <input value={form.address} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="Enter Address" name="address" maxLength={100} /> */}
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && phoneError && <div className="text-red-500 col-span-3 flex justify-center text-sm font-bold">{phoneError}</div>}
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Phone Number
                    </label>
                    <TextInput value={form.phoneNumber} onChange={updateForm} type="text" className="col-span-2 me-10" placeholder="ex: (XXX)-XXX-XXXX" name="phoneNumber" />
                    {/* <input value={form.phoneNumber} onChange={updateForm} type="text" className="col-span-2 border rounded p-2 me-10" placeholder="ex: (XXX)-XXX-XXXX" name="phoneNumber" /> */}
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Password*
                    </label>
                    <TextInput value={form.password} onChange={updateForm} type="password" className="col-span-2 me-10" placeholder="Enter Password" name="password" required
                        minLength={15}
                        pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[?@#$%^&*])[A-Za-z0-9?@#$%^&*]{15,}$"
                        title="Password must be at least 15 characters and have at least one capital letter, one number, and one special character (? @ # $ % ^ & *)."
                        />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && passwordError && <div className="text-red-500 col-span-3 text-sm font-bold flex justify-center">{passwordError}</div>}
                    <label className='ps-4 col-span-1 text-center flex justify-center font-darling text-lg text-[#752727]' htmlFor="block rounded p-3">
                        Confirm Password*
                    </label>
                    <TextInput value={form.confirmPassword} onChange={updateForm} type="password" className="col-span-2 me-10 " placeholder="Confirm Password" name="confirmPassword" required minLength={15} />
                    {/* <input value={form.confirmPassword} onChange={updateForm} type="password" className="col-span-2 border rounded p-2 me-10" placeholder="Confirm Password" name="confirmPassword" required minLength={15}
                    /> */}
                </div>

                <div className='absolute bottom-6 right-7'>
                    <button className={`text-white py-2 px-4 rounded-xl font-darling ${isFilled ? 'bg-[#56b681] hover:bg-green-700' : ' bg-slate-300 cursor-default'}`}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent
