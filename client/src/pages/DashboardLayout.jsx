/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import {BigSidebar, Navbar, SmallSidebar} from "../components"
import {createContext, useContext, useState} from "react"
import customFetch from "../utils/customFetch"
import {toast} from "react-toastify"

// get data of current login user
export const loader = async () => {
  try {
    const {data} = await customFetch.get("/users/current-user")
    // console.log(data)

    return data
  } catch (error) {
    return redirect("/")
  }
}

const DashboardContext = createContext()

const DashboardLayout = ({isDarkThemeEnabled}) => {
  const {user} = useLoaderData()

  const navigate = useNavigate()

  const [showSidebar, setShowSidebar] = useState(false)

  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    toast.success("Logout successfully !!!")
  }

  return (
    // pass all variables trong COntext Api for whole app
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />

            <div className="dashboard-page">
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
