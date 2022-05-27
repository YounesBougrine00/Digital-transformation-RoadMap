const mongoose = require("mongoose");

const objectivesstrategicsSchema = new mongoose.Schema({});

const objectivesstrategics = mongoose.model(
    "objectivesstrategics",
    objectivesstrategicsSchema
);
module.exports = objectivesstrategics;