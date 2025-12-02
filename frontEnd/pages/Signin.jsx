import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomText } from "../components/BottomText";

export function Signin(){
    return(<>
    <div className="flex justify-center items-center h-screen">
            <div className="w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
            <Heading  className="" content={"Sigh In"}></Heading>
            <SubHeading content={"Enter your details to sign in to your account"}></SubHeading>
            <InputBox className="" place={"someone@email.com"} label={"Email"} type={"text"}></InputBox>
            <InputBox className="" place={"Nothing@123"} label={"Password"} type={"password"}></InputBox>
            <Button label={"Sign In"}></Button>
            <BottomText text={"Don’t have an account yet? "} link={"/signup"} page={"Signup"}></BottomText>
            </div>
        </div>
    </>)
}