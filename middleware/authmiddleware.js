import jwt from 'jsonwebtoken'


const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token
  console.log("Token Received:", token); // Debug: Check the token received

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, 'secret123'); // Verify token
    console.log("Decoded Payload:", decoded); // Debug: Log decoded payload
    req.userId = decoded.id;
    console.log(req.userId)
    // req.role=decoded.role; // Attach the user object to request
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debug: Log error message
    res.status(401).json({ message: "Token is not valid" });
  }
};

//qwdwqd
// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   console.log("inside auth middleware")
//   console.log('this  is the' + token)
//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token,'secret123');
//     console.log(decoded)
//     req.user = decoded.user; // Attach the user's ID to the request object
//     console.log(decoded.user)
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

export default authMiddleware;