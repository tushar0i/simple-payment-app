import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";

export function Sighin(){
    return(<>
    <div className="flex justify-center items-center h-screen">
        <div className="h-3/4 w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
        <Heading  className="" content={"Sigh In"}></Heading>
        <InputBox className="" place={"example@email.com"} label={"Email"} type={"text"}></InputBox>
        <InputBox className="" place={"Nothing@123"} label={"Password"} type={"password"}></InputBox>
        </div>
    </div>
    </>)
}