const cardsSchema = require('../model/cardsSchema');

const cardsGet = async (req, res, next) => {
    try {
        const cards = await cardsSchema.find()
        return res.status(200).json(cards);
    } catch (error) {
        const status = 400
        const errorMessage = "Card page is not working"
        const errors = {
            status, message
        }
        next(errors)
    }
}

const cardsPost = async (req, res, next) => {
    try {
        const { link, name, price } = req.body;
        if (!link || !name || !price) {
            const status = 400
            const errorMessage = "Filled the all input properly"
            const errors = {
                status, message
            }
            next(errors)
        }

        await cardsSchema.create({ link, name, price })
        res.status(200).json({message:"Card entry sucessfull"})

    } catch (error) {

    }
}

module.exports = { cardsGet, cardsPost };