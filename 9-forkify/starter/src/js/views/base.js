export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultContainer: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    prevButton: document.querySelector('.results__btn--prev'),
    nextButton: document.querySelector('.results__btn--next'),
    pagesContainer: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe'),
    ingredientsContainer: document.querySelector('.recipe__ingredient-list'),
    shoppingContainer: document.querySelector('.shopping__list'),
    favouritesContainer: document.querySelector('.likes__list'),
    favouritesMenu: document.querySelector('.likes__icon'),
};

export const elementSelectors = {
    loader: 'loader',
    prevButton: 'results__btn--prev',
    nextButton: 'results__btn--next',
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementSelectors.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const removeLoader = () => {
    const loader = document.querySelector(`.${elementSelectors.loader}`)
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};