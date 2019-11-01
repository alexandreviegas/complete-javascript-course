import { elements } from './base';

export const focusSearchInput = () => elements.searchInput.focus();
export const searchParam = () => elements.searchInput.value;
export const clearSearchInput = () => elements.searchInput.value = '';
export const clearResultList = () => elements.resultList.innerHTML = '';
export const clearPagesContainer = () => elements.pagesContainer.innerHTML = '';

export const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const newTitle = [];
        title.split(' ').reduce((length, current) => {
           if (length + current.length <= limit) {
               newTitle.push(current);
           }
           return length + current.length
        }, 0);
        
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    let html = `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}"> <!-- results__link--active -->
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    
    elements.resultList.insertAdjacentHTML("beforeend", html);
}

const renderButton = (page, direction) => {
    const current = direction === 'prev' ? --page : ++page;
    const html = `
        <button class="btn-inline results__btn--${direction}" data-page="${current}">
            <span>Page ${current}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;
    elements.pagesContainer.insertAdjacentHTML("beforeend", html);
}

const renderButtons = (page, size, limit) => {
    const pages = Math.ceil(size / limit);
    if (page === 1 && pages > 1) {
        //Render only next button
        renderButton(page, 'next');
    } else if (page > 1 && page < pages) {
        //Render next and prev button
        renderButton(page, 'prev');
        renderButton(page, 'next');
    } else if (page === pages) {
        //Render only prev button
        renderButton(page, 'prev');
    }
}

export const renderRecipes = (recipes, page = 1, limit = 10) => {
    //render current page results
    const begin = (page - 1) * limit;
    const end = begin + limit;
    
    recipes.slice(begin, end).forEach(renderRecipe);
    
    //render pagnation buttons
    clearPagesContainer();
    renderButtons(page, recipes.length, limit);
}

export const highlightSelectedRecipe = recipeId => {
    Array.from(document.querySelectorAll('.results__link')).forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${recipeId}"]`).classList.add('results__link--active');
}
