import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import logo from '../../Assets/logo.jpg'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage("Something Went Wrong...!");
                setIsRegistering(false); // Reset isRegistering state in case of error
            }
        }
    };
    
    return (
        <>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-2xl border border-gray-400 rounded-3xl ">
                    <div className="text-center mb-6">
                    <a className="flex items-center justify-center mt-4 space-x-3 rtl:space-x-reverse ">
                      <img src={logo} className="h-9"  />
                      <span className="font-bold text-black text-2xl">Blogify</span>
                    </a>
                        <div className="mt-2">
                            <h3 className="text-gray-600 text-md font-semibold">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                placeholder='Email'
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 shadow-sm rounded-full transition duration-300"
                            />
                        </div>

                        <div>
                            
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                placeholder='Password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 shadow-sm rounded-full transition duration-300"
                            />
                        </div>

                        <div>

                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                placeholder='Confirm Password'
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border mb-2 border-gray-300 shadow-sm rounded-full transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-semibold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-full ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register