const contactSchema=require('../model/contactSchema')

const contact=async(req,res,next)=>{
try {
    const {name,email,phone,message}=req.body;
    await contactSchema.create({name,email,phone,message});
    const status=200;
    const errorMessage="Message send sucessfull";
    const errors={
        status,errorMessage
    }
    next(errors)
} catch (error) {
    const status=400
    const errorMessage="Contact page is not working"
    const errors={
        status,message
    }
    next(errors)
}
}

module.exports=contact;