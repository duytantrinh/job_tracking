import {readFile} from "fs/promises"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

import Job from "./models/JobModel.js"
import User from "./models/UserModel.js"
try {
  await mongoose.connect(process.env.MONGO_URL)
  // const user = await User.findOne({ email: 'john@gmail.com' });

  // add jobs for testUser
  const user = await User.findOne({email: "test1234@gmail.com"})

  // read and get data from file mockData.json
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  )

  // add createdBy for testUser so that testUser can read them on UI
  const jobs = jsonJobs.map((job) => {
    return {...job, createdBy: user._id}
  })

  // delete all existing jobs
  await Job.deleteMany({createdBy: user._id})

  // CREATE all jobs
  await Job.create(jobs)

  console.log("Success!!!")
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
