import User from "../models/userModel.js"
import Job from "../models/jobModel.js"
import {StatusCodes} from "http-status-codes"

// for upload image lên cloudinary
import cloudinary from "cloudinary"
import {promises as fs} from "fs"

// export const getAllUsers = async (req, res) => {
//   const users = await User.find({})
//   res.status(StatusCodes.OK).json({results: users.length, users})
// }

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({_id: req.user.userId})

  // return user without password - gi instant method toJSON set tại userModel.js
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

// cehck how many users? job? in whole app
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({users, jobs})
}

export const updateUser = async (req, res) => {
  // console.log(req.file)

  // ko show password ra UI AFTER update
  const newUser = {...req.body}
  delete newUser.password
  // console.log(newUser)

  // for upload image lên cloudinary
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)

    await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

  // nếu co1 upload new file và user đó đã có avatarPublicId thì delete avatar img cũ của user đó , đề upload new one
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  res.status(StatusCodes.OK).json({msg: "update user"})
}
