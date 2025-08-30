import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import OtpVerification from './Pages/OtpVerification'
import Dashboard from './Pages/Dashboard'
import ForgotPassword from './Pages/ForgotPassword'
import Main from './Pages/Dashboard'
import Create from './Pages/Create'
import Trending from './Pages/Trending'


const App = () => {
  return (
    <>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/verifyotp' element={<OtpVerification/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/resetpassword' element={<ForgotPassword/>}/>
       <Route path='/post/create' element={<Create/>}/>
       <Route path='/post/trending' element={<Trending/>}/>
       
    </Routes>
    </>
    
  )
}

export default App
