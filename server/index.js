
require('dotenv').config();
const express = require('express');
require('./db/db.js');
const path = require('path');
const port = 4000;
const app = express();
const MatchModel = require('./models/matchModel');




app.listen(port, () => {
    console.log(`Server Launch on Port : ${port}`);
});

const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use(express.json());

//route pour l'affichage des tempaltes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'index.html'));
});

app.get('/match', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'listMatchs.html'));
});

app.get('/formulaire', (req, res) => {
    res.sendFile(path.join(__dirname, distDir, 'pages/', 'matchForm.html'));
});



// Route pour le CRUD - READ
app.get('/listMatch', (req, res) => {
    MatchModel.find({}).then((doc) => {

        res.send(doc);
    });
});

//CRUD - DELETE

app.delete('/listMatch/delete', (req, res) => {

    const id = req.body._id
    MatchModel.findByIdAndRemove(id).exec();
    res.send('Supprimé !');
});


// CRUD - CREATE

app.post('/ajoutMatch', async (req, res) => {
    const { teamA, imgA, teamB, imgB, groupe, stade } = req.body;
    let newMatch = {};
    newMatch.teamA = teamA;
    newMatch.imgA = imgA;
    newMatch.teamB = teamB;
    newMatch.imgB = imgB;
    newMatch.groupe = groupe;
    newMatch.stade = stade;

    let matchModel = new MatchModel(newMatch);

    await matchModel.save();

    res.json(matchModel);
})


// CRUD Update 
app.put('/updateMatch', (req, res) => {

    MatchModel.findById(req.body.id, (err, doc) => {


        doc.teamA = req.body.teamA;
        doc.teamB = req.body.teamB;
        doc.imgA = req.body.imgA;
        doc.imgB = req.body.imgB;
        doc.stade = req.body.stade;
        doc.groupe = req.body.groupe;
        doc.save();
        res.send(doc);
    });
});


