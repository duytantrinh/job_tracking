import {BadRequestError, UnauthenticatedError} from "../errors/customErrors.js"
import {verifyJWT} from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
  // 1. token exist?
  const {job_token} = req.cookies
  if (!job_token) {
    throw new UnauthenticatedError("authentication invalid")
  }

  try {
    // 2. correct token, ?
    const {userId, role} = verifyJWT(job_token)

    const testUser = userId === "67ab12dbc1edb3792c72893b"

    // 3. add result token for req.user

    req.user = {userId, role, testUser}

    next()
  } catch (err) {
    throw new UnauthenticatedError("authentication invalid")
  }
}

export const authorizePermissions = (...roles) => {
  //   console.log(roles)
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route")
    }
    next()
  }
}

// for testUser demo explore the app
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!")
  }
  next()
}
