import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomText } from "../components/BottomText";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GihubRepo } from "../components/GithubRepo";
import { PasswordInputBox } from "../components/PasswordInputBox";

export function Signin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (<>

        <div className="flex justify-center items-center h-screen">

            <div className="w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
                {/* just realized I was using Sigh insted of sign */}
                <Heading className="" content={"Sign In"}></Heading>

                <SubHeading content={"Enter your details to sign in to your account"}></SubHeading>

                <InputBox className="" place={"someone@email.com"} label={"Email"} type={"text"} onChange={(e) => {
                    setEmail(e.target.value)
                }}></InputBox>

                <PasswordInputBox place={"Nothing@123"} label={"Password"} onChange={(e) => {
                    setPassword(e.target.value);
                }}></PasswordInputBox>

                <Button label={"Sign In"} onClick={() => {
                    axios.post("http://localhost:3000/api/v1/user/signin", {
                        email,
                        password
                    })
                        .then(response => {
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard");
                        })
                        .catch(err => {
                            console.log(err)
                            alert(err.response.data.message)
                        })

                }}></Button>

                <BottomText text={"Don't have an account yet? "} link={"/signup"} page={"Signup"}></BottomText>

            </div>

        </div>

        <GihubRepo></GihubRepo>
        
    </>)
}