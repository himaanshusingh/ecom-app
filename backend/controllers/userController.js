import User from "../models/userModel.js"

export const getCurrentUser = async (req,res)=>{
    try {
        let user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"current user error"})
    }
}

export const getAdmin = async (req,res)=>{
    try {
        let adminEmail = req.adminemail
        if(!adminEmail){
            return res.status(400).json({message:`admin is not found`})
            
        }
        return res.status(201).json({
            email:adminEmail,
            role:"admin"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`get admin error ${error}`})
    }
}