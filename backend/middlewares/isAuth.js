import jwt from "jsonwebtoken"
export const isAuth = async (req,res,next)=>{
    try {
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"token is not verified"})
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        console.log("isAuth error")
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}