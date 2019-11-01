import uniqid from 'uniqid';

export default class Shopping {
    constructor() {
        this.items = [];
    }
    
    addItem(amount, unit, description) {
        const item = {
            id: uniqid(),
            amount,
            unit,
            description
        }
        
        this.items.push(item);
        
        return item;
    }
    
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }
    
    updateAmount(id, amount) {
        this.items.find(el => el.id === id).amount = amount;
    }
}