import React from 'react'
import logo from '../assets/logo.jpg'
import { BsFillSearchHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { IoMdHome } from "react-icons/io";
import { BiCollection } from "react-icons/bi";
import { MdPermContactCalendar } from "react-icons/md";
import { shopDataContext } from '../context/ShopContext';
function Nav() {
    let {user, setUser, getCurrentUser} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
   
    let [showProfile, setShowProfile] = useState(false)
    let {search,showSearch,setSearch, setShowSearch,
               getCartCount} = useContext(shopDataContext)
    let navigate = useNavigate()

    const handleLogout = async ()=>{
        try {
            let result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
            console.log(result.data)
            getCurrentUser()
          
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-[100vw] h-[70px] bg-slate-100 fixed top-0 flex items-center justify-between py-[30px] px-[30px] shadow-md shadow-black'>

       <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] ' >
               <img  className='w-[70px] rounded-lg ' src={logo} alt="" />
               <h1 className='text-[25px] text-black '>coCart</h1>
        </div>

        <div className='w-[50%] lg:w-[40%] hidden md:flex'>
            <ul className='flex items-center justify-around gap-[20px] text-white'>
                <li className='text-[15px] hover:bg-slate-400 bg-black rounded-2xl cursor-pointer py-[10px] px-[10px]' onClick={()=> navigate('/')}>HOME</li>
                <li className='text-[15px] hover:bg-slate-400 bg-black rounded-2xl cursor-pointer py-[10px] px-[10px]' onClick={()=> navigate('/collections')}>COLLECTIONS</li>
                <li className='text-[15px] hover:bg-slate-400 bg-black rounded-2xl cursor-pointer py-[10px] px-[10px]' onClick={()=> navigate('/about')}>ABOUT</li>
                <li className='text-[15px] hover:bg-slate-400 bg-black rounded-2xl cursor-pointer py-[10px] px-[10px]' onClick={()=> navigate('/contact')}>CONTACT PAGE</li>
            </ul>
        </div>

        <div className='w-[30%]   flex items-center justify-end gap-[20px] right-0'>
           {!showSearch &&  <BsFillSearchHeartFill className='text-black h-[38px] w-[38px] cursor-pointer' onClick={()=> {setShowSearch(prev => !prev); navigate('/collections')}}/>}
            {showSearch &&  <BsFillSearchHeartFill className='text-black h-[38px] w-[38px] cursor-pointer' onClick={()=> setShowSearch(prev => !prev)}/>}

           {!user &&  <CgProfile className='text-black h-[38px] w-[38px]' onClick={()=> setShowProfile(prev => !prev)}/>}
          {user &&  <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer' onClick={()=> setShowProfile(prev => !prev)}>
                {user?.name.slice(0,1)}
           </div>}
            <IoMdCart className='text-black h-[38px] w-[38px] hidden md:block' onClick={()=> navigate('/cart')}/>
            <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black rounded-lg py-[2px] px-[5px]  text-[9px] top-[10px] right-[25px] text-white hidden md:block'>{getCartCount()}</p>
        </div>
       {showSearch &&  <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] flex items-center justify-center left-0 right-0 top-[100%] absolute'>
                <input type="text" className='w-[50%] h-[60%] rounded-2xl bg-slate-600 placeholder:text-white text-white text-[18px] px-[30px]' placeholder='Search here' onChange={(e)=> setSearch(e.target.value)} value={search}/>
        </div>}
      
     {showProfile &&  <div className='absolute w-[200px] h-[180px] bg-[#000000d7] rounded-md right-[4%] top-[110%] border-[1px] border-[#aaa9a9] z-10 '> 
            <ul className='w-[100%] h-[100%] flex flex-col items-center justify-around py-[10px] text-[16px] text-white'>
               {!user &&  <li className='cursor-pointer' onClick={()=>{
                navigate('/login');
                setShowProfile(false)
               }} >Login</li>}
            {user &&  <li className='cursor-pointer'  onClick={()=>{handleLogout(); setShowProfile(false); setUser(""); }} >Logout</li>}
                <li onClick={()=> {navigate('/order'),setShowProfile(false)}}>orders</li>
                <li onClick={()=> {navigate('/about'); setShowProfile(false)}}>About</li>
            </ul>
      </div>}
        <div className='w-[100vw] h-[70px] bottom-0 bg-black flex items-center justify-between fixed left-0 py-[10px] px-[10px] md:hidden'>
               <button className='text-white flex flex-col items-center justify-center gap-[2px]'><IoMdHome className='w-[20px] h-[20px] text-white md:hidden'/>Home</button>
               <button className='text-white flex flex-col items-center justify-center gap-[2px]'><BiCollection className='w-[20px] h-[20px] text-white md:hidden'/>Collections</button>
               <button className='text-white flex flex-col items-center justify-center gap-[2px]'><MdPermContactCalendar className='w-[20px] h-[20px] text-white md:hidden'/>contact</button>
               <button className='text-white flex flex-col items-center justify-center gap-[2px]'><IoMdCart className='w-[20px] h-[20px] text-white md:hidden' onClick={()=>navigate('/cart')}/>Cart</button>
                <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold  rounded-full text-[9px] top-[8px] right-[18px]'>{getCartCount()}</p>
        </div>

    </div>
  )
}

export default Nav
