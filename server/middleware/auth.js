import jwt from "jsonwebtoken";

export default verifyToken = async (req,req,next)=>{
    try{
        let token  = req.head("Authorization");

        if(!token){
            return res.status(403).send("Access Denied ");
        }
         if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimleft();
         }

         const verified = jwt.verify(token,process.env.JWT_SECRET);
         req.user = verified;
         next();
    }catch(err){
        res.status(500).json({error:err.message});
    }
}