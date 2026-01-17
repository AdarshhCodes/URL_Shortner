const jwt = require("jsonwebtoken")
const secret = "Adarsh@#$123"
function setUser( user) {

    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}
function getUser(id) {
    if(!token) return null;
 
    try {
        
        return jwt.sign(token, secret)
    } catch (error) {
        return null;
    }
}
module.exports = {
    setUser,
    getUser,
}