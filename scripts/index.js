const users = [];

const onlyLettersPattern = /^[A-zА-яЁё]+$/;
const emailPattern = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

const usersTable = document.getElementById('table-body');
const addUserBtn = document.getElementById('add-user');

const nameInput = document.getElementById('name-input');
const surnameInput = document.getElementById('surname-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');

const validatedInputs = document.querySelectorAll(".validate-js");

addUserBtn.addEventListener("click", addUser);
validatedInputs.forEach(input => input.addEventListener("focus", clearError))

function getWinner() {
    const winner = users[Math.floor(Math.random()*users.length)];
    document.getElementById('winners').innerHTML = `${winner.name} ${winner.surname} | ${winner.email}`;
}

function addUser(e) {
    e.preventDefault();

    const inputValues = [
        validate(nameInput, 'Name', onlyLettersPattern),
        validate(surnameInput, 'Surname', onlyLettersPattern),
        validate(emailInput, 'Email', emailPattern)
    ]

    if(inputValues.some(inputValue => !!inputValue.error)) return

    const [name, surname, email] = inputValues

    users.push({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phoneInput.value || ' - '
    });
    createTable();
}

function createTable() {
    const usersHtml = users.map(user => `<tr>
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        </tr>`)
    usersTable.innerHTML = usersHtml.join('')
}

function validate(input, type, pattern) {
    const value = input.value
    let error
    switch(true){
        case !value : error = `${type} is required`; break;
        case !pattern.test(value): error = `Invalid ${type} format`; break;
        default: error = null
    }

    if(error) {
        input.className = 'validate-js error-input'
        input.parentNode.querySelector('span.error').innerHTML = error
        return { error }
    }
    return { value }
}

function clearError(e) {
    const focusedInput = e.target
    focusedInput.parentNode.querySelector('span.error').innerHTML = ''
    focusedInput.className = 'validate-js'
}
