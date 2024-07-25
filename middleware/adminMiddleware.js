const adminMiddleware = (req, res, next) => {
    const user = req.user.isAdmin
    if (user===false) {
        return res.status(500).json({message:"You need to admin permision"})
    }
    next()
}


module.exports = adminMiddleware;