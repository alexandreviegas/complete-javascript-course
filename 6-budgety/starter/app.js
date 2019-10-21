var budgetController = (function() {

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = null;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        this.percentage = totalIncome > 0 ? Math.round(this.value / totalIncome * 100) : null;
    };


    var calculateTotal = function(type) {
        var total = 0;
        data.items[type].forEach(function(current){
            total += current.value;
        });

        data.totals[type] = total;
    };

    var data = {
        items: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: null
    };


    return {
        getItems: function() {
            return data.items;
        },

        getTotals: function() {
            return data.totals;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage,
            };
        },

        calculateBudget: function() {
            //sum totals type value
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate budget
            data.budget = data.totals.inc - data.totals.exp;
            data.percentage = data.totals.inc > 0 ? Math.round(data.totals.exp / data.totals.inc * 100) : null;
        },

        calculatePercentages: function() {
            data.items.exp.forEach(function(current){
                current.calculatePercentage(data.totals.inc);
            });
        },

        addItem: function(type, description, value) {
            var items, id, newItem;

            //get Items array accordlying with 'inc' or 'exp' type
            items = data.items[type];
            //get next id
            id = items.length === 0 ? 1 : items[items.length - 1].id + 1;
            //create the new Item accordlying with 'inc' or 'exp' type
            if (type === 'inc') {
                newItem = new Income(id, description, value);
            }else if (type === 'exp'){
                newItem = new Expense(id, description, value);
            }

            //add new item to its items type array
            items.push(newItem);

            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.items[type].map(function(item){
                return item.id
            });

            index = ids.indexOf(id);
            if (index !== -1) {
                data.items[type].splice(index, 1);
            }
        }
    };

})();

