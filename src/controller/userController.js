import { createRefreshToken, createToken } from "../config/jwtConfig.js"
import { existingUser,createUser } from "../repository/userRepository.js"
import bcrypt from 'bcrypt'

const signup = async(req, res)=>{
    try {
        const {name, email, password ,confirmPassword} = req.body
        const ExistingUser = await existingUser(email)
        if(ExistingUser){
            res.status(409).json({ success: false,message: "User already exist"})
        }else{
            if(password !== confirmPassword){
                res.status(409).json({ success: false,message: "Please enter same password"})
            }
            const hashPassowrd = await bcrypt.hash(password,10)
            const data = {
                name: name,
                email: email,
                password: hashPassowrd
            }
            const user = await createUser(data)
            if(user){
                res.status(201).json({ success: true,message: "User created successfully", user})
            }
        }
        
    } catch (error) {
        res.status(500).json({success: false,message:'Something went wrong'})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await existingUser(email)
        if(!userExist){
             return res.status(404).json({success: false, message:'user does not exist'})
        }else{
            const comparePassword = await bcrypt.compare(password,userExist.password)
            if(!comparePassword){
                return res.status(401).json({success: false, message: 'Invalid Credentials'})
            }

                const accessToken = createToken(userExist._id,"user")
                const refreshToken = createRefreshToken(userExist._id, "user")


                res.cookie('UserAccessToken',accessToken,{
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 60 * 1000,
                })
    
                res.cookie('UserRefreshToken',refreshToken,{
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 10000
                })

                const user = {
                    userExist,
                    accessToken,
                    refreshToken
                }

                return res.status(200).json({success: true, message: "Login successgul", user})
            
        }
    } catch (error) {
        res.status(500).json({success: false,message:'Something went wrong'})
    }
}

export {
    signup,
    login,  
}