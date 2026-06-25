const { z } = require('zod');

const schema = z.object({
    email : z.email()
})

function mailValid(req,res,next){
    const response = schema.safeParse(req.body)

    if(!response.success){
        res.status(411).json({
            message: 'invalid email'
        })
    }
    else{
        next()
    }
}
module.exports = { mailValid };