import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Register from '../pages/Register';
import UserLayout from '../layout/UserLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Course from '../pages/Course';
import Teacher from '../pages/Teacher';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<UserLayout />}>

        <Route index element={<Home />} />

        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='explore' element={<Explore />} />
        <Route path='courses/:id' element={<Course />} />
        <Route path='teachers/:id' element={<Teacher />} />


      </Route>
    </>
  )
)

export default router;