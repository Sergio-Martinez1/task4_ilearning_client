import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { blockUser, deleteUser, getUsers, unblockUser } from "../api/admin";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"

const AminPage = () => {
  const [usersData, setUsersData] = useState([])
  const [usersIds, setUsersIds] = useState([])
  const { checkLogin, errors: loginError } = useAuth()

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers()
      if (res.status == 200) setUsersData(res.data)
    }
    fetchUsers()
  }, [])

  function formattDate(date) {
    let utc = new Date(date)
    let offset = utc.getTimezoneOffset();
    let local = new Date(utc.getTime() + offset * 60000);
    const timeString = local.toLocaleTimeString('en-US', { hour12: false });

    const day = local.getDate();
    const monthName = local.toLocaleString('en-US', { month: 'short' });
    const year = local.getFullYear();
    const formattedDate = `${timeString}, ${day} ${monthName}, ${year}`;
    return formattedDate
  }

  async function block() {
    const pass = await checkLogin()
    if (pass == false) return
    usersIds.forEach(async (userId) => {
      const res = await blockUser(userId)
      if (res.status == 200) {
        const new_data = usersData.map((userData) => {
          if (userData.id == userId)
            userData.status = "Blocked"
          return userData
        })
        setUsersData(new_data)
      }
    })
  }

  async function unBLock() {
    const pass = await checkLogin()
    if (pass == false) return
    usersIds.forEach(async (userId) => {
      const res = await unblockUser(userId)
      if (res.status == 200) {
        const new_data = usersData.map((userData) => {
          if (userData.id == userId)
            userData.status = "Active"
          return userData
        })
        setUsersData(new_data)
      }
    })
  }

  async function clear() {
    const pass = await checkLogin()
    if (pass == false) return
    usersIds.forEach(async (userId) => {
      const res = await deleteUser(userId)
      if (res.status == 200) {
        const new_data = usersData.filter((userData) => userData.id != userId)
        setUsersData(new_data)
      }
    })
  }

  function updateList(event, id) {
    const exist = usersIds.filter((userId) => userId == id)
    if (exist.length == 0) {
      const new_data = [...usersIds, id]
      setUsersIds(new_data)
    } else {
      let new_data = usersIds.filter((usersIds) => usersIds !== id)
      setUsersIds(new_data)
    }
  }

  return (
    <main className="w-full mx-auto flex-grow">
      <section className="flex flex-col w-[80%] mx-auto pt-8">
        <section className="flex gap-x-4 mb-4">
          <button
            className="border-black border-[2px] flex gap-x-3 px-3 py-2 items-center justify-center bg-gray-500 font-bold hover:bg-gray-600 active:bg-gray-500"
            onClick={block}
          >
            <FaLock /> Block
          </button>
          <button
            className="border-black border-[2px] p-2 w-12 flex justify-center items-center bg-lime-500 hover:bg-lime-600 active:bg-lime-500"
            onClick={unBLock}
          >
            <FaLockOpen />
          </button>
          <button
            className="border-black border-[2px] p-2 w-12 flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-500"
            onClick={clear}>
            <FaTrashAlt />
          </button>
        </section>
        <section className="grid grid-cols-[80px_1fr_1fr_1fr_180px] bg-gray-800 border-black border-[1px] border-b-[0px]">
          <div className="col-span-1 row-start-1 flex w-20 h-full justify-center items-center border-black border-[1px] border-b-[0px]">
          </div>
          <span className="col-span-1 row-start-1 p-2 flex justify-center items-center border-black border-[1px] border-b-[0px]">Name</span>
          <span className="col-span-1 row-start-1 p-2 flex justify-center items-center border-black border-[1px] border-b-[0px]">e-Mail</span>
          <span className="col-span-1 row-start-1 p-2 flex justify-center items-center border-black border-[1px] border-b-[0px]">Last Login</span>
          <span className="col-span-1 row-start-1 p-2 flex justify-center items-center border-black border-[1px] border-b-[0px]">Status</span>
        </section>
        <div className="border-black border-[1px] border-t-[0px]">
          {usersData.map((user, index) => (
            <div className={index % 2 == 0 ? "bg-gray-600" : "bg-gray-700"} key={index}>
              <div className="grid grid-cols-[80px_1fr_1fr_1fr_180px]" key={index}>
                {Object.keys(user).map((key, i) => (
                  i == 0 ? (
                    <div key={key} className="col-span-1 flex w-20 h-full justify-center items-center border-black border-[1px] border-t-[0px] border-b-[0px]">
                      <input className="p-2 w-4 h-4 cursor-pointer" type="checkbox" id="" value={user} onChange={(event) => { updateList(event, user.id) }} />
                    </div>
                  ) : (
                    <span key={key} className="col-span-1 p-2 flex justify-center items-center border-black border-[1px] border-t-[0px] border-b-[0px]">
                      <span className={user.status === "Blocked" ? "opacity-40" : "text-white"}>
                        {i == 3 ? formattDate(user[key]) : user[key]}
                      </span>
                    </span>
                  )
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AminPage
