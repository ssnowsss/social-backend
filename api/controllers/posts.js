import moment from "moment";
import { db } from "../../connect.js"

export const addPost = (req, res, next) => {
    const q = "INSERT INTO `social`.`posts` (`desc`, `img`, `userId`, `createdAt`) VALUES (?)"
    console.log();
    const VALUES = [
        req.body.desc,
        req.body.img,
        `${req.userId}`,
        moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
    ]
    console.log(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
    db.query(q, [VALUES], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getAll = (req, res, next) => {
    const q = "SELECT p.*, u.id AS userId, name, ProfilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC"
    db.query(q, [req.userId, req.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.filter((el, i,array) => 
            i === array.findIndex((e) => e.id === el.id)
        ))
    })
}
export const deletePost = (req, res, next) => {
    const q = "DELETE FROM posts WHERE (`userId`, `id`) = (?)"
    const VALUES = [
        req.userId,
        req.query.id
    ]
    db.query(q, [VALUES], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getMyPosts = (req, res, next) => {
    const id = req.params.id
    const q = "SELECT p.*, u.id AS userId, name, ProfilePic, coverPic, city, website FROM posts AS p JOIN users AS u ON (p.userId, u.id) = (?)"
    db.query(q, [[id, id]], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}



