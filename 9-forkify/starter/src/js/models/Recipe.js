import axios from 'axios';
import { api } from '../config';
import { Fraction } from 'fractional';

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.isFavourite = false;
    }

    async getRecipe() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const key = '41be29ff6ef8931da684e4d5925d0d07';
        try {
            const res = await axios(`${api}get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }
    
    calcPrepareTime() {
        //Assuming that we need 15 minutes for each 3 ingredients
        const amount = this.ingredients.length;
        const periods = Math.ceil(amount / 3);
        this.prepareTime = periods * 15;
    }
    
    calcServings() {
        this.servings = 4;
    }
    
    parseIngredients() {
        
        const longUnits = ['tablespoon', 'tablespoons', 'teaspoons', 'teaspoon', 'ounce', 'ounces', 'cups', 'pounds'];
        const shortUnits = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'cup', 'pound'];
        const units = [...shortUnits, 'kg', 'g'];
        
        const multiplier = this.servings/4;
        
        const newIngredients = this.ingredients.map(element => {
            //1 - uniform units
            let ingredient = element.toLowerCase();
            
            longUnits.forEach( (unit, index) => {
                ingredient = ingredient.replace(unit, shortUnits[index]);
            });
            
            //2 - remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            //3 - parse ingredients into count, unit and ingredient itself
            const splitted = ingredient.split(' ');
            
            const unit = splitted.filter(word => shortUnits.includes(word))[0];
            
            if (unit) {
                
                const parsed = ingredient.split(` ${unit} `);
                ingredient = {
                    unit,
                    amount: (multiplier * eval(parsed[0].split('-').join(' ').split(' ').join('+'))).toFixed(2),
                    description: parsed[1]
                }
                
            } else if (parseInt(splitted[0], 10)) {
                
                ingredient = {
                    unit: '',
                    amount: multiplier * parseInt(splitted[0], 10),
                    description: splitted.slice(1).join(' ')
                }
                
            } else {
                
                ingredient = {
                    unit: '',
                    amount: multiplier * 1,
                    description: ingredient
                }
            }
            
            if (ingredient.amount) {
                ingredient.fraction = new Fraction(ingredient.amount).toString();
            }
            
            return ingredient;
        });
        
        this.ingredients = newIngredients;
    }
    
    updateServings(type) {
        const newServings = type === 'inc' ? this.servings + 1 : (this.servings > 1 ? this.servings - 1 : 1);
        
        this.ingredients.forEach(el => {
            el.amount *= (newServings / this.servings);
            el.fraction = new Fraction(el.amount).toString();
        })
        
        this.servings = newServings;
    }
}