export default class Favourites {
    
    constructor() {
        this.items = [];
    }
    
    addItem(recipe) {
        this.items.push(recipe);
        //Persist it on localStorage
        this.persistDataOnLocalStorage()
    }
    
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
        //Persist it on localStorage
        this.persistDataOnLocalStorage()
    }
    
    countItems() {
        return this.items.length;
    }
    
    persistDataOnLocalStorage() {
        localStorage.setItem('favourites', JSON.stringify(this.items));
    }
    
    readDataFromStorage() {
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        if(favourites) {
            this.items = favourites;
        }
    }
}