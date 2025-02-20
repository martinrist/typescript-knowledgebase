// Use this to simulate whether the user is logged in, to enable / disable the 'cart' route
import {CanActivateFn} from "@angular/router";

const loggedIn = true;

export const authGuard: CanActivateFn = () => loggedIn;
