import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
    try{
        // here we just kept it simple.
        // in real world we can use more sophisticated approach like using ip address,user id,etc.
        const {success}=await ratelimiter.limit("my-rate-limit");
        if(!success){
            return res.status(429).json({error:"Too many requests,please try again later"});
        }
        next();
       
    }
    catch(error){
        console.log("Rate limit error",error)
        next(error)
    }
}
export default rateLimiter;