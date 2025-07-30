import {  existingAdmin } from "../repository/adminRepository.js"

const adminLogin = async(req, res)=>{
    try {
        console.log(req.body,'its hrerereer')
        const {email,password} = req.body
        
        const isAdmin = await existingAdmin(email)
        console.log(isAdmin,'this is what we got herere')
        if(!isAdmin){
            res.status(404).json({success: false, message:'Admin does not exist'})
        }else{
            console.log('its hererer')
            if(password == isAdmin.password){
                console.log('its hererererererer')
                res.status(200).json({success: true, message: "Login successful", admin: isAdmin})
            }
        }
    } catch (error) {
        res.status(500).json({success: false,message:'Something went wrong'})
    }
}

export {
    adminLogin
}