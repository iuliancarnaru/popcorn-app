export const average = <T extends number>(arr: T[]) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);
