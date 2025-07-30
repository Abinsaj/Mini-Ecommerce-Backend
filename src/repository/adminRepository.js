import Admin from "../Schema/adminSchem.js"

const existingAdmin = async(email)=>{
    try {
        console.log(email,'email')
        const user = await Admin.findOne({email: email})
        return user
    } catch (error) {
        console.log(error)
    }
}

export {
    existingAdmin
}