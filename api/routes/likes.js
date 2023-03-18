import express from "express"
import { getAll, addNew, removeLike } from "../controllers/likes.js"
import {getCookie} from "../cookies/getCookies.js"

const router = express.Router()

router.get("/", getAll)
router.post("/", getCookie,addNew)
router.delete("/", getCookie,removeLike)

export default router