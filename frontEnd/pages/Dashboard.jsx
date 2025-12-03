import { SearchBar } from "../components/SearchBar"
import { ShowBalance } from "../components/ShowBalance"
import { TopBar } from "../components/TopBar"
export function Dashboard(){
    return(<>

    <TopBar firstName={"Someone"}></TopBar>
    <div className="flex gap-4 mt-20 ">
    <ShowBalance balance={200} ></ShowBalance>
    <SearchBar  type={"text"} place={"Search User here ...." } ></SearchBar>
    </div>
    </>)
}