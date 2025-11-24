import { z } from 'zod';

const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string()
        .min(8)
        .max(32)
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase character' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase character' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one special character'})
        .optional()
})

export function userChanges(req,res,next){
    const response = schema.safeParse(req.body);
    if(!response.success){
        res.json({
            message: 'Invalid password'
        })
    }else{
        next();
    }
}