export function Button({label,onClick}){
    return(<>
   
    <button type="button" className="text-black text-lg  text bold font-semibold rounded-lg text-center bg-gray-100  w-80 shadow-lg  py-2 transition delay-50 duration-150 ease-in-out hover:scale-102  cursor-pointer mt-3 " onClick={onClick} >{label}</button>
  
    </>)
}