import React, { useContext, useState } from 'react'
import Logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.webp'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { userDataContext } from '../context/UserContext';
function Registration() {
  let navigate = useNavigate()
  let [show, setShow] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let {getCurrentUser} = useContext(userDataContext)
  const handleSignup = async (e)=>{
    e.preventDefault()
    try {
      let result = await axios.post(serverUrl + '/api/auth/registration',{
        name,email,password
      },{withCredentials:true})
      getCurrentUser()
      navigate('/')
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  const googleSignup = async ()=>{
    try {
      const response = await signInWithPopup(auth, provider)
      //console.log(response)
      let user = response.user
      let name = user.displayName
      let email = user.email
      let result = await axios.post(serverUrl + '/api/auth/googlelogin',{
        name,email
      },{withCredentials:true})
      console.log(result.data)
    } catch (error) {
      console.log("error",error);
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col text-[white] items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start text-[25px] font-sans gap-[10px] cursor-pointer' onClick={()=> navigate('/')}>
        <img  className='w-[40px] rounded-full ml-2' src={Logo} alt="" />
        <h1 className='text-[25px] font-sans'>coCart</h1>
      </div>
      <div className='w-[100%] h-[80px] flex items-center justify-center flex-col gap-[7px]'>
          <span className='text-[25px] font-semibolf'>Registration</span>
          <span className='text-[16px] '>Welcome to coCart, place your order</span>
      </div>
      <div className='max-w-[500px] w-[90%] h-[400px] border-[1px] border-[#96969635] bg-[#00000025] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
            <form action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={handleSignup}>
              <div className='w-[100%] h-[50px] bg-[#42656cae] flex items-center justify-center gap-[10px] p-[20px] cursor-pointer rounded-lg' onClick={googleSignup}>
                  <img  className='w-[40px] rounded-2xl ' src={google} alt="" /> <span>Registration with google</span>
              </div>
              <div className=' w-[100%] h-[1px] flex items-center justify-center gap-[20px]'>
                     <div className='w-[50%] h-[1px] bg-[#96969635]'></div> Or <div className='w-[50%] h-[1px] bg-[#96969635]'></div>
              </div>

              <div className='w-[90%] h-[300px] flex flex-col items-center justify-center gap-[10px] relative'>
                <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-[10px]' placeholder='Username' required onChange={(e)=> setName(e.target.value)} value={name}/>
                 <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-[10px]' placeholder='Email' required onChange={(e)=> setEmail(e.target.value)} value={email}/>
                  <input type={show? "text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-lg backdrop:blur-sm bg-transparent placeholder-[white] font-semibold p-[10px]' placeholder='password' required onChange={(e)=> setPassword(e.target.value)} value={password}/>
                  {!show && <FaEye className='w-[20px] h-[20px] absolute right-[5%] mt-[20px] ' onClick={()=> setShow(prev => !prev)}/>}
                  {show && <FaEyeSlash className='w-[20px] h-[20px] absolute right-[5%] mt-[20px]' onClick={()=> setShow(prev => !prev)}/>}
                  <button className='w-[100%] h-[40px] mt-[15px] bg-[#6060f5] flex items-center justify-center rounded-lg'>create account</button>
                  <p className='flex gap-[10px]'><span>You Have Any Account?</span><span className='text-[#6060f5] cursor-pointer font-semibold' onClick={()=> navigate('/login')}>Login</span></p>

              </div>
            </form>
      </div>
      
    </div>
  )
}

export default Registration
