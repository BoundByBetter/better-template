import { compareStringArrays } from './compareStringArrays';

describe('compareStringArrays', () => {
  it('should return true when comparing two identical string arrays', () => {
    const arrayA = ['apple', 'banana', 'cherry'];
    const arrayB = ['apple', 'banana', 'cherry'];

    const result = compareStringArrays(arrayA, arrayB);

    expect(result).toBe(true);
  });

  it('should return false when comparing two different string arrays', () => {
    const arrayA = ['apple', 'banana', 'cherry'];
    const arrayB = ['apple', 'orange', 'cherry'];

    const result = compareStringArrays(arrayA, arrayB);

    expect(result).toBe(false);
  });

  it('should return true when comparing two empty string arrays', () => {
    const arrayA: string[] = [];
    const arrayB: string[] = [];

    const result = compareStringArrays(arrayA, arrayB);

    expect(result).toBe(true);
  });

  it('should return false when comparing a string array with an empty array', () => {
    const arrayA = ['apple', 'banana', 'cherry'];
    const arrayB: string[] = [];

    const result = compareStringArrays(arrayA, arrayB);

    expect(result).toBe(false);
  });

  // Add more test cases as needed
});