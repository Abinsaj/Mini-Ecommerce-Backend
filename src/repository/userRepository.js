import User from "../Schema/userSchema.js"

const existingUser = async(email)=>{
    try {
        const user = await User.findOne({email: email})
        return user
    } catch (error) {
        console.log(error)
    }
}

const createUser = async(userData)=>{
    try {
        const data = await User.create(userData)    
        if(data){
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


export {
    existingUser,
    createUser
}