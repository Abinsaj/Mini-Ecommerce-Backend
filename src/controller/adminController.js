import { createRefreshToken, createToken } from "../config/jwtConfig.js"
import {  existingAdmin } from "../repository/adminRepository.js"

const adminLogin = async(req, res)=>{
    try {
        const {email,password} = req.body
        
        const isAdmin = await existingAdmin(email)
        if(!isAdmin){
            res.status(404).json({success: false, message:'Admin does not exist'})
        }else{
            if(password == isAdmin.password){

                const accessToken = createToken(isAdmin._id,'admin')
                const refreshToken = createRefreshToken(isAdmin._id, 'admin')

                res.cookie('AdminAccessToken',accessToken,{
                    httpOnly: true,
                    sameSite:'none',
                    secure: true,
                    maxAge: 60 * 1000,
                })
    
                res.cookie('AdminRefreshToken',refreshToken,{
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 10000
                })

                const admin = {
                    isAdmin,
                    accessToken,
                    refreshToken
                }

                res.status(200).json({success: true, message: "Login successful", admin})
            }
        }
    } catch (error) {
        res.status(500).json({success: false,message:'Something went wrong'})
    }
}

export {
    adminLogin
}