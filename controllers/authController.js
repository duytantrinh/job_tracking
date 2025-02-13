import User from "../models/userModel.js"
import {StatusCodes} from "http-status-codes"
import {comparePassword, hashedPassword} from "../utils/hashPassword.js"
import {UnauthenticatedError} from "../errors/customErrors.js"
import {createJWT} from "../utils/tokenUtils.js"

export const register = async (req, res) => {
  // first account is set as "admin" role automatically, the left is 'user'
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? "admin" : "user"

  req.body.password = await hashedPassword(req.body.password)

  const user = await User.create(req.body)

  res.status(StatusCodes.CREATED).json({msg: "user created successfully"})
}
export const login = async (req, res) => {
  // 1. check valid email
  const user = await User.findOne({email: req.body.email})
  if (!user) throw new UnauthenticatedError("invalid email")

  // 2. compare password,
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  )
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid password")

  // 3. tạo jwt
  const token = createJWT({userId: user._id, role: user.role})

  // 4. set http cookie
  const oneDay = 1000 * 60 * 60 * 24 // one day

  res.cookie("job_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  })

  res.status(StatusCodes.OK).json({msg: "Logged in"})
}

export const logout = (req, res) => {
  res.cookie("job_token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({msg: "Logged out successfully"})
}
