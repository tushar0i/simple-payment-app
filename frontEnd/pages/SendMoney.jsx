import { useSearchParams } from "react-router-dom";
import { GihubRepo } from "../components/GithubRepo";
import { useState , useEffect } from "react";
import axios from "axios"
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar";

export function SendMoney() {
    const [amount, setAmount] = useState("")
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    function convert(value) {
        const parts = value.split(".");

        if (parts.length === 1) {
            return parts[0] + "00";
        }
        if (parts.length === 2) {
            const decimals = parts[1].padEnd(2, "0").slice(0, 2);
            return parts[0] + decimals;
        }
    }

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    return (<>
        <div className="flex justify-center items-center h-screen">
            <div className="w-sm  bg-gray-100 rounded-2xl border-3 shadow-sm flex flex-col items-center gap-4">
                <div className="py-3 font-bold text-black text-3xl">Send Money</div>
                <div className="flex items-center justify-start gap-3 ">
                    <div className="flex items-center justify-center h-11 w-11 rounded-full bg-green-400 text-black  text-2xl">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="font-semibold text-black text-2xl">
                        {name}
                    </div>
                </div>
                <InputBox type={"text"} place={"enter amount"} label={"Amount (in $)"} onChange={(e) => {
                    setAmount(Number(convert(e.target.value)))
                }}></InputBox>
                <button type="button" className="text-white text-lg font-semibold rounded-lg text-center bg-green-500  w-80 shadow-lg  py-2 transition delay-50 duration-150 ease-in-out hover:scale-102  cursor-pointer m-3 " onClick={() => {
                    axios.post("http://localhost:3000/api/v1/account/transfer", {
                        to: id,
                        amount: amount

                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(response => {
                            alert(response.data.message)
                            setTimeout(() => {
                                navigate("/dashboard");
                            }, 1000)
                        })
                        .catch(err=>{
                            alert(err.response.data.message)
                            setTimeout(() => {
                                navigate("/dashboard");
                            }, 1000)
                        })
                }} >Send</button>
            </div>
        </div>
        <GihubRepo></GihubRepo>
    </>)
}