const errorMiddleware=(err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.errorMessage || "Backend error"

    return res.status(status).json({message})
}

module.exports=errorMiddleware