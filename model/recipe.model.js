const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    ingredients: [{
        _id: false,
        name: String,
        amount: Number
    }]
});

const Recipe = mongoose.model('recipe', RecipeSchema);

// Voeg dummy item toe, maar alleen als collectie leeg is.
const item = new Recipe({
    name: 'Tasty Avans Pizza',
    description: 'Vers van de server!',
    imagePath: 'http://www.picserver.org/pictures/pizza01-lg.jpg',
    ingredients: [{
        name: 'Server Burger',
        amount: 2
    }, {
        name: 'Mongo Tomaten',
        amount: 5
    }]
});

Recipe.find({})
    .then((result) => result.length === 0 ? item.save() : null)
    .catch((error) => console.log(error));

module.exports = Recipe;