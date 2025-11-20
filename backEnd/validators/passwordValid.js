import { z } from 'zod';

const schema = z.object({
    password : z.string()
    .min(8)
    .max(32)
    .regex(/[a-z]/, {message:'Password must contain at least one lowercase character'})
    .regex(/[A-Z]/,{message:'Password must contain at least one uppercase character'})
    .regex(/[0-9]/,{message:'Password must contain at least one number'})
    .regex(/[^a-zA-Z0-9]/,{message:'Password must contain at least one special character'})
})

export function passwordValid(req,res,next){
    const response = schema.safeParse(req.body)
    console.log(response)

    if(!response.success){
        res.status(411).json({
            message:"invalid password"
        })
    }
    else{
        next()
    }
}