import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongourl = process.env.MONGO_URL

const connectDB = async()=>{
    try {
        let connect = await mongoose.connect(mongourl)
        if(connect){
            console.log('data base conneced successfully')
        }
    } catch (error) {
        console.log('error connecting mongodb',error)
    }
}

export default connectDB