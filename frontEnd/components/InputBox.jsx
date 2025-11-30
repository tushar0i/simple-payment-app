export function InputBox({place,type,label}){
    return (<>
    <div>
        <label for="first_name" className="block pl-1 mb-0.5 text-lg font-medium text-heading text-black ">{label}</label>
        <input type={type} placeholder={place} className="text-black rounded-md bg-white  w-80 px-3 py-1.5 placeholder-zinc-400  focus:outline-1 shadow-sm border border-gray-600/5 "/>
    </div>
    </>)
}