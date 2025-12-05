import { useNavigate } from "react-router-dom"
import { SearchBar } from "../components/SearchBar"
import { ShowBalance } from "../components/ShowBalance"
import { TopBar } from "../components/TopBar"
import { UsersList } from "../components/UsersList"
import { useEffect, useState } from "react"
import axios from "axios"
import { GihubRepo } from "../components/GithubRepo"

export function Dashboard() {

    const [filter, setFilter] = useState([])
    const [users, setUser] = useState([])
    const [balance, setBalance] = useState("")
    const [firstName ,setFirstName] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/me",{
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            setFirstName(response.data.me.firstName[0].toUpperCase())
        })
        .catch(()=>{
            navigate("/signin")
        })
    },[navigate,token])

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUser(response.data.user)
            })
    }, [filter]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBalance(response.data.balance)
            })
    }, [])


    return (<>
       
        <TopBar firstName={firstName}  onClick={() => {
            localStorage.removeItem("token")
            navigate("/signin")
        }}></TopBar>

        <div className="flex gap-4 mt-20 ">

            <ShowBalance balance={balance} ></ShowBalance>

            <SearchBar type={"text"} place={"Search User here ...."} onChange={(e) => {
                setFilter(e.target.value)
            }} ></SearchBar>

        </div>

        <div className="m-4">
            {users.map(user => <UsersList user={user} ></UsersList>)}
        </div>
        
        <GihubRepo></GihubRepo>
    </>)
}