var uiController = (function() {

    var DOMSelectors = {
        month: '.budget__title--month',
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        buttonAdd: '.add__btn',
        incomeListContainer: '.income__list',
        expensesListContainer: '.expenses__list',
        titleMonth: '.budget__title--month',
        budgetValue: '.budget__value',
        budgetIncomeValue: '.budget__income--value',
        budgetExpensesValue: '.budget__expenses--value',
        budgetExpensesPercentage: '.budget__expenses--percentage',
        itemPercentage: '.item__percentage',
        container: '.container',
    };

    function getInputValue(selector) {
        return document.querySelector(selector).value;
    };

    function formatCurrency(number, type){
        var split, int, dec, formatted;


        number = number.toFixed(2);
        split = number.split('.');

        int = split[0];
        dec = split[1];

        formatted = '';

        var start = int.length > 3 ? int.length%3 : int.length;
        if (start > 0) {
            formatted = int.substr(0, start);
            formatted += int.length > 3 ? ',' : '';
            int = int.substr(start, int.length);
        }

        while(int.length >= 3) {
            formatted += int.substr(0, 3);
            formatted += (int.length / 3 > 1) ? ',' : '';
            int = int.substr(3, int.length);
        }

        return (number > 0 ? (type === 'inc' ? '+ ' : '- ') : '') + formatted + '.' + dec;
    };


    return {
        getInputData: function() {
            return {
                type: getInputValue(DOMSelectors.inputType),
                description: getInputValue(DOMSelectors.inputDescription),
                value: parseFloat(getInputValue(DOMSelectors.inputValue)),
            };
        },

        addListItem: function(item, type) {
            var templateHtml, finalHtml, element;

            if (type === 'inc') {
                element = DOMSelectors.incomeListContainer;
                templateHtml = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp') {
                element = DOMSelectors.expensesListContainer;
                templateHtml = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            finalHtml = templateHtml.replace('%id%', item.id);
            finalHtml = finalHtml.replace('%description%', item.description);
            finalHtml = finalHtml.replace('%value%', formatCurrency(item.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', finalHtml);

        },

        removeListItem: function(selectorId) {
            var element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },

        clearInputFields: function() {
            var fields;

            fields = Array.prototype.slice.call(document.querySelectorAll(DOMSelectors.inputDescription + ', ' + DOMSelectors.inputValue));
            fields.forEach(function(current, index, array){
                current.value = "";
            });

            fields[0].focus();
        },

        showMonth: function() {
            var months, now, year, month;
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            now = new Date();
            year = now.getFullYear();
            month = months[now.getMonth()];

            document.querySelector(DOMSelectors.month).textContent = month + ' ' + year;
        },

        showPercentages: function(expenses) {
            var fields = document.querySelectorAll(DOMSelectors.itemPercentage);
            for(var i = 0; i < fields.length; i++) {
                if (expenses[i].percentage && expenses[i].percentage > 0) {
                    fields[i].textContent = expenses[i].percentage + '%';
                }else{
                    fields[i].textContent = '---';
                }
            }
        },

        showBudget: function(budget) {
            document.querySelector(DOMSelectors.budgetValue).textContent = formatCurrency(budget.budget, budget.budget > 0 ? 'inc' : 'exp');
            document.querySelector(DOMSelectors.budgetIncomeValue).textContent = formatCurrency(budget.totalIncome, 'inc');
            document.querySelector(DOMSelectors.budgetExpensesValue).textContent = formatCurrency(budget.totalExpenses, 'exp');
            if (budget.percentage && budget.percentage > 0) {
                document.querySelector(DOMSelectors.budgetExpensesPercentage).textContent = budget.percentage + '%';
            }else{
                document.querySelector(DOMSelectors.budgetExpensesPercentage).textContent = '---';
            }
        },

        changeInputColors: function(event) {
            var fields;
            fields = document.querySelectorAll(
                DOMSelectors.inputType + ', ' +
                DOMSelectors.inputDescription + ', ' +
                DOMSelectors.inputValue);
            for (var i = 0; i < fields.length; i++) {
                fields[i].classList.toggle('red-focus');
            }
            
            document.querySelector(DOMSelectors.buttonAdd).classList.toggle('red');
        },

        getDOMSelectors: function() {
            return DOMSelectors;
        }
    };

})();

var appController = (function(budgetController, uiController) {

    var setupEventListeners = function() {
        var DOMSelectors = uiController.getDOMSelectors();

        document.querySelector(DOMSelectors.buttonAdd).addEventListener('click', addItem);
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(DOMSelectors.container).addEventListener('click', removeItem);

        document.querySelector(DOMSelectors.inputType).addEventListener('change', changeInputColors);
    };

    var updateBudget = function() {
        //calculate budget
        budgetController.calculateBudget();

        var budget = budgetController.getBudget();

        uiController.showBudget(budget);

        updatePercentages();
    };

    var updatePercentages = function() {
        budgetController.calculatePercentages();
        uiController.showPercentages(budgetController.getItems().exp);
    }

    var addItem = function() {
        var inputData, item;

        //Read input
        inputData = uiController.getInputData();

        if(inputData.description !== '' && !isNaN(inputData.value) && inputData.value > 0) {
            //Create new Item
            item = budgetController.addItem(inputData.type, inputData.description, inputData.value);
            //Show the item on list
            uiController.addListItem(item, inputData.type);
            //Clear input fields
            uiController.clearInputFields();

            updateBudget();
        }

    };

    var removeItem = function(event) {
        var domItemId, splitId, id, type;
        domItemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (domItemId) {
            splitId = domItemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);
            //Remove item from budget list and update budget
            budgetController.deleteItem(type, id);
            // uiController.removeListItem();
            uiController.removeListItem(domItemId);
            //Update budget values and UI
            updateBudget();
        }
    };

    var changeInputColors = function(event) {
        uiController.changeInputColors(event);
    };

    return {
        init: function() {
            setupEventListeners();
            updateBudget();
            uiController.showMonth();
            console.log('Application has been started');
        }
    };

})(budgetController, uiController);

appController.init();