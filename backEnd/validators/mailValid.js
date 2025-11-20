import { z } from 'zod';

const schema = z.object({
    email : z.email()
})

export function mailValid(req,res,next){
    const response = schema.safeParse(req.body)
    console.log(response)

    if(!response.success){
        res.status(411).json({
            message: 'invalid email'
        })
    }
    else{
        next()
    }
}