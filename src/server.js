import express from 'express'
import connectDB from './config/dbConfig.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import adminRouter from './routes/adminRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()

connectDB()

app.use(cookieParser())

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}


app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRoute)


app.listen(5678,()=>{
    console.log('server is running...')
})