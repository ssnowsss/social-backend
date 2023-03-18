import moment from "moment";
import { db } from "../../connect.js";

export const getAll = (req, res, next) => {
    const q = "SELECT c.*, u.id AS userId, name, ProfilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId AND c.postId = ?) ORDER BY c.createdAt DESC"
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const deleteComment = (req, res, next) => {
    const q = "DELETE FROM comments WHERE (`id`, `userId`) = (?)"
    db.query(q, [[req.query.id, req.userId]], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const addNew = (req, res, next) => {
    const q = "INSERT INTO `social`.`comments` (`desc`, `userId`, `createdAt`, `postId`) VALUES (?)"
    const VALUES = [
        req.body.desc,
        `${req.userId}`,
        moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.postId
    ]
    db.query(q, [VALUES], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}