import { elements } from './base';

export const renderItem = item => {
    const html = `
        <li class="shopping__item" data-item-id="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.amount}" step="${item.amount}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.description}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    
    elements.shoppingContainer.insertAdjacentHTML('beforeend', html);
}

export const deleteItem = id => {
    const element = document.querySelector(`.shopping__item[data-item-id="${id}"]`)
    if (element) {
        element.parentNode.removeChild(element);
    }
}