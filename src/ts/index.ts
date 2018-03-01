interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

export function render() {

    var div = document.createElement('div');
    div.className = "alert alert-success";
    div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

    document.body.appendChild(div);
}
