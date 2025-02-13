import {Router} from "express"

const router = Router()

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js"

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleWare.js"
import {checkForTestUser} from "../middleware/authMiddleware.js"

// http://localhost:5100/api/v1/jobs
router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob)

// (stats PHẢI TRƯỚC /:id , nếu ko express sẽ nghĩ /stats là 1 id)
router.route("/stats").get(showStats)

// http://localhost:5100/api/v1/jobs/:id
router
  .route("/:id")

  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)

export default router
