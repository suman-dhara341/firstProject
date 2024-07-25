const registrationSchema = require('../model/registrationSchema')


const register = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    try {
        const findUser = await registrationSchema.findOne({ $or: [{ email }, { phone }] })
        if (findUser) {
            const status = 500
            const errorMessage = "User alredy register"
            const errors = {
                status, errorMessage
            }
            return next(errors)
        }
        const user = await registrationSchema.create({ name, email, phone, password })
        await user.save()
        const token = await user.Tokengenerate();
        return res.status(200).json({ token: token, userId: user._id.toString() })
    } catch (error) {
        const status = 500
        const errorMessage = "User registration failed"
        const errors = {
            status, errorMessage
        }
        return next(errors)
    }


}


// LOGIN ROTES

const login = async (req, res,next) => {
    const { phone, password } = req.body;

    const findUser = await registrationSchema.findOne({ phone })
    if (!findUser) {
        const status = 500
        const errorMessage = "No user find"
        const errors = {
            status, errorMessage
        }
        return next(errors)
    }
    const pCompare =await findUser.pCompare(password)
    if (pCompare) {
        const token = await findUser.Tokengenerate()
        return res.status(200).json({ token: token, userId: findUser._id.toString() })
    } else {
        const status = 500
        const errorMessage = "No user found"
        const errors = {
            status, errorMessage
        }
        return next(errors)
    }
}


const user=async (req,res,next)=>{
    try {
        const user=req.user
        return res.status(200).json(user)
        
    } catch (error) {
        const status = 500
        const errorMessage = "Token varification failed"
        const errors = {
            status, errorMessage
        }
        return next(errors)
    }
}

module.exports = { register, login ,user};