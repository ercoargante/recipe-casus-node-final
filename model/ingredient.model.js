const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Een shoppinglist is door de Angular frontend gedefinieerd als een lijst van ingredienten. 
// Omdat er maar 1 shoppinglist in de hele applicatie is, kies ik hier voor de allersimpelste 
// aanpak: een shoppinglist is een verzameling Ingredients. 
// In het echt zou je bv. een shoppinglist per gebruiker willen, en referenties naar ingredients daarin.
const IngredientSchema = new Schema({
    name: {
        type: String,
        unique: false
    },
    amount: Number
});

const Ingredient = mongoose.model('ingredients', IngredientSchema);

// Voeg dummy item toe, maar alleen als collectie leeg is.
const tomaten = new Ingredient({
    name: 'Tomaten uit de database',
    amount: 5
});
const pizzabodem = new Ingredient({
    name: 'Pizzabodem uit de database',
    amount: 2
});

Ingredient.find({})
    .then((result) => {
        result.length === 0 ? (tomaten.save() && pizzabodem.save()) : null
    })
    .catch((error) => console.log(error));

module.exports = Ingredient;