import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Register from '../pages/Register';
import UserLayout from '../layout/UserLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='register' element={
          <Register />
        }>
        </Route>

        <Route path='login' element={
          <Login />
        }>
        </Route>

      </Route>
    </>
  )
)

export default router;