export const cropFamilies = {
	cactus: "Cactaceae",
	cassava: "Euphorbiaceae",
	chia: "Lamiaceae",
};

// Write your isCropName function here! ✨
// You'll need to export it so the tests can run it.

export function isCropName(name: string): name is keyof typeof cropFamilies {
  return name in cropFamilies;
}
