import {FavoritesService} from './favorites.service';
import {ProductsService} from '../products.service';

export function favoritesFactory(isFavorite: boolean) {
  return () => {
    if (isFavorite) {
      return new FavoritesService();
    } else {
      return new ProductsService();
    }
  }
}
