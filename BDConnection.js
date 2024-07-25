const mongoose=require('mongoose')


const DBConnection=async (URL)=>{
    try {
        await mongoose.connect(URL).then(()=>{
            return console.log("DB Connection sucessfull")
        })
    } catch (error) {
        console.log("DB connection problem",error);
    }
}


module.exports=DBConnection;