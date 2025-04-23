import type { SortingGenerator } from './types';

export const bubbleSort = function* (arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
	let sorted = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { access: [j, j + 1], sound: j + 1 };
      if (arr[j] > arr[j + 1]) {
        sorted = false;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
	if (sorted) return;
  }
};
