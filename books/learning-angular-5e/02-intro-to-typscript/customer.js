"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const user_1 = require("./user");
class Customer extends user_1.User {
    taxNumber;
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
}
exports.Customer = Customer;
