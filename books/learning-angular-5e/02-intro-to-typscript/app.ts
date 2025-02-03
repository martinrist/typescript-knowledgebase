import { User } from "./user";
import { Customer } from "./customer";

const title = 'Hello TypeScript!';

const account: User | Customer = new Customer("John", "Doe");

if (account instanceof Customer) {
    const taxNo  = account.taxNumber;
} else {
    const name = account.getFullname();
}

console.log(account);