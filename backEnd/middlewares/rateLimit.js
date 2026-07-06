const rateLimit = require("express-rate-limit");

function limiter(windowMin , max , message='Too many requests, please try again later.'){
    return rateLimit({
        windowMs:windowMin*60*1000, // Convert minutes to milliseconds
        max: max, // Limit each IP to maxRequests per windowMs
        message: { 
            error: message
        },
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
}
module.exports = limiter;