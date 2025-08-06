const TicketSubject = require("../models/TicketSubject")
const mongoose = require("mongoose");
const findRecursive = require("../utils/utils").findRecursive;
const ObjectId = mongoose.Types.ObjectId;

exports.getTicketSubjects = async (req, res) => {
  try {
    const query = [
      {
        $graphLookup: {
          from: "ticketsubjects",
          startWith: "$parentId",
          connectFromField: "parentId",
          connectToField: "_id",
          as: "ancestors",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          parentId: 1,
          ancestors: 1,
        },
      },
    ];

    // // if (req.agent.role !== "admin") {
    // query.unshift({
    //   $match: {
    //     departmentId: new ObjectId(req.agent.departmentId),
    //   },
    // });
    // // }
    const ticketSubjects = await TicketSubject.aggregate(query);
    return res.status(200).json(ticketSubjects);
  } catch (error) {
    console.error("Error fetching ticket subjects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFullSubjectPath = async (req, res) => {
  const { subjectId } = req.params;
  const fullPath = await findRecursive(subjectId, TicketSubject);

  return res.send(fullPath);
};