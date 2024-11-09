const {validateToken} = require("../services/authentication")
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error("Failed to validate token:", error);
            req.user = null; // Ensure req.user is null if the token is invalid
        }
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
