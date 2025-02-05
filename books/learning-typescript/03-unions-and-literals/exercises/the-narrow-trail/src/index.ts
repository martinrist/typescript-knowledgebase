export function runCommands() {
  let availableResource: 'food' | 'water' | undefined;
  let food = 5;
  let water = 5;

  for (let day = 1; day <= 7; day++) {
    const roll = Math.floor(Math.random() * 6) + 1;

    switch (roll) {
      case 1:
        availableResource = 'food';
        break;

      case 2:
        availableResource = 'water';
        break;

      default:
        switch (availableResource) {
          case 'food':
            food += roll;
            availableResource = undefined;
            break;

          case 'water':
            water += roll;
            availableResource = undefined;
            break;

          case undefined:
            availableResource = roll % 2 === 0 ? 'food': 'water';
            break;
        }
    }

    food--;
    water--;

    if (food === 0 || water === 0) {
      return false;
    }
  }

  return true;
}
