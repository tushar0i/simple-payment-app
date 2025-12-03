export function ShowBalance({balance}){
    return (<>
    <div className="text-black text-xl font-medium flex justify">
        <div className=" bg-gray-200 px-5 py-3 rounded-lg  ml-4 shadow-gray-400 shadow-md/30">Your balance : ${(balance / 100).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</div>
        
    </div>
    </>)
}