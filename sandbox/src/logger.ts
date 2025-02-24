export const log = (message: string) => {
  console.log(message);
};

export function formatMessage(message: string, ...params: string[]): string {
  let result = message;
  for (const param of params) {
    result = result.replace('%s', param);
  }
  return result;
}
