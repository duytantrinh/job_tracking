import "express-async-errors"

import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import morgan from "morgan"

import mongoose from "mongoose"
// public
import {dirname} from "path"
import {fileURLToPath} from "url"
import path from "path"

// import routers default nên có thể  đặt tên bất kỳ
import authRouter from "./routes/authRouter.js"
import jobRouter from "./routes/jobRouter.js"
import userRouter from "./routes/userRouter.js"

import cookieParser from "cookie-parser"

import cloudinary from "cloudinary"
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// for using json file in express
app.use(express.json())

// allow to access http jwt cookie
app.use(cookieParser())

// Error Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"

// Auth Middleware before request
import {authenticateUser} from "./middleware/authMiddleware.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.static(path.resolve(__dirname, "./public")))

app.get("/", (req, res, next) => {
  res.end("hello from server")
})

// Middleware for root api url
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/jobs", authenticateUser, jobRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"))
})

// Not Found http request Middleware: *  apply for all request,
app.use("*", (req, res) => {
  res.status(404).json({msg: "not found"})
})

// Error Middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

// Connect Mongoose DB
try {
  await mongoose.connect(process.env.MONGO_URL)

  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
  })
} catch (err) {
  console.log(error)
  process.exit(1)
}
