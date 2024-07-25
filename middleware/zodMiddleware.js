const zodMiddleware = (zodValidaion) => async(req, res, next) => {
    try {
        const parseBody = await zodValidaion.parse(req.body);
        req.body = parseBody;
        next();
    } catch(err) {
        const status=500
        const errorMessage=err.errors[0].message
        const errors={
            status,errorMessage
        }
        return next(errors)
    }
}


module.exports=zodMiddleware;