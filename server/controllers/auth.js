const Agent = require('../models/Agents');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const agent = await Agent.findOne({ username });
        if (!agent) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await agent.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = agent.generateAuthToken();
        res.status(200).json({ token, agent });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}