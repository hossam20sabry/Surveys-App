import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import axiosClient from '../../axios'
import { useEffect } from 'react'
import Toast from './Toast'
import { Fragment } from "react";

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const navigation = [
        { name: 'Dashboard', to: '/', current: true },
        { name: 'Surveys', to: '/surveys', current: false },
    ]
const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '#' },
    ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function DefaultLayout() {

  const {currentUser, setCurrentUser, setUserToken, userToken} = useStateContext();

  if(!userToken) {
    return <Navigate to="/login" />
  }

  const logout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
    .then((res) => {
      setCurrentUser({});
      setUserToken(null);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axiosClient.get('/user')
    .then(({data})=>{
      setCurrentUser(data);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    // <>
    //   <div className="min-h-full">
    //     <Disclosure as="nav" className="bg-gray-800">
    //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //         <div className="flex h-16 items-center justify-between">
    //           <div className="flex items-center">
    //             <div className="flex-shrink-0">
    //               <img
    //                 alt="Your Company"
    //                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    //                 className="h-8 w-8"
    //               />
    //             </div>
    //             <div className="hidden md:block">
    //               <div className="ml-10 flex items-baseline space-x-4">
    //                 {navigation.map((item) => (
    //                   <NavLink
    //                     key={item.name}
    //                     to={item.to}
    //                     className={({ isActive }) => classNames(
    //                       isActive? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                       'rounded-md px-3 py-2 text-sm font-medium',
    //                     )}
    //                     // aria-current={isActive ? 'page' : undefined}
    //                   >
    //                     {item.name}
    //                   </NavLink>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //           <div className="hidden md:block">
    //             <div className="ml-4 flex items-center md:ml-6">
                  

    //               {/* Profile dropdown */}
    //               <Menu as="div" className="relative ml-3">
    //                 <div>
    //                   <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //                     <span className="absolute -inset-1.5" />
    //                     <span className="sr-only">Open user menu</span>
    //                     <UserIcon className='w-8 text-white h-8 bg-black/25 p-2 rounded-full' />
    //                   </MenuButton>
    //                 </div>
    //                 <MenuItems
    //                   transition
    //                   className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    //                 >
    //                   <MenuItem>
    //                     <a
    //                       href="#"onClick={(e) => logout(e)}
    //                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
    //                     >
    //                       Sign out
    //                     </a>
    //                   </MenuItem>
    //                 </MenuItems>
    //               </Menu>
    //             </div>
    //           </div>
    //           <div className="-mr-2 flex md:hidden">
    //             {/* Mobile menu button */}
    //             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //               <span className="absolute -inset-0.5" />
    //               <span className="sr-only">Open main menu</span>
    //               <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
    //               <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
    //             </DisclosureButton>
    //           </div>
    //         </div>
    //       </div>
    //       <DisclosurePanel className="md:hidden">
    //         <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
    //           {navigation.map((item) => (
    //             <NavLink
    //             key={item.name}
    //             to={item.to}
    //               // aria-current={item.current ? 'page' : undefined}
    //               className={classNames(
    //                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    //                 'block rounded-md px-3 py-2 text-base font-medium',
    //               )}
    //             >
    //               {item.name}
    //             </NavLink>
    //           ))}
    //         </div>
    //         <div className="border-t border-gray-700 pb-3 pt-4">
    //           <div className="flex items-center px-5">
    //             <div className="flex-shrink-0">
    //             <UserIcon className='w-8 text-white h-8 bg-black/25 p-2 rounded-full' />
    //             </div>
    //             <div className="ml-3">
    //               <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
    //               <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
    //             </div>
                
    //           </div>
    //           <div className="mt-3 space-y-1 px-2">
    //               <DisclosureButton
                    
    //                 as="a"
    //                 href="#"
    //                 onClick={(e) => logout(e)}
    //                 className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
    //               >
    //                 Sign out 
    //               </DisclosureButton>
    //           </div>
    //         </div>
    //       </DisclosurePanel>
    //     </Disclosure>
    //     <Outlet />
    //     <Toast />
    //   </div>
    // </>
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700"
                                }
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {currentUser.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Outlet />

        <Toast />
      </div>
    </>
  )
}