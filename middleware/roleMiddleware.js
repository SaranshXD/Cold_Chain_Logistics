// import jwt from "jsonwebtoken";

// export const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer token
//   if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

//   try {
//     const decoded = jwt.verify(token, "secret123"); // Use environment variable for secret
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden: Access denied" });
//     }
//     next();
//   };
// };
//qwdqwd