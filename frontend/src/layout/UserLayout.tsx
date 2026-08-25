import { Outlet } from "react-router"
import Header from "../components/Header"




function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default UserLayout