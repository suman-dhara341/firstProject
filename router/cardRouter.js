const express=require('express')
const routes=express.Router();
const allcard=require('../controller/cardsController')


routes.route('/cards').get(allcard.cardsGet)
routes.route('/cards').post(allcard.cardsPost)


module.exports=routes