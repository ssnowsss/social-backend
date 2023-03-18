import express from "express"
import { loggout, login, register } from "../controllers/auth.js"
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/loggout", loggout)

export default router