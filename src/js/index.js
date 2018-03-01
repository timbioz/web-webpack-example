import "bootstrap/dist/css/bootstrap"

import "../css/index.css"
import "../scss/index.scss"

let id = 2202258;

const url = `http://localhost:3000/api/messagesww/${id}`;

function timbioz() {
    alert(url);
}

document.getElementById ("timbioz").addEventListener ("click", timbioz, false);

function myFunction() {
  alert("Hello! I fwd an alert box!!");
}