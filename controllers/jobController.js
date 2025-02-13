import Job from "../models/jobModel.js"
import {StatusCodes} from "http-status-codes"
import {NotFoundError} from "../errors/customErrors.js"

import day from "dayjs"
import mongoose from "mongoose"

export const getAllJobs = async (req, res) => {
  const {search, jobStatus, jobType, sort} = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  //(------- SEARCHING by position OR company--------)

  if (search) {
    queryObject.$or = [
      {
        position: {$regex: search, $options: "i"},
      },
      {
        company: {$regex: search, $options: "i"},
      },
    ]
  }

  //(------- SEARCHING: AND jobStatus --------)

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus
  }

  //(------- SEARCHING: AND jobStatus --------)
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType
  }

  //(------- SORTING--------)
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  }

  const sortKey = sortOptions[sort] || sortOptions.newest

  // (------- PAGINATION ----)

  const page = Number(req.query.page) || 1

  const limit = Number(req.query.limit) || 10

  const skip = (page - 1) * limit

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)

  const totalJobs = await Job.countDocuments(queryObject)

  const numsOfPages = Math.ceil(totalJobs / limit)

  res
    .status(StatusCodes.OK)
    .json({totalJobs, numsOfPages, currentPage: page, jobs})
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({job})
}

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) throw new NotFoundError(`no job with id ${req.params.id}`)

  res.status(StatusCodes.OK).json({job})
}

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return new updated results
  })

  if (!updatedJob) throw new NotFoundError(`no job with id ${req.params.id}`)

  res.status(StatusCodes.OK).json({msg: "updated", updatedJob})
}

export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id)

  if (!job) throw new NotFoundError(`no job with id ${req.params.id}`)

  res.status(StatusCodes.OK).json({msg: "job deleted", removedJob: job})
}

// show stats
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      // ($match ===  WHERE)
      $match: {
        // get all jobs belong to current login user
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      // ($group === GROUP BY)
      $group: {_id: "$jobStatus", count: {$sum: 1}},
    },
  ])

  stats = stats.reduce((acc, curr) => {
    const {_id: title, count} = curr

    // console.log(title, count, acc)
    acc[title] = count
    return acc
  }, {})

  // console.log(stats)

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        // get all jobs belong to current login user
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    // group by month and year
    {
      $group: {
        _id: {
          year: {$year: "$createdAt"},
          month: {$month: "$createdAt"},
        },
        count: {$sum: 1},
      },
    },
    {$sort: {"_id.year": -1, "_id.month": -1}},
    {$limit: 12}, // 12months
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: {year, month},
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY")

      return {"date": date, "count": count}
    })
    .reverse()

  res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}
