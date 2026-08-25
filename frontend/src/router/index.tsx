import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Register from '../pages/Register';
import UserLayout from '../layout/UserLayout';
import Login from '../pages/Login';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<UserLayout />}>

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