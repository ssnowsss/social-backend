import {db} from "../../connect.js"

export const addNew = (req, res, next) => {
    const q = "INSERT INTO likes (`userId`, postId) VALUES (?)"
    const VALUES = [
        req.userId, 
        req.body.postId
    ]
    db.query(q, [VALUES], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
    
}
export const removeLike = (req, res, next) => {
    const q = "DELETE FROM likes WHERE (`userId`, `postId`) = (?)"
    const VALUES = [
        req.userId, 
        req.query.postId
    ]
    db.query(q, [VALUES], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
    
}
export const getAll = (req, res, next) => {
    const q = "SELECT * FROM likes WHERE `postId` = ?"
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data.map((el => el.userId)))
    })
}