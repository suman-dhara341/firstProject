const registrationSchema = require('../model/registrationSchema')
const contactSchema = require('../model/contactSchema')

const allUser = async (req, res) => {
    try {
        const allUser = await registrationSchema.find({}, { password: 0 })
        if (!allUser) {
            res.status(500).json({ message: "No user found" })
        }
        return res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json({ message: "Admin user get problem" })
    }
}


const allContact = async (req, res) => {
    try {
        const allContact = await contactSchema.find()
        if (!allContact || allContact.length === 0) {
            res.status(500).json({ message: "No user message found" })
        }

        res.status(200).json(allContact)
    } catch (error) {
        res.status(500).json({ message: "Admin contact get problem" })
    }
}



// delete

const userDelete = async (req, res) => {
    try {
        const id = req.params.id;

        const findUser = req.user._id.toString()



        if (findUser === id) {
            return res.status(404).json({ message: "You can't delete itself" })
        }

        const user = await registrationSchema.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ message: "No user found" })
        }

        return res.status(200).json({ message: "User delete sucessfull" })

    } catch (error) {
        return res.status(500).json({ message: "Delete failed" })
    }
}

//Update
const userUpdateGet = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await registrationSchema.findById(id).select('-password')
        // console.log(user)
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "User edit problem" })
    }
}


const userUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, phone } = req.body;
        const user = await registrationSchema.updateOne({ _id: id }, { $set: { name, email, phone } })
        return res.status(200).json({ message: "User Update Sucessfull" })
    } catch (error) {
        return res.status(500).json({ message: "Update Problem" })
    }

}


module.exports = { allUser, allContact, userDelete, userUpdate, userUpdateGet };