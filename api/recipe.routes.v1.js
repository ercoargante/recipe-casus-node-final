//
// ./api/v1/recipe.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Recipe = require('../model/recipe.model');

//
// Geef een lijst van alle recipes.
//
routes.get('/recipes', function (req, res) {
    res.contentType('application/json');

    Recipe.find({})
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

//
// Retourneer 1 specifieke recipe. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/recipes/23
//
routes.get('/recipes/:id', function (req, res) {
    res.contentType('application/json');

    Recipe.findOne({
            _id: req.params.id
        })
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

//
// Voeg een recipe toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/recipes
//
routes.post('/recipes', function (req, res) {
    res.contentType('application/json');

    // console.dir(req.body);

    const recipe = new Recipe(req.body)
        .save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

//
// Wijzig een bestaande recipe. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de recipes mee te geven: via de request parameters (doen we hier)
// of als property in de request body. De id is de _id van het mongo document. 
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/recipes/5a19413d3a2dfe08c81f4917
//
routes.put('/recipes/:id', function (req, res) {
    var updatedRecipe = req.body;
    var id = req.params.id;

    // Voer de update uit en vraag het nieuwe document terug
    Recipe.findByIdAndUpdate(id, updatedRecipe, {
            new: true
        })
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

//
// Verwijder een bestaande recipe.
// Er zijn twee manieren om de id van de recipes mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/recipes/23
//
routes.delete('/recipes/:id', function (req, res) {
    var id = req.params.id;

    // Voer de update uit en vraag het nieuwe document terug
    Recipe.findByIdAndRemove(id)
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

module.exports = routes;