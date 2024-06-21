import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
//rename login
import {Button, Input, Logo} from "./index"
//importing components
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
//used appwrite in this project 
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm() // from the react-hook-form documentation

    const [error, setError] = useState("") // to know the errors 

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data) //to create a login session using appwrite services
            if (session) {
                const userData = await authService.getCurrentUser() // extract the details of current user if the seesion had established successfullt
                if(userData) dispatch(authLogin(userData)); // and send the userData to the store using dispatch
                navigate("/")//then navigate to the root page
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* a Logo component had been created previously */}
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        { //if there is an error, then show that error
        error && <p className="text-red-600 mt-8 text-center">{error}</p>
        }
        <form onSubmit={handleSubmit(login)} 
        /* in react-hook-form, handleSubmit is a method where you give your own defined method stating how the submit will be handled. handleSubmit is a keyword from react-hook-form*/ 
         className='mt-8'>
            <div className='space-y-5'>
                {/* Using the input component */}
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                { //necessary to give a javascript since we are using react-hook-form
                    ...register("email", //here we need to give a unique name to every <input> type of the form. The data from the Input is stored in this register for each input therefore we are doing this spread ... operation . Moreover, this register will transfer the data to the login function (which has 'data' as a parameter) via the handleSubmit event
                        { //the second parameter is an object which has many options (OPTIONAL)
                    required: true,
                    validate: {
                        //this regex value was copied from the tutorial
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input //similarly, giving an input for password
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                {/*//now using our custom designed Button component*/}
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login