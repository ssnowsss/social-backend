import express from "express"
import {getAll, addNew, deleteComment} from "../controllers/comments.js"
import {getCookie} from "../cookies/getCookies.js"

const router = express.Router()

router.get("/", getAll)
router.post("/", getCookie,addNew)
router.delete("/", getCookie,deleteComment)

export default router