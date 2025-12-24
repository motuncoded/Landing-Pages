const fullName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('myForm');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (event) => {
event.preventDefault();
let messages = [];

if (fullName.value === '' || fullName.value == null) {
    messages.push('Name is required');
}
if(email.value === "" || email.value === null){
    messages.push('Email is required');
}
if(password.value === "" || password.value == null){
    messages.push('Password is required');
}else if(password.value.length < 6 ){
    messages.push("Password must not be less than 6")
}
if (messages.length > 0) {  
    event.preventDefault();
    errorElement.innerText = messages.join(', ');
}
})