export function Button({label,onClick}){
    return(<>
   
    <button type="button" className="text-white text-lg font-semibold rounded-lg text-center bg-black  w-80 shadow-lg  py-2 transition delay-50 duration-150 ease-in-out hover:scale-102  cursor-pointer mt-3 " onClick={onClick} >{label}</button>
  
    </>)
}