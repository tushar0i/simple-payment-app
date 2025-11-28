import { z } from 'zod';

const schema = z.object({
    to: z.string()
    .regex(/^[0-9a-fA-F]{24}$/),
    amount: z.number()
});

export function transferValid(req,res,next){
    const response = schema.safeParse(req.body);
    console.log(response)
    if(!response.success){
        res.json({
            message: 'Invalid input'
        })
    }else{
        next();
    }
}