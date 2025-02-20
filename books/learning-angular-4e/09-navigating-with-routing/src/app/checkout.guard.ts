import {CanDeactivateFn} from "@angular/router";
import {CartComponent} from "./cart/cart.component";

export const checkoutGuard: CanDeactivateFn<CartComponent> = () => {
  const confirmation = confirm('Are you sure you want to leave?');
  return confirmation;
}
