'use client'
import React, { useEffect, useState } from 'react'
import { CustomFlowbiteTheme, Datepicker, TextInput } from "flowbite-react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { error } from 'console';

type FormProp = {
    success: boolean | undefined
    setSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>
    isSubmitted: boolean
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    isFilled: boolean
    setIsFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const FormComponent = ({ success, setSuccess, isSubmitted, setIsSubmitted, isFilled, setIsFilled }: FormProp) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', birthday: '', address: '', phoneNumber: '', password: '', confirmPassword: '' })
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    // const [isSubmitted, setIsSubmitted] = useState(false)
    const [passwordError, setPasswordError] = useState('');
    const [formatError, setFormatError] = useState('')
    const [passVisibility, setPassVisibility] = useState(false)
    const [confirmVisibility, setConfirmVisibility] = useState(false)

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        birthday: false,
        password: false,
        confirmation: false
    });

    if (form.firstName !== "" && form.lastName !== "" && form.email !== "" && form.password !== "" && form.confirmPassword !== "" && form.birthday !== null) {
        setIsFilled(true)
    } else {
        setIsFilled(false)
    }

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

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?@#$%^&*])[A-Za-z0-9?@#$%^&*]{15,}$/;
    const formattedPassword = (password: string) => {
        if (!passwordRegex.test(password)) {
            setFormatError('Password must be at least 15 characters and have at least one capital letter, one number, and one special character (? @ # $ % ^ & *).');
        } else {
            setFormatError('');
        }
    }

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

        if (form.password !== '') {
            formattedPassword(form.password)
        }

        const updatedErrors = {
            firstName: form.firstName === '',
            lastName: form.lastName === '',
            email: form.email === '',
            birthday: !form.birthday,
            password: form.password === '',
            confirmation: form.confirmPassword === ''
        };
        setErrors(updatedErrors);

        if (isFilled && isEmailValid && isPhoneValid && matchedPasswords && !updatedErrors.firstName && !updatedErrors.lastName && !updatedErrors.email && !updatedErrors.birthday && passwordRegex.test(form.password)) {
            const userData = {
                id: 0,
                first: form.firstName,
                last: form.lastName,
                email: form.email,
                doB: form.birthday,
                address: form.address,
                phone: form.phoneNumber,
                password: form.password
            }

            const addNewFormData = async (data: any) => {
                const response = await fetch("http://localhost:5046/AddFormData", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                // if (!res.ok) {
                //     Error(`An error has occured: ${res.status}`);
                // }
            };

            addNewFormData(userData);

            setSuccess(true);
        } else {
            setSuccess(false)
        }


        setEmailError(isEmailValid ? '' : 'Invalid email format, ex: hello@gmail.com');
        setPhoneError(isPhoneValid ? '' : 'Invalid phone number format, ex: (###)-###-####');

        setIsSubmitted(true);
    }

    useEffect(() => {
        if (success) {
            const getPeeps = async () => {
                const promise = await fetch("http://localhost:5046/GetFormData");
                const data = await promise.json();
                console.log(data);
            };

            getPeeps();

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
                    "red": "border-red-500 border-2 bg-white focus:border-blue-500 focus:ring-blue-500"
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
        <div className='bg-white/90 border-4 border-[#fe81bb] h-[720px] md:h-[670px] md:w-[550px] rounded-3xl shadow-md'>

            <form onSubmit={handleForm} action="" className='pt-9'>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {(isSubmitted && errors.firstName == true) &&
                        <div className='col-span-3 grid grid-cols-3'>
                            <div className='col-span-1'></div>
                            <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">First Name is required.</div>
                        </div>
                    }
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        First Name*
                    </label>
                    <TextInput theme={customText} color={errors.firstName ? "red" : "white"} value={form.firstName} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10 bg-white active:bg-[#feffc7] focus-within:bg-[#feffc7]" placeholder="Enter First Name" name="firstName" maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && errors.lastName &&
                        <div className='col-span-3 grid grid-cols-3'>
                            <div className='col-span-1'></div>
                            <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">Last Name is required.</div>
                        </div>
                    }
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Last Name*
                    </label>
                    <TextInput theme={customText} color={errors.lastName ? "red" : "white"} value={form.lastName} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="Enter Last Name" name="lastName" maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && errors.email && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">Email is required.</div>
                    </div>}
                    {(isSubmitted && emailError && !errors.email) && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">{emailError}</div>
                    </div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Email*
                    </label>
                    <TextInput theme={customText} color={errors.email || emailError ? "red" : "white"} value={form.email} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="ex: hello123@gmail.com" name="email" />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && errors.birthday &&
                        <div className='col-span-3 grid grid-cols-3'>
                            <div className='col-span-1'></div>
                            <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">Birthday is required.</div>
                        </div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Birthday*
                    </label>
                    <div className='col-span-2 mx-3 md:me-10 flex items-center rounded-md'>
                        <TextField
                            // label="Birthday"
                            className='!border-gray-400 !bg-white'
                            type="date"
                            name="birthday"
                            value={form.birthday}
                            onChange={updateForm}
                            color={errors.birthday ? 'warning' : 'info'}
                            focused={errors.birthday ? true : false}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ max: new Date().toISOString().split("T")[0] }}
                        />

                    </div>
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Address
                    </label>
                    <TextInput theme={customText} color="white" value={form.address} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="Enter Address" name="address" maxLength={100} />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && phoneError && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">{phoneError}</div>
                    </div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Phone Number
                    </label>
                    <TextInput theme={customText} color="white" value={form.phoneNumber} onChange={updateForm} type="text" className="col-span-2 mx-3 md:me-10" placeholder="ex: (###)-###-####" name="phoneNumber" />
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {(isSubmitted && errors.password == true) && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">Password is required.</div>
                    </div>}
                    {(isSubmitted && formatError && !errors.password) && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">{formatError}</div>
                    </div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center font-darling text-lg text-[#752727] flex justify-center' htmlFor="block rounded p-3">
                        Password*
                    </label>
                    <div className='col-span-2 mx-3 md:me-10 relative'>
                        {passVisibility ?
                            <>
                                <TextInput theme={customText} color={errors.password || formatError || passwordError ? "red" : "white"} value={form.password} onChange={updateForm} type="text" placeholder="Enter Password" name="password"

                                />
                                <Tooltip onClick={() => { setPassVisibility(!passVisibility) }} title='Hide Password' placement='top'>
                                    <RemoveRedEyeIcon fontSize="medium" className="me-1 absolute right-3 bottom-2 cursor-pointer" />
                                </Tooltip>
                            </>
                            :
                            <>
                                <TextInput theme={customText} color={errors.password || formatError || passwordError ? "red" : "white"} value={form.password} onChange={updateForm} type="password" placeholder="Enter Password" name="password"
                                />
                                <Tooltip onClick={() => { setPassVisibility(!passVisibility) }} title='Show Password' placement='top'>
                                    <VisibilityOffIcon fontSize="medium" className="me-1 absolute right-3 bottom-2 cursor-pointer" />
                                </Tooltip>
                            </>}

                    </div>
                </div>
                <div className='grid grid-cols-3 items-center mb-4'>
                    {isSubmitted && passwordError && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">{passwordError}</div>
                    </div>}
                    {(isSubmitted && errors.confirmation == true) && <div className='col-span-3 grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className="text-red-500 col-span-2 px-3 flex justify-start text-xs font-bold">Please confirm Password.</div>
                    </div>}
                    <label className='ps-2 md:ps-4 col-span-1 text-center flex justify-center font-darling text-lg text-[#752727]' htmlFor="block rounded p-3">
                        Confirm Password*
                    </label>
                    <div className='col-span-2 mx-3 md:me-10 relative'>
                        {confirmVisibility ?
                            <>
                                <TextInput theme={customText} color={(errors.confirmation || passwordError) ? "red" : "white"} value={form.confirmPassword} onChange={updateForm} type="text" placeholder="Confirm Password" name="confirmPassword" />
                                <Tooltip onClick={() => { setConfirmVisibility(!confirmVisibility) }} title='Hide Password' placement='top'>
                                    <RemoveRedEyeIcon fontSize="medium" className="me-1 absolute right-3 bottom-2 cursor-pointer" />
                                </Tooltip>
                            </>
                            :
                            <>
                                <TextInput theme={customText} color={(errors.confirmation || passwordError) ? "red" : "white"} value={form.confirmPassword} onChange={updateForm} type="password" placeholder="Confirm Password" name="confirmPassword" />
                                <Tooltip onClick={() => { setConfirmVisibility(!confirmVisibility) }} title='Show Password' placement='top'>
                                    <VisibilityOffIcon fontSize="medium" className="me-1 absolute right-3 bottom-2 cursor-pointer" />
                                </Tooltip>
                            </>}
                    </div>

                </div>

                <div className='absolute bottom-4 right-7'>
                    <button className={`text-white py-2 px-4 rounded-xl font-darling ${isFilled ? 'bg-[#56b681] hover:bg-green-700' : ' bg-slate-300 cursor-default'}`}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent
