// Write your groupRestaurants function here! ✨
// You'll need to export it so the tests can run it.
export interface Restaurant {
  city: string;
  name: string;
}

export interface GroupedRestaurants {
  [i: string]: string[];
}

export function groupRestaurants(restaurants: Restaurant[]) {
  const grouped: GroupedRestaurants = {};

  for (const { city, name } of restaurants) {
    if (city in grouped) {
      grouped[city].push(name);
    } else {
      grouped[city] = [name];
    }
  }

  return grouped;
}
