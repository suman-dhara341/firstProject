const express = require('express');
const app = express();
const DBConnection = require('./BDConnection');
require('dotenv').config()
// const authRouter=require('./router/authRouter')
const authRouter=require('./router/authRouter')
const errorMiddleware=require('./middleware/errorMiddleware')
const cardRouter=require('./router/cardRouter')
const adminRouter=require('./router/adminRouter')

const cors = require('cors');

app.use(cors());


app.use(express.json());

app.use('/api', authRouter);
app.use('/service',cardRouter)
app.use('/admin',adminRouter)


app.use(errorMiddleware)


DBConnection(process.env.DBURL).then(() => {
    app.listen(3000, () => {
        console.log("Express Connection Sucessfull port number 3000");
    })
})
