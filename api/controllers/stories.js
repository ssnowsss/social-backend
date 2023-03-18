import moment from "moment"
import {db} from "../../connect.js"



export const getAll = (req, res, next) => {
    const q = "SELECT u.id AS id, img, name, createdAt FROM stories AS s JOIN USERS AS u ON (s.userId = u.id) LEFT JOIN relationships AS r ON (s.userId = r.followedUserId) WHERE r.followerUserId = ? OR  s.userId = ? ORDER BY s.createdAt DESC LIMIT 4"
    db.query(q, [req.userId, req.userId], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}
export const addNew = (req, res, next) => {
    const q = "INSERT INTO stories (`userId`, `img`, `createdAt`) VALUES (?)"
    const VALUES = [
        req.userId, 
        req.body.img, 
        moment(Date.now()).format("YYYY/MM/DD HH:mm:ss")
    ]
    db.query(q, [VALUES], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("story added")
    })
}