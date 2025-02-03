"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProduct() {
    return 'Keyboard';
}
function getFullname(firstName, lastName) {
    return `${this.firstName} ${this.lastName}`;
}
function printFullname(firstName, lastName) {
    console.log(`${this.firstName} ${this.lastName}`);
}
function addtoCart(productId, quantity) {
    const product = {
        id: productId,
        qty: quantity ?? 1
    };
}
