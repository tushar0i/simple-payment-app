import { Link } from "react-router-dom"
export function BottomText({text,link,page}){
    return(<>
    <div className="text-center text-md text-gray-600 pb-5 pt-3">
        {text}<Link className="font-semibold underline cursor-pointer text-black" to={link}>{page}</Link>
    </div>
    </>)

}