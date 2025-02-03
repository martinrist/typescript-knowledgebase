"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Keyboard {
    name = 'Keyboard';
    price = 20;
    getCategories() {
        return ['Computing', 'Peripherals'];
    }
}
function save(data) {
    localStorage.setItem('Product', JSON.stringify(data));
}
const mic = {
    name: 'Microphone',
    price: 67
};
const microphone = {
    name: 'Microphone',
    price: 67
};
