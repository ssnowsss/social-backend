import { db } from "../../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res, next) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length > 0) return res.status(409).json("user already exist")
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const addQ = "INSERT INTO `social`.`users` (`username`, `password`, `email`, `name`, `city`, `ProfilePic`, `coverPic`, `website`) VALUES (?)"
        const VALUES = [
            req.body.username,
            hash,
            req.body.email,
            req.body.name,
            req.body.city,
            req.body.ProfilePic,
            req.body.coverPic,
            req.body.website,
        ]
        db.query(addQ, [VALUES], (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    })

}
export const login = (req, res, next) => {
    const q = "SELECT * FROM users WHERE username = ?"
    db.execute(q, [req.body.username], async (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length < 1) {
            return res.status(404).json("user not found")
        }
        const ifPassTrue = await bcrypt.compare(req.body.password, data[0].password)
        if (!ifPassTrue) {
            return res.status(400).json("wrong password or username")

        } else {
            const token = jwt.sign({ id: data[0].id }, "secretkey")
            const { password, ...others } = data[0]
            return res.cookie("accessToken", token, {
                httpOnly: true,
                secure: true,  
                sameSite: "none", 
                expiry: new Date(1735731386737) , 
                maxAge : 1735731386737
            }).status(200).json(others)
        }
    })
}
export const loggout = (req, res, next) => {
    res.clearCookie("accessToken", {
        secure: true, 
        sameSite: "none"
    }).status(200).json("user has been logged out")
}