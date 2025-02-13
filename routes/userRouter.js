import {Router} from "express"

const router = Router()

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js"
import {validateUpdateUserInput} from "../middleware/validationMiddleWare.js"
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js"
import upload from "../middleware/multerMiddleware.js"

// http://localhost:5100/api/v1/users
router.get("/current-user", getCurrentUser)

router.get(
  "/admin/app-stats",
  authorizePermissions("admin"), // only admin can access this route
  getApplicationStats
)

router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
)

export default router
