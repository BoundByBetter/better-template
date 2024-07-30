export const compareStringArrays = (a: string[], b: string[]) => {
  const aString = a.join('');
  const bString = b.join('');
  if (aString < bString) {
      return false;
  }
  if (aString > bString) {
      return false;
  }
  return true;
};
