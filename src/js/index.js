//import "bootstrap/dist/css/bootstrap"

import "../css/index.css"
import "../scss/index.scss"

import {render} from "../ts/index"

import "../images/logo.png";
import "../images/car1.jpg";
import "../images/car2.jpg";
import "../images/car3.jpg";

import "../images/test.svg";

let id = 2202258;

render();

const url = `http://localhost:3000/api/messagesww/${id}`;

function timbioz() {
    alert(url);
}

document.getElementById ("timbioz").addEventListener ("click", timbioz, false);

function myFunction() {
  alert("Hello! I fwd an alert box!!");
}