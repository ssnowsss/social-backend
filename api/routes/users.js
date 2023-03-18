import express from "express"
import { getUser, getfollowers,getMutualFriends,getMyFollowers, updateUser, getRL, follow, getfolloweds, removeFollow } from "../controllers/users.js"
import {getCookie} from "../cookies/getCookies.js"

const router = express.Router()

router.get("/", getUser)
router.get("/mutualfriends",getCookie, getMutualFriends)
router.put("/",getCookie, updateUser)
router.post("/follow", getCookie,follow)
router.delete("/follow", getCookie,removeFollow)
router.get("/getfolloweds", getCookie,getfolloweds)
router.get("/getfollowers", getCookie,getfollowers)
router.get("/getmyfollowers", getCookie,getMyFollowers)
router.get("/rl", getCookie,getRL)

export default router