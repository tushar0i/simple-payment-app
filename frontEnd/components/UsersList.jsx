import { useNavigate } from "react-router-dom"

export function UsersList({user}){
    const navigate = useNavigate();

    return(<>
    <div className="flex rounded-lg bg-gray-200/20 text-black justify-between items-center px-4 py-2  mb-2 shadow-2xs">
        <div className="flex  gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-full bg-gray-300 text-black font-semiboldf  text-3xl shadow-lg">
            {user.firstName[0].toUpperCase()}
        </div>
        <div className="flex flex-col  sm:flex-row sm:items-center sm:space-x-3">
            <div className="font-semibold text-white">
                {user.firstName} {user.lastName}
            </div>
            <div className="hidden sm:block text-white font-bold">{"|"}</div>
            <div className="text-white">
                {user.email}
            </div>
        </div>
        </div>
        <div>
           <button type="button" className="text-white text-lg font-semibold rounded-lg text-center bg-black  w-fit shadow-md  transition delay-50 duration-150 ease-in-out hover:scale-104  cursor-pointer px-2 py-1" onClick={()=>{
            navigate("/send?id="+user._id+"&name="+user.firstName)
           }}>Send Money</button> 
        </div>
    </div>
    </>)
}