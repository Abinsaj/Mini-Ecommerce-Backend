import { existingUser,createUser } from "../repository/userRepository.js"
import bcrypt from 'bcrypt'

const signup = async(req, res)=>{
    try {
        console.log('its here')
        const {name, email, password ,confirmPassword} = req.body
        const ExistingUser = await existingUser(email)
        console.log(ExistingUser,'fghj')
        if(ExistingUser){
            res.status(409).json({ success: false,message: "User already exist"})
        }else{
            if(password !== confirmPassword){
                res.status(409).json({ success: false,message: "Please enter same password"})
            }
            console.log('yalayalayalayaa')
            const hashPassowrd = await bcrypt.hash(password,10)
            console.log(hashPassowrd,'this is the hashed password')
            const data = {
                name: name,
                email: email,
                password: hashPassowrd
            }
            console.log('its hrerererererererererer')
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
        console.log(userExist,'titititiitti')
        if(!userExist){
            res.status(404).json({success: false, message:'user does not exist'})
        }else{
            const comparePassword = await bcrypt.compare(password,userExist.password)
            if(!comparePassword){
                res.status(401).json({success: false, message: 'Invalid Credentials'})
            }
                console.log('k,dfalkkaaga')
                res.status(200).json({success: true, message: "Login successgul", user: userExist})
            
        }
    } catch (error) {
        res.status(500).json({success: false,message:'Something went wrong'})
    }
}

export {
    signup,
    login,  
}