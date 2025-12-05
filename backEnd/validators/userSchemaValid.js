import {z} from 'zod';

const schema = z.object({
    email: z.email(),
    password: z.string()
    .min(8,{message:'Password must be at least 8 characters long'})
    .max(32,{message:'Password must not exceed 32 characters'})
    .regex(/[A-Z]/,{message:'Password must contain at least one uppercase character'})
    .regex(/[a-z]/,{message:'Password must contain at least one lowercase character'})
    .regex(/[0-9]/,{message:'Password must contain at least one number '})
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
    ,
    firstName: z.string(),
    lastName: z.string()
})

export  function userSchemaValid(req,res,next){
    const response = schema.safeParse(req.body)

    if(!(response.success)){
        res.status(411).json({
            message: "invalid email or password",
        })
    } else {
        next()
    }
}