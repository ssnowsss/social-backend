import jwt from "jsonwebtoken"

export const getCookie = (req, res, next) => {
    const cookie = req.cookies.accessToken
    if (!cookie) return res.status(401).json("un authorized")
    jwt.verify(cookie, "secretkey", (err, data) => {
        if (err) return res.status(404).json("unvalid access token")
        req.userId = data.id
        return next()
    })
}