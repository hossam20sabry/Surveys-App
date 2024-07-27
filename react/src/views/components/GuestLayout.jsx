import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

function GuestLayout(){
    const { userToken } = useStateContext()

    if(userToken) {
      return <Navigate to="/" />
    }

    return (
        <>
            <div className="flex min-h-full flex-1 bg-gray-100 flex-col justify-center px-6 py-12 lg:px-8">
                <Outlet></Outlet>
            </div>
        </>
    )
}
export default GuestLayout;