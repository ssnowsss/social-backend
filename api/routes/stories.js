import express from "express"
import { getAll, addNew } from "../controllers/stories.js"
import { getCookie } from "../cookies/getCookies.js"

const router = express.Router()

router.get("/", getCookie,getAll)
router.post("/", getCookie, addNew)

export default router