import jwt from 'jsonwebtoken'



const fetchUser = (req,res,next) => {
    // Fething user details using jwt token
    const token = req.header("auth-token")
    console.log(token)

    if (!token)
    {
        return res.status(401).json({error : "Please authenticate using valid token "})
    }
    try {
        const data = jwt.verify(token, 'secret123');
        req.user= data.user
        next()
    } catch (error) {
        return res.status(401).json({error : "Please authenticate using valid token "})
    }
    
}
export default fetchUser