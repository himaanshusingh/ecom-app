import jwt from 'jsonwebtoken'
export const adminAuth = async (req,res,next)=>{
    try {
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message:`token is not found`})
        }
        let verifyToken =   jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:`token is not verfied`})
        }
        req.adminemail = process.env.ADMIN_EMAIL
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:` admin auth failed`})
    }
}