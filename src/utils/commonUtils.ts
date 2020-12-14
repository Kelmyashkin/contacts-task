const ids: { [key: string]: number } = {};
export function generateId(name: string) {
  if (ids[name] === undefined) {
    ids[name] = 0;
  }

  return ++ids[name];
}
