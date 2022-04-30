let accountView = document.querySelector('#accountView')
let accountAddView = document.querySelector('#accountAddView')
let editAccountAddView = document.querySelector('#editAccountAddView')
let accountViewTbody = document.querySelector('#accountView tbody')
let accountEditDelView = document.querySelector('#accountEditDelView');
let accountEditDelViewBtn = document.querySelector('[href="#accountEditDelView"]');
let accountEditDelViewTbody = document.querySelector('#accountEditDelView tbody');
let accountAddViewBtn = document.querySelector('[data-id="save"]');
let searchInput = document.querySelector('[type="search"]');




let allViews = document.querySelectorAll('.view');
let accountCountry = document.querySelector('#accountCountry')
let addUser = document.querySelector('#addUser')
let addDeposit = document.querySelector('#addDeposit')
let addCard = document.querySelector('#addCard')

let eaccountCountry = document.querySelector('#eaccountCountry')
let eaddUser = document.querySelector('#eaddUser')
let eaddDeposit = document.querySelector('#eaddDeposit')
let eaddCard = document.querySelector('#eaddCard')




searchInput.addEventListener('input', searchAccount);
window.addEventListener("hashchange", changeView);
accountAddViewBtn.addEventListener("click", saveAccountBtn);
window.addEventListener('beforeunload', save);


function save() {
    return localStorage.accounts = JSON.stringify(db);
}


  



createAccountTable(db);
function createAccountTable(searchedAcc) {
    if(!searchedAcc) {
        searchedAcc = db;
    }
        let text = [];
        searchedAcc.forEach(account => {    
    
            text += `
            <tr>
                <th scope="row">${account.id}</th>
                <td>${account.user}</td>
                <td>${account.deposit}</td>
                <td>${account.card}</td>
                <td>${account.country}</td>
            </tr>
            
            
            
            `.trim();
    
        })
        accountViewTbody.innerHTML = text;
    

  
    
}

function changeView() {
let currentHash = location.hash.substring(1);
console.log(currentHash);
allViews.forEach(view => {
    if (currentHash === view.id) {
        view.style.display = "block";
    }else{
        view.style.display = "none";
    }
})

}
function randomId() {
    // let rand = Math.floor(Math.random() * 100);
    // return rand.toString()
    let rand;
    let unique = false;
    while(!unique) {
        unique = true;
        rand = Math.floor(Math.random()*10000);
        db.forEach(user => {
            if(user.id === rand) {
                unique = false
            }
        })
    }
    return rand.toString();

}
function saveAccountBtn() {
    let text = {
         id: randomId(),
        user: addUser.value,
        deposit: addDeposit.value,
        card: addCard.value,
        country: accountCountry.value,
    };
    db.push(text);
  
    createAccountTable();



    location.hash = "#accountView";

  addUser.value = "";
   addDeposit.value = "";
   addCard.value = "";
    accountCountry.value = "serbia";
   
}
optionChange();
function optionChange() {
    let text = "";
    countries.forEach(country => {
        text += `
        <option value="${country}">${country}</option>
        `
    })
    accountCountry.innerHTML = text;
}

accountEditDelViewBtn.addEventListener("click", createEditTable);


function createEditTable() {
    let text = [];
    db.forEach((account, index) => {    

        text += `
        <tr>
            <th scope="row">${account.id}</th>
            <td>${account.user}</td>
            <td>${account.deposit}</td>
            <td>${account.card}</td>
            <td>${account.country}</td>
            <td><button class="btn btn-warning edit" data-id="${account.id}">Edit</button></td>
            <td><button class="btn btn-danger" id="delete" data-id="${account.id}">Delete</button></td>
        </tr>
        
        
        
        `.trim();

    })
    accountEditDelViewTbody.innerHTML = text;
    deleteAccount()
    editAccount()
}



function deleteAccount() {
    let deleteBtn = document.querySelectorAll('#delete');
    console.log(deleteBtn);
    deleteBtn.forEach(btnDelete => {
        btnDelete.addEventListener('click', function(e) {
           let id = e.target.dataset.id
           let accFilter = db.findIndex(acc => acc.id === id);
            db.splice(accFilter,1);
            createAccountTable();
            location.hash = "#accountView";
        });
    })
 
}

function editAccount() {
    let editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(btnEdit => {
        btnEdit.addEventListener('click', function(e) {
            let id = e.target.dataset.id
            let accFilter = db.find(acc => acc.id === id);
            console.log(db);
            console.log(accFilter);
            eoptionChange(accFilter.country);
             eaddUser.value =accFilter.user
             eaddDeposit.value =accFilter.deposit
             eaddCard.value =accFilter.card
            location.hash = "#editAccountAddView";
            editAccountSave(accFilter);
        })
    })
}



function editAccountSave(accFilter) {
    let eAccountAddViewBtn = document.querySelector('#esave');
    // btnEdit.removeEventListener('click',function())
    console.log(eAccountAddViewBtn);
    eAccountAddViewBtn.addEventListener('click', function() {
        accFilter.user = eaddUser.value
        accFilter.deposit = eaddDeposit.value
        accFilter.card =  eaddCard.value
        accFilter.country =  eaccountCountry.value
        createAccountTable()
        location.hash = "#accountView";
    });
   
}

function eoptionChange(Ecountry) {
    let text = "";
    countries.forEach(country => {
        text += `
        <option value="${country}" ${country === Ecountry ? "selected" : ""}>${country}</option>
        `
    })
    return eaccountCountry.innerHTML = text;
}

function searchAccount() {
    let term = this.value;
    let currentDb = db.filter(el => {
        return el.user.indexOf(term) !== -1 || el.card.indexOf(term) !== -1 || el.country.indexOf(term) !== -1
   
        
    })
    createAccountTable(currentDb)
}