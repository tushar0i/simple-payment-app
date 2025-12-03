export function TopBar({ firstName }){
    return (<>
    <div className="flex fixed justify-between items-center  w-full bg-white shadow-2xl" >
        <div className= "font-black text-black text-2xl py-3 px-5 " >
        Z@Pay
    </div>
    <div className="flex px-5 gap-4 items-center ">
        <div className=" text-xl text-black font-bold ">
           Hello 👋
        </div>
        <div className="h-9 w-9 rounded-full bg-gray-600 text-white font-semiboldf text-center text-3xl shadow-lg">
            {firstName[0].toUpperCase()}
        </div>
    </div>
    </div>
    
    </>)
}