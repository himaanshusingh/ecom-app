import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"

import User from "../models/userModel.js"
export const registration = async (req,res)=>{
    try {
        const {name,email,password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:`user already exist`})
        }
        if(!validator.isEmail(email)){
             return res.status(400).json({message:`Enter valid email`})
        }
        if(password.length <8){
            return res.status(400).json({message:`Enter strong password`})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,email,password:hashPassword
        })
        const token =  await genToken(user._id);
        res.cookie("token",token, {
            httpOnly : true,
            secure: true,
            sameSite : "none",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json(user)
    } catch (error) {
        console.log("registration error");
        return res.status(500).json({message:`registration error`});
    }
}

export const login = async (req,res)=>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})

        if(!user){
             return res.status(400).json({message:`user not found`})
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
             return res.status(400).json({message:`incorrect password`})
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite : "none",
            maxAge: 7*24*60*60*1000
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:`login error ${error}`})
    }
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:`logout succesfull`})
    } catch (error) {
        return res.status(200).json({message:`logout error, ${error}`})
    }
}

export const googleLogin = async (req,res)=>{
    try {
        let {name,email} = req.body
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name,email
            })
        }
       
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite : "none",
            maxAge: 7*24*60*60*1000
        })

        res.status(200).json(user)
    } catch (error) {
          res.status(500).json({message:`google login error ${error}`})
    }
}

export const adminLogin = async (req,res)=>{
    try {
        let {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
             let token = await genToken1(email)
            res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite : "none",
            maxAge: 1*24*60*60*1000
            })
            return res.status(200).json(token)
        }
        return res.status(400).json({message:'invalid credentials'})
    } catch (error) {
        res.status(500).json({message:`Admin login error ${error}`})
    }
}
