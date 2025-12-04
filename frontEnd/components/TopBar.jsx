
export function TopBar({ firstName, onClick }) {
    return (<>
        <div className="flex fixed top-0 z-50 justify-between items-center  w-full bg-gray-200  rounded-b-lg " >
            <div className="font-black text-black text-3xl py-3 px-5 " >
                Z@Pay
            </div>
            <div className="flex px-5 gap-4 items-center ">
                <div className=" text-xl text-black font-bold ">
                    Hello 👋
                </div>
                <div className="h-9 w-9 rounded-full bg-gray-600 text-white font-semiboldf text-center text-3xl shadow-lg">
                    {firstName[0].toUpperCase()}
                </div>
                <div>
                    <button type="button" className="text-gray-800 text-sm font-semibold rounded-md text-center   w-fit shadow-md  transition delay-50 duration-150 ease-in-out hover:scale-102  cursor-pointer px-2 py-1 outline-1" onClick={onClick}>Log Out</button>
                </div>
            </div>
        </div>

    </>)
}