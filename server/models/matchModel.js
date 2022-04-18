const mongoose = require("mongoose");

const MatchModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    teamA: String,
    imgA: String,
    teamB: String,
    imgB: String,
    groupe: String,
    stade: String,

});

module.exports = mongoose.model('match', MatchModel);