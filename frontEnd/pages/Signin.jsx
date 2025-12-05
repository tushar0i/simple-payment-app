import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomText } from "../components/BottomText";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GihubRepo } from "../components/GithubRepo";

export function Signin(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return(<>
    <div className="flex justify-center items-center h-screen">
            <div className="w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
            <Heading  className="" content={"Sigh In"}></Heading>
            <SubHeading content={"Enter your details to sign in to your account"}></SubHeading>
            <InputBox className="" place={"someone@email.com"} label={"Email"} type={"text"} onChange={(e)=>{
                setEmail(e.target.value)
            }}></InputBox>
            <InputBox className="" place={"Nothing@123"} label={"Password"} type={"password"} onChange={(e)=>{
                setPassword(e.target.value)
            }}></InputBox>
            <Button label={"Sign In"} onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    email,
                    password
                });
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard");
            }}></Button>
            <BottomText text={"Don't have an account yet? "} link={"/signup"} page={"Signup"}></BottomText>
            </div>
        </div>
        <GihubRepo></GihubRepo>
    </>)
}