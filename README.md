# 🛍️ Mini-Ecommerce Backend

This is the backend for the **Mini-Ecommerce** application built using Node.js, Express.js, MongoDB, and Mongoose. It provides RESTful APIs for user management, product handling, cart functionality, and orders.

---

## 📁 Project Structure

backend/
├── .env
├── .gitignore
├── src/
│   ├── config/                    # Configuration files (DB, JWT, Cloudinary)
│   │   ├── cloudinaryConfig.js
│   │   ├── dbConfig.js
│   │   └── jwtConfig.js
│   ├── controller/               # Handles business logic
│   │   ├── adminController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/              # Custom middleware (e.g. auth)
│   │   └── userMiddleware.js
│   ├── repository/              # DB access logic
│   │   ├── adminRepository.js
│   │   ├── productRepository.js
│   │   └── userRepository.js
│   ├── routes/                  # Express routers
│   │   ├── adminRoute.js
│   │   ├── cartRoute.js
│   │   ├── orderRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── Schema/                  # Mongoose models/schemas
│   │   ├── adminSchem.js
│   │   ├── cartSchema.js
│   │   ├── orderSchema.js
│   │   ├── productSchema.js
│   │   └── userSchema.js
│   └── server.js                # Entry point



---

## ⚙️ Environment Variables

Create a `.env` file in the root of `backend/` and paste the following:

MONGO_URL=mongodb url

setup clouinary and past these here!!

CLOUDINARY_API_KEY= cloudinary api key
CLOUDINARY_API_SECRET= cloudinary api secret
CLOUD_NAME= cloudinary cloud name

JWT_SECRET_KEY= creaet a jwt secret


---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Run the Server

npm run dev  
# or
node src/server.js

## 3. API Endpoints

| Feature | Endpoint       |
| ------- | -------------- |
| User    | `/api/user`    |
| Admin   | `/api/admin`   |
| Product | `/api/product` |
| Cart    | `/api/cart`    |
| Orders  | `/api/order`   |


## 4. Cloudinary Setup

The app uses Cloudinary for image uploads. Set your Cloudinary API credentials in the .env file. The config is handled in:


🔐 JWT Authentication

Token generation and verification is handled using jsonwebtoken.
The secret key is set in .env as JWT_SECRET_KEY.


📌 Notes

Make sure you connect the frontend to this backend using the correct CORS settings.
API is structured cleanly using controller-repository-schema pattern.
All cart logic is managed via cartController.js and synced to MongoDB.

👨‍💻 Author

Abinsaj

