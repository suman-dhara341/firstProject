const { z } = require('zod')


const Login = z.object({
    phone: z.string({ required_error: "Phone is required" })
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(20, { message: "Phone must not be more than 15 digits." }),

    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(2, { message: "Password must be 2 chars" })
        .max(50, {
            message: "Password must not be more than 50 chars"

        }),
})

const Registration =Login.extend ({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars." }),
    email: z.string({ required_error: "Email is required" })
        .email()
        .trim()
        .min(3)
});


module.exports = { Login, Registration }