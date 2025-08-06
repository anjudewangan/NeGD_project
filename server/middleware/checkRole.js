/**
 * Middleware to check agent's role
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 */
function checkAgentRole(allowedRoles = []) {
    return function (req, res, next) {
        if (!req.agent || !req.agent.role) {
            return res.status(401).json({ message: "Unauthorized: Agent not authenticated" });
        }

        if (!allowedRoles.includes(req.agent.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }

        next(); // Agent has a valid role
    };
}

module.exports = checkAgentRole;