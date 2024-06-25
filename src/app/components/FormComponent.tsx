'use client'
import React, { useEffect, useState } from 'react'
import { CustomFlowbiteTheme, Datepicker, TextInput } from "flowbite-react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TextField, Tooltip } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { error } from 'console';

type FormProp = {
    success: boolean | undefined
    setSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const FormComponent = ({ success, setSuccess }: FormProp) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', birthday: null as Dayjs | null, address: '', phoneNumber: '', password: '', confirmPassword: '' })
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [passwordError, setPasswordError] = useState('');
    const [passVisibility, setPassVisibility] = useState(false)
    const [confirmVisibility, setConfirmVisibility] = useState(false)

    const [errors, setErrors] = useState({
        birthday: false
    });

    const isFilled = form.firstName !== "" && form.lastName !== "" && form.email !== "" && form.password !== "" && form.confirmPassword !== "" && form.birthday !== null;
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

    const handleDateChange = (date: Dayjs | null) => {
        setForm({
            ...form,
            birthday: date
        });
        setErrors({
            ...errors,
            birthday: date === null
        });
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

        if (!form.birthday) {
            setErrors({ ...errors, birthday: true });
        }

        if (isFilled && isEmailValid && isPhoneValid && matchedPasswords && !errors.birthday) {
            setSuccess(true);
        }


        setEmailError(isEmailValid ? '' : 'Invalid email format. Please make sure there is an @ with no spaces.');
        setPhoneError(isPhoneValid ? '' : 'Invalid phone number format, ex: (XXX)-###-####');

        setIsSubmitted(true);
    }

    useEffect(() => {
        if (success) {
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                birthday: null,
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

    // useEffect(()=>{console.log(form)},[form])

    const customText: CustomFlowbiteTheme['textInput'] = {
        "base": "flex",
        "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
        "field": {
            "base": "relative w-full",
            "icon": {
                "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "rightIcon": {
                "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "input": {
                "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                "sizes": {
                    "sm": "p-2 sm:text-xs",
                    "md": "p-2 text-sm",
                    "lg": "p-4 sm:text-base"
                },
                "colors": {
                    "white": "border-gray-400 bg-white focus:border-blue-500 focus:ring-blue-500",
                },
                "withRightIcon": {
                    "on": "pr-10",
                    "off": ""
                },
                "withIcon": {
                    "on": "pl-10",
                    "off": ""
                },
                "withAddon": {
                    "on": "rounded-r-lg",
                    "off": "rounded"
                },
                "withShadow": {
                    "on": "shadow-sm dark:shadow-sm-light",
                    "off": ""
                }
            }
        }
    }

    return (
        <div className='bg-white/90 border-4 border-[#fe81bb] h-[670px] md:h-[630px] md:w-[550px] rounded-3xl shadow-md'>

            <form onSubmit={handleForm} action="" className='pt-10'>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        First Name *
                    </label>
                    <TextInput theme={customText} color="white" value={form.firstName} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10 bg-white active:bg-[#feffc7] focus-within:bg-[#feffc7]" placeholder="Enter First Name" name="firstName" required maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Last Name *
                    </label>
                    <TextInput theme={customText} color="white" value={form.lastName} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="Enter Last Name" name="lastName" required maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && emailError && <div className="text-red-500 col-span-3 text-center px-3 flex justify-center text-sm font-bold">{emailError}</div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Email *
                    </label>
                    <TextInput theme={customText} color="white" value={form.email} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="ex: hello123@gmail.com" name="email" required />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && errors.birthday && <div className="text-red-500 col-span-3 text-center px-3 flex justify-center text-sm font-bold">Please enter your birthday</div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Birthday *
                    </label>
                    <div className='col-span-2 mx-3 md:me-10 flex items-center'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="mm/dd/yyyy"
                                value={form.birthday}
                                disableFuture
                                onChange={handleDateChange}
                                // renderInput={(params: any) => <TextField {...params} />}
                                slotProps={{
                                    textField: {
                                        required: true,
                                        error: errors.birthday,
                                        title: "Please enter a birthday"
                                    }
                                }}
                            />
                        </LocalizationProvider>

                    </div>
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Home Address
                    </label>
                    <TextInput theme={customText} color="white" value={form.address} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="Enter Address" name="address" maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && phoneError && <div className="text-red-500 col-span-3 text-center px-3 flex justify-center text-sm font-bold">{phoneError}</div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Phone Number
                    </label>
                    <TextInput theme={customText} color="white" value={form.phoneNumber} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="ex: (XXX)-###-####" name="phoneNumber" />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Password *
                    </label>
                    <TextInput theme={customText} color="white" value={form.password} onChange={updateForm} type="password" className="col-span-2 mx-3 md:me-10" placeholder="Enter Password" name="password" required
                        minLength={15}
                        pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[?@#$%^&*])[A-Za-z0-9?@#$%^&*]{15,}$"
                        title="Password must be at least 15 characters and have at least one capital letter, one number, and one special character (? @ # $ % ^ & *)."
                    />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && passwordError && <div className="text-red-500 col-span-3 text-center px-3 flex justify-center text-sm font-bold">{passwordError}</div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center flex justify-center font-darling text-lg text-[#752727]' htmlFor="block rounded p-3">
                        Confirm Password *
                    </label>
                    <TextInput theme={customText} color="white" value={form.confirmPassword} onChange={updateForm} type="password" className="col-span-2 mx-3 md:me-10 " placeholder="Confirm Password" name="confirmPassword" required minLength={15} />
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
