//
// ./api/v1/ingredient.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Ingredient = require('../model/ingredient.model');

//
// Geef een lijst van alle ingredients.
//
routes.get('/ingredients', function (req, res) {
    res.contentType('application/json');

    Ingredient.find({})
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

//
// Retourneer 1 specifieke ingredient. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/ingredients/23
//
routes.get('/ingredients/:id', function (req, res) {
    res.contentType('application/json');

    Ingredient.findOne({
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
// Voeg een ingredient toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/ingredients
//
routes.post('/ingredients', function (req, res) {
    res.contentType('application/json');

    // console.dir(req.body);
    // const ingredient = new Ingredient(req.body)
    //     .save()
    //     .then(result => {
    //         res.status(200).send(result);
    //     })
    //     .catch((error) => {
    //         res.status(400).send(error);
    //     });

    Ingredient.create(req.body)
        .then(result => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send(error);
        });
});

//
// Wijzig een bestaande ingredient. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de ingredients mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/ingredients/5a19413d3a2dfe08c81f4917
//
routes.put('/ingredients/:id', function (req, res) {
    var updatedIngredient = req.body;
    console.dir(updatedIngredient);
    var id = req.params.id;
    console.log('id = ' + id);

    // Voer de update uit en vraag het nieuwe document terug
    Ingredient.findByIdAndUpdate(id, updatedIngredient, {
            new: true
        })
        .then(() => {
            console.log('-- update gelukt');
            return Ingredient.findById(id);
        })
        .then((result) => {
            console.dir(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send(error);
        });
});

//
// Verwijder een bestaande ingredient.
// Er zijn twee manieren om de id van de ingredients mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/ingredients/23
//
routes.delete('/ingredients/:id', function (req, res) {
    var id = req.params.id;

    // Voer de update uit en vraag het nieuwe document terug
    Ingredient.findByIdAndRemove(id)
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

module.exports = routes;