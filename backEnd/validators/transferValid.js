const { z } = require('zod');

const schema = z.object({
    to: z.string()
    .regex(/^[0-9a-fA-F]{24}$/),
    amount: z.number()
});

function transferValid(req,res,next){
    const response = schema.safeParse(req.body);
    if(!response.success){
        res.status(400).json({
            message: 'Invalid input'
        })
    }else{
        next();
    }
}

module.exports = { transferValid };