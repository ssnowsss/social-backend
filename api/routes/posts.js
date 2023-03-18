import express from "express"
import { addPost, getAll, getMyPosts, deletePost } from "../controllers/posts.js"
import { getCookie } from "../cookies/getCookies.js"

const router = express.Router()

router.post("/add", getCookie ,addPost)
router.delete("/", getCookie ,deletePost)
router.get("/getAll", getCookie ,getAll)
router.get("/getMyPosts/:id", getCookie ,getMyPosts)

export default router