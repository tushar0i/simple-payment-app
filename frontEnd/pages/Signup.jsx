import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomText } from "../components/BottomText";
import { useState } from "react";
import axios from 'axios';

export function Signup(){
    const[firstName , setFirstName] = useState("");
    const[lastName , setLastName] = useState("");
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");
    return(<>
    <div className="flex justify-center items-center h-screen">
        <div className="w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
        <Heading  className="" content={"Sigh Up"}></Heading>
        <SubHeading content={"Enter your details to create an account"}></SubHeading>
        <InputBox className="" place={"Some"} label={"First Name"} type={"text"} onChange={(e)=>{
            setFirstName(e.target.value);
        }}></InputBox>
        <InputBox className="" place={"One"} label={"Last Name"} type={"text"} onChange={(e)=>{
            setLastName(e.target.value);
        }}></InputBox>
        <InputBox className="" place={"someone@email.com"} label={"Email"} type={"text"} onChange={(e)=>{
            setEmail(e.target.value);
        }}></InputBox>
        <InputBox className="" place={"Nothing@123"} label={"Password"} type={"password"} onChange={(e)=>{
            setPassword(e.target.value);
        }}></InputBox>
        <Button label={"Sign Up"} onClick={()=>{
            axios.post("http://localhost:3000/api/v1/user/signup",{
                email:email,
                password:password,
                firstName:firstName,
                lastName:lastName
            })
        }}></Button>
        <BottomText text={"Already have an account? "} link={"/signin"} page={"Signin"}></BottomText>
        </div>
    </div>
    </>)
}