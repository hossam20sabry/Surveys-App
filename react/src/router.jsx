import { createBrowserRouter, Navigate } from "react-router-dom";
// import App from './App'
import Dashboard from "./views/Dahsboard";
import Survey from "./views/Survey";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./views/components/GuestLayout";
import DefaultLayout from "./views/components/DefaultLayout";
import SurveyView from "./views/SurveyView";
import SurveyPublicView from "./views/SurveyPublicView";
import NotFound from "./views/components/NotFound";
import NotResponding from "./views/components/NotResponding";

const router = createBrowserRouter([

    // authors
    {
        path:'/',
        element:<DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/surveys',
                element: <Survey />
            },
            {
                path: '/surveys/create',
                element: <SurveyView />
            },
            {
                path: '/surveys/:id',
                element: <SurveyView />
            },
        ]
    },

    // Guest
    {
        path:'/',
        element:<GuestLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },

    //public
    {
        path: '/public/survey/:id',
        element: <SurveyPublicView />
    },

    //not found
    {
        path: '*',
        element: <NotFound />
    }
    ,

    //NotResponding
    {
        path: '/notresponding',
        element: <NotResponding />
    }
])

export default router;