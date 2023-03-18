import express from "express"
import { db } from "./connect.js"

// routes
import usersRoutes from "./api/routes/users.js"
import authRoutes from "./api/routes/auth.js"
import commentsRoutes from "./api/routes/comments.js"
import storiesRoutes from "./api/routes/stories.js"
import likesRoutes from "./api/routes/likes.js"
import postsRoutes from "./api/routes/posts.js"
//
import cors from "cors"
import cookiesParser from "cookie-parser"
import multer from "multer"




const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://social-media-app.surge.sh"
}))
app.use(cookiesParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

// routes middleware
app.use("/api/users", usersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/stories", storiesRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/posts", postsRoutes)


app.get("/", (req, res) => {
    const q = "SELECT * FROM users"
    db.execute(q, (err, data) => {
        if (err) return console.log(err);
        return res.json(data)
    })
})

app.listen(process.env.PORT || 8800, () => {
    console.log("connected to backend");
})