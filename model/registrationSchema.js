const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()



const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
})

user.pre('save', async function (next) {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            console.log("Password hash failed");
        }
        next();
    }
})

user.methods.pCompare = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        console.log("Password compare failed")

    }
}

user.methods.Tokengenerate = async function () {
    try {
        const token =await jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWTTOKEN,
            {
                expiresIn: '3d'
            }
        )
        return token;
    } catch (error) {
        console.log("Token generate problem")
    }

}


module.exports = mongoose.model("User", user);