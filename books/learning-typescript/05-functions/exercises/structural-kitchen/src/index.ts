// Write your createKitchen function here! ✨
// You'll need to export it so the tests can run it.

export type Ingredients = {
  breads: number;
  fruits: number;
  sauces: number;
  vegetables: number;
};

export type RecipeResultFailed = {
  succeeded: false;
}

export type RecipeResultSucceeded = {
  succeeded: true;
  newStock: Ingredients;
}

export type RecipeResult = RecipeResultFailed | RecipeResultSucceeded

export type Recipe = (ingredients: Ingredients) => RecipeResult;

export type Kitchen = {
  announce: () => string;
  clean: (time?: number) => void;
  purchase: (expense: number) => boolean;
  prepare: (recipe: Recipe) => boolean;
}

export type Cleaner = (dirt: number, time?: number) => number;

export type Supplier = (expense: number) => Ingredients;

export function createKitchen(
  budget: number,
  cleaner: Cleaner,
  supplier: Supplier
): Kitchen {
  let dirt = 0;
  let stock = {
    breads: 0,
    fruits: 0,
    sauces: 0,
    vegetables: 0
  }

  const announce = () =>
    `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`;

  const clean = (time?: number) => {
    dirt = cleaner(dirt, time);
  }

  const purchase = (expense: number) => {
    if (expense > budget) {
      return false;
    }

    const supplies = supplier(expense);
    budget -= expense;

    stock.breads += supplies.breads;
    stock.fruits += supplies.fruits;
    stock.sauces += supplies.sauces;
    stock.vegetables += supplies.vegetables;

    return true;
  }

  const prepare = (recipe: Recipe) => {
    if (dirt >= 100) {
      return false;
    }

    const result = recipe(stock);
    dirt += 1;

    if (result.succeeded) {
      stock = result.newStock;
    }

    return result.succeeded;
  }

  return {
    announce: announce,
    clean: clean,
    purchase: purchase,
    prepare: prepare
  }
}
