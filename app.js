const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//Dummy transaction
const dummyTrans = [
    {id: 1, text: "Salary", amount: 1200},
    {id: 2, text: "T-Shirt", amount: -20},
    {id: 3, text: "Sunglass", amount: -50},
    {id: 4, text: "Camera", amount: -350},
];

let transactions = dummyTrans;

//Add transaction from user
function addTransaction(e){
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === ''){
        alert("Please add text and amount");
    }
    else {
       const transaction = {
           id: randNum(),
           text: text.value,
           amount: +amount.value
       } 
       transactions.push(transaction);
       addToDom(transaction);
       updateBalance();
       text.value = '';
       amount.value = '';
    }
}

//generate random number
function randNum(){
    return Math.floor(Math.random()*1000000000);
}

//removing transaction from history
function rmvtrans(id){
    // console.log(id);
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

//Add transactions to DOM
function addToDom(transaction){
    //get sign value
    const sign = transaction.amount < 0 ? '-' : '+';
    //create a list item
    const item = document.createElement('li');
    //add a class to the list
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    //generate html
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="rmvtrans(${transaction.id})">x</button>`;
    list.appendChild(item);
}

//Update balance
function updateBalance(){
    //extract amounts from transactions
    const amounts = transactions.map(transaction => transaction.amount);
    //calculate total balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //calculate income
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    //calculate expense
    const expense = Math.abs(amounts.filter(item => item < 0).reduce((acc,item) => (acc += item), 0).toFixed(2));
    //updating value into Dom
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

//Iniatilze app
function init(){
    list.innerHTML = '';
    transactions.forEach(addToDom);
    updateBalance();
}

init();

form.addEventListener('submit',addTransaction);



