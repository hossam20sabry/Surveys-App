import { useState } from "react";
import { Link } from "react-router-dom";
import axiosCliient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";


export default function Signup() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({__html: ''});

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({__html: ''});

    axiosCliient.post('/signup', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
    .then(({data}) => {
      setCurrentUser(data.user);
      setUserToken(data.token);
      
    })
    .catch(({response}) => {
      if (response.status === 422) {
        setError(response.data.errors);
        console.error(response.data.errors); 
      }
    });
  }


    return (
      <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(ev) => onSubmit(ev)} action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    
                    autoComplete="name"
                    onChange={(ev) => setName(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{error?.name}</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{error?.email}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{error?.password}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                    Password confirmation
                  </label>
                
                </div>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </div>
      </>
    )
  }
  