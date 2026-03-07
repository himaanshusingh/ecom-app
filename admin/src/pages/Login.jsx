import React from 'react'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Logo from '../assets/logo.jpg'
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
function Login() {
   let [show, setShow] = useState(false)
     let [email, setEmail] = useState("")
      let [password, setPassword] = useState("")
      let {serverUrl} = useContext(authDataContext)
      let {getAdmin} = useContext(adminDataContext)
      let {adminData} = useContext(adminDataContext)
      let navigate = useNavigate()
      const adminLogin = async (e)=>{
        e.preventDefault()
        try {
          let result = await axios.post(serverUrl + "/api/auth/adminlogin",{
            email,password
          },{withCredentials:true})
          console.log(result.data);
          getAdmin()
          navigate("/")
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col text-[white] items-center justify-start'>
          <div className='w-[100%] h-[80px] flex items-center justify-start text-[25px] font-sans gap-[10px] cursor-pointer' onClick={()=> navigate('/')}>
            <img  className='w-[40px] rounded-full ml-2' src={Logo} alt="" />
            <h1 className='text-[25px] font-sans'>coCart</h1>
          </div>
          <div className='w-[100%] h-[80px] flex items-center justify-center flex-col gap-[7px]' >
              <span className='text-[25px] font-semibold'>Login</span>
              <span className='text-[16px] '>Welcome to coCart,  Add your items</span>
          </div>
          <div className='max-w-[500px] w-[90%] h-[300px] border-[1px] border-[#96969635] bg-[#00000025] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={adminLogin}>
                
    
                  <div className='w-[90%] h-[300px] flex flex-col items-center justify-center gap-[10px] relative'>
                   
                     <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-[10px]' placeholder='Email' required onChange={(e)=> setEmail(e.target.value)} value={email}/>
                      <input type={show? "text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-[10px]' placeholder='password' required onChange={(e)=> setPassword(e.target.value)} value={password}/>
                      {!show && <FaEye className='w-[20px] h-[20px] absolute right-[5%]  mb-[20px]' onClick={()=> setShow(prev => !prev)}/>}
                      {show && <FaEyeSlash className='w-[20px] h-[20px] absolute right-[5%] mb-[20px] ' onClick={()=> setShow(prev => !prev)}/>}
                      <button className='w-[100%] h-[40px] mt-[15px] bg-[#6060f5] flex items-center justify-center rounded-lg'>Login</button>
                      
    
                  </div>
                </form>
          </div>
          
        </div>
  )
}

export default Login
