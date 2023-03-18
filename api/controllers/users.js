import { db } from "../../connect.js"
import bcrypt from "bcryptjs"

export const getUser = (req, res, next) => {
    const q = "SELECT id, name, ProfilePic, coverPic, city, website FROM users WHERE `id` = ?"
    db.query(q, [req.query.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getRL = (req, res, next) => {
    const q = "SELECT id, name, ProfilePic FROM users WHERE `id` <> ? ORDER BY RAND() LIMIT 3"
    db.query(q, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getMutualFriends = (req, res, next) => {
    const q = "SELECT * FROM relationships WHERE `followerUserId` = ?"
    db.query(q, [req.query.strangerId], (err, data) => {
        if (err) return res.status(500).json(err)
        const starngeFollow = data.map((el) => el.followedUserId)
        
        const q = "SELECT * FROM relationships WHERE `followerUserId` = ?"
        db.query(q, [req.userId], (err, data) => {
            if (err) return res.status(500).json(err)
            const myFollow = data.map((el) => el.followedUserId)
            const mutualfriends = starngeFollow.filter((el) => el === myFollow.find((e) => e === el))
            const q = "SELECT * FROM users WHERE `id` IN (?)"
            db.query(q, [mutualfriends], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data)
            })
        })
    })
}
export const getfolloweds = (req, res, next) => {
    const q = "SELECT * FROM relationships WHERE `followerUserId` = ?"
    db.query(q, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map((el) => el.followedUserId))
    })
}
export const getfollowers = (req, res, next) => {
    const q = "SELECT u.* FROM users AS u JOIN relationships AS r ON (r.followerUserId = u.id) WHERE r.followedUserId = ?"
    db.query(q, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getMyFollowers = (req, res, next) => {
    const q = "SELECT u.* FROM users AS u JOIN relationships AS r ON (r.followedUserId = u.id) WHERE r.followerUserId = ?"
    db.query(q, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const follow = (req, res, next) => {
    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)"
    const VALUES = [
        req.userId,
        req.body.myFollow
    ]
    db.query(q, [VALUES], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const removeFollow = (req, res, next) => {
    const q = "DELETE FROM relationships WHERE (`followerUserId`, `followedUserId`) = (?)"
    const VALUES = [
        req.userId,
        req.query.myFollow
    ]
    db.query(q, [VALUES], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const updateUser = (req, res, next) => {
    console.log(req.body);
    const qu = "SELECT * FROM users WHERE `id` = ?"
    db.query(qu, [req.userId], (err, data) => {
        if (err) return res.status(500).json(err)

        const salt = bcrypt.genSaltSync(10);
        const hash = req.body.password && bcrypt.hashSync(req.body.password, salt);
        const q = "UPDATE users SET `username` = ?, `password` = ?, `name` = ?, `email` = ?, `city` = ?, `ProfilePic` = ?, `coverPic` = ?, `website` = ? WHERE `id` = ?"
        const VALUES = [
            req.body.username || data[0].username,
            hash || data[0].password,
            req.body.name || data[0].name,
            req.body.email || data[0].email,
            req.body.city || data[0].city,
            req.body.ProfilePic || data[0].ProfilePic,
            req.body.coverPic || data[0].coverPic,
            req.body.website || data[0].website,
            req.userId
        ]
        db.query(q, VALUES, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })

    })
}