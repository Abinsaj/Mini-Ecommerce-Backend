import Admin from "../Schema/adminSchem.js"

const existingAdmin = async(email)=>{
    try {
        const user = await Admin.findOne({email: email})
        return user
    } catch (error) {
        console.log(error)
    }
}

export {
    existingAdmin
}