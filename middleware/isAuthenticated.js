// module.exports = (req, res, next) => {
//     console.log(req.session)
//     if (req.session.user) {
//         next();
//     } else {
//         res.status(401).send('Unauthorized');
//     }
// };
// middleware/authenticate.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
