// Write your createKitchen function here! ✨
// You'll need to export it so the tests can run it.

type Ingredients = {
  breads: number;
  fruits: number;
  sauces: number;
  vegetables: number;
}
export type Cleaner = (dirt: number, time?: number) => number;
export type Supplier = (expense: number) => Ingredients;
export type Recipe = (ingredients: Ingredients) =>
  { succeeded: false } | { succeeded: true, newStock: Ingredients };

type Kitchen = {
  announce: () => string;
  clean: (time?: number) => void;
  purchase: (expense: number) => boolean;
  prepare: (recipe: Recipe) => boolean;
}

export function createKitchen(
  budget: number,
  cleaner: Cleaner,
  supplier: Supplier,
): Kitchen {

  let dirt = 0;
  let stock = {
    breads: 0,
    fruits: 0,
    sauces: 0,
    vegetables: 0,
  };

  return {
    announce: () => `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`,
    clean: (time?: number) => {
      dirt = cleaner(dirt, time);
    },
    purchase: (expense: number) => {
      if (expense > budget) {
        return false;
      }
      const purchasedStock = supplier(expense);

      stock = {
        breads: stock.breads + purchasedStock.breads,
        fruits: stock.fruits + purchasedStock.fruits,
        sauces: stock.sauces + purchasedStock.sauces,
        vegetables: stock.vegetables + purchasedStock.vegetables,
      };
      budget -= expense;
      return true;
    },
    prepare: (recipe: Recipe) => {
      if (dirt >= 100) {
        return false;
      }
      dirt += 1;
      const recipeResult = recipe(stock);

      if (recipeResult.succeeded) {
        stock = recipeResult.newStock;
        return true;
      } else {
        return false;
      }
    },
  }
}
