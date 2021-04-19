let emm;

class Contact {
    constructor(firstNameOrObject, lastName, email) {
        if (typeof firstNameOrObject === "object") {
            Object.assign(this, firstNameOrObject);
        } else {
            this.firstName = firstNameOrObject;
            this.lastName = lastName;
            this.email = email;
        }
    }
    toString() {
        return `${contact.firstName} ${contact.lastName} <${contact.email}>`; 
    }
}

let emmanuil = new Contact("Emmanuil", "Vardanian", "em.vardany@gmail.com");

console.log('in main', '' + emmanuil);

let colors = { red: "#ff0000", black: "#000000", white: "#ffffff"};

for (let color of Object.keys(colors)){
    console.log(color + ": " + colors[color])
}

// console.log(printContact(emmanuil));

