"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    firstName = '';
    lastName = '';
    isActive = false;
    constructor(firstName, lastName, isActive = true) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
    }
    getFullname() {
        return `${this.firstName} ${this.lastName}`;
    }
    get active() {
        return this.isActive;
    }
}
exports.User = User;
