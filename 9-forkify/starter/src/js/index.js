import Search from './models/Search';
import Recipe from './models/Recipe';
import Shopping from './models/Shopping';
import Favourites from './models/Favourites';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingView from './views/shoppingView';
import * as favouritesView from './views/favouritesView';
import { elements, renderLoader, removeLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list
 * - Liked recipes
 */
const state = {};

//////////////////////////////
// Search Controller        //
//////////////////////////////
const controlSearch = async () => {
    // 1 - get query from view
    const query = searchView.searchParam();

    if (query) {
        // 2 - new Search object and add to state
        state.search = new Search(query);

        // 3 - prepare UI for results
        searchView.clearSearchInput();
        searchView.clearResultList();
        renderLoader(elements.resultContainer);
        state.currentPage = 1;
        
        try {
            // 4 - search for recipes
            await state.search.getResults();
            
            removeLoader();
            
            //5 - render results on UI
            searchView.renderRecipes(state.search.recipes);

        } catch (error) {
            console.log(error);
            removeLoader();
        }

        
    }
}

//////////////////////////////
// Recipe Controller        //
//////////////////////////////

const controlRecipe = async () => {
    //1 - Get Id from URL
    const id = window.location.hash.substr(1);
    if (id) {
        //2 - prepare UI for update
        recipeView.clearRecipeContainer();
        renderLoader(elements.recipeContainer);
        
        //3 - get new recipe object
        state.recipe = new Recipe(id);
        
        try {
            
            //4 - get recipe data
            await state.recipe.getRecipe();
            
            //5 - calculate time and serving
            state.recipe.calcPrepareTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            
            //6 - render recipe
            recipeView.renderRecipe(state.recipe);
            if (state.search) {
                searchView.highlightSelectedRecipe(state.recipe.id);
            }
            
            if (state.favourites.items.find(el => el.id === state.recipe.id)){
                state.recipe.isFavourite = true;
                recipeView.toggleFavouriteButton(state.recipe.isFavourite);
            }
            
            removeLoader();

        }catch (error) {
            console.log(error);
            
            removeLoader();
        }
        
    }
    
};

//////////////////////////////
// Shopping Controller      //
//////////////////////////////

const shoppingControl = async () => {
    
    if (!state.shopping) {
        state.shopping = new Shopping();
    }
    
    state.recipe.ingredients.forEach(el => {
        const item = state.shopping.addItem(el.amount, el.unit, el.description);
        shoppingView.renderItem(item);
    });
}

//////////////////////////////
// Favourites Controller    //
//////////////////////////////

const favouritesControl = async () => {
    
    state.recipe.isFavourite = true;
    state.favourites.addItem(state.recipe);
    
    favouritesView.renderItem(state.recipe);
    recipeView.toggleFavouriteButton(state.recipe.isFavourite);
    favouritesView.toggleFavouritesMenu(state.favourites.countItems());
}


elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.pagesContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        searchView.clearResultList();
        renderLoader(elements.resultContainer);
        searchView.renderRecipes(state.search.recipes, parseInt(button.dataset.page, 10));
        removeLoader();
    }
});

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
window.addEventListener('load', async () => {
    state.favourites = new Favourites();
    await state.favourites.readDataFromStorage()
    favouritesView.toggleFavouritesMenu(state.favourites.countItems());
    state.favourites.items.forEach(el => favouritesView.renderItem(el));
});

elements.recipeContainer.addEventListener('click', event => {
    if (event.target.matches('.recipe__info-buttons-increase, .recipe__info-buttons-increase *')) {
        //increase the servings
        recipeView.clearRecipeContainer();
        state.recipe.updateServings('inc');
        recipeView.renderRecipe(state.recipe);
    }else if (event.target.matches('.recipe__info-buttons-decrease, .recipe__info-buttons-decrease *')) {
        //decrease the servings
        recipeView.clearRecipeContainer();
        state.recipe.updateServings('dec');
        recipeView.renderRecipe(state.recipe);
    }else if (event.target.matches('.recipe__btn__add_ingredients_to_shopping_list, .recipe__btn__add_ingredients_to_shopping_list *')) {
        //Add recipe ingredients to the shopping list
        shoppingControl();
    }else if (event.target.matches('.recipe__love, .recipe__love *')) {
        //Add the current recipe to the favourites list
        if (state.recipe.isFavourite){
            state.recipe.isFavourite = false;
            state.favourites.deleteItem(state.recipe.id);
            favouritesView.deleteItem(state.recipe.id);
            recipeView.toggleFavouriteButton(state.recipe.isFavourite);
            favouritesView.toggleFavouritesMenu(state.favourites ? state.favourites.countItems() : 0);
        } else {
            favouritesControl();
            recipeView.toggleFavouriteButton(state.recipe.isFavourite);
        }
    }
});

elements.shoppingContainer.addEventListener('click', event => {
    const button = event.target.closest('.shopping__delete');
    if (button) {
        const itemId = button.parentNode.dataset.itemId;
        state.shopping.deleteItem(itemId);
        shoppingView.deleteItem(itemId);
    }
});

elements.shoppingContainer.addEventListener('change', event => {
    const input = event.target;
    if (input) {
        const itemId = input.closest('.shopping__item').dataset.itemId;
        state.shopping.updateAmount(itemId, input.value);
    }
});

searchView.focusSearchInput();