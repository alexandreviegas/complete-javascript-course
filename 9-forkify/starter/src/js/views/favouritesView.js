import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const renderItem = item => {
    const html = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.img}" alt="${item.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(item.title)}</h4>
                    <p class="likes__author">${item.author}</p>
                </div>
            </a>
        </li>
    `;
    
    elements.favouritesContainer.insertAdjacentHTML('beforeend', html);
}

export const deleteItem = id => {
    const element = document.querySelector(`.likes__link[href="#${id}"]`).parentNode;
    if (element) {
        element.parentNode.removeChild(element);
    }
}

export const toggleFavouritesMenu = favouritesCount => {
    elements.favouritesMenu.style.visibility = favouritesCount > 0 ? 'visible' : 'hidden';
}