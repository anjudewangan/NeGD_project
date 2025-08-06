const Agents = require("../models/Agents")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.agentsUnder = async (req, res) => {
    const agentId = req.agent._id
    const agents = await Agents.aggregate([
        {
            $match: { _id: new ObjectId(agentId) }
        },
        {
            $graphLookup: {
                from: 'agents',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'managedBy',
                as: "subAgents"
            }
        },
        {
            $project: {
                _id: 0,
                subAgents: 1
            }
        },
        { $unwind: "$subAgents" },
        {
            $replaceRoot: { newRoot: "$subAgents" }
        },
        {
            $project: {
                password: 0
            }
        }
    ])

    return res.json(agents)
}

exports.me = async (req, res) => {
    return res.json(req.agent)
}