"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("./customer");
const title = 'Hello TypeScript!';
const account = new customer_1.Customer("John", "Doe");
if (account instanceof customer_1.Customer) {
    const taxNo = account.taxNumber;
}
else {
    const name = account.getFullname();
}
console.log(account);
