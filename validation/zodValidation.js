const { z } = require("zod");

// login  schema
const loginSchema = z.object({
    phone: z.string({ required_error: "Phone is required" })
        .min(10, { message: "Phone number must be 10 chars." })
        .max(15, { message: "Phone must not be more than 15 chars." }),
    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(2, { message: "Password must be 2 chars" })
        .max(50, {
            message: "Password must not be more than 50 chars"
        }),
})


// signupSchema

const registrationSchema = loginSchema.extend({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars." }),
    email: z.string({ required_error: "Email is required" })
        .email()
        .trim()
        .min(3),

});


// contactSchema

const contactSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    email: z.string({ required_error: "Email is required" })
        .email({ message: "Invalid email address." })
        .trim()
        .min(3, { message: "Email must be at least 3 characters." }),
    phone: z.string({ required_error: "Phone is required" })
        .min(10, { message: "Phone number must be 10 characters." })
        .max(15, { message: "Phone must not be more than 15 characters." }),
    message: z.string({ required_error: "Message is required" })
        .trim()
        .min(5, { message: "Message must be at least 5 characters." })
        .max(1000, { message: "Message must not be more than 1000 characters." }),
});


module.exports = { registrationSchema, loginSchema, contactSchema };