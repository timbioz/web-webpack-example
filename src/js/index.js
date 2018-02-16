import "../css/index.css"

let id = 1102;

const url = `http://localhost:3000/api/messagesww/${id}`;

function timbioz() {
    alert(url);
}

document.getElementById ("timbioz").addEventListener ("click", timbioz, false);

function myFunction() {
  alert("Hello! I fwd an alert box!!");
}