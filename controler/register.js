const registerSchema = require('../models/registerSchema')


const register = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const userFind = await registerSchema.findOne({ $or: [{ email }, { phone }] })
        if (userFind) {
            const status = 500;
            const message = "User Alredy Registerd"
            const errorMessage = {
                status,
                message
            }
            next(errorMessage);
        }
        const newUser = await registerSchema.create({ name, email, phone, password })
        await newUser.save()
        const status = 200
        const message = "Register Sucessfull"
        const errorMessage = {
            status,
            message
        }
        next(errorMessage);

    } catch (error) {
        return res.status(500)
    }
}


module.exports = register;