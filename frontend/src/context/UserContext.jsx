import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


export const userDataContext = createContext()
function UserContext({children}) {
    let {serverUrl} = useContext(authDataContext)
    let [user, setUser] = useState("")

    const getCurrentUser = async ()=>{
        try {
            let result = await axios.get(serverUrl + '/api/user/getcurrentuser',{withCredentials:true})
            setUser(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCurrentUser()
    },[])
    let value={
        user,setUser,getCurrentUser
    }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
