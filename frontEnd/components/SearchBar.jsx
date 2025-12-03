export function SearchBar({ place,type }) {
    return (<>
        <div className=" bg-gray-200 rounded-lg  text-black  grow mr-4  shadow-gray-400 shadow-md/30">
            <div className="flex items-center gap-4 px-5 py-2.5">
                <div className="text-black text-xl font-bold hidden sm:block">
                    USERS
                </div>
                <div className="flex grow">
                    <input type={type} placeholder={place} className="text-black rounded-md  w-full px-3 py-1 placeholder-gray-500  outline-2 outline-black/40 shadow-sm  "/>
                </div>
            </div>
        </div>

    </>)
}