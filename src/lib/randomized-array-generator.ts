export const generateArray = (size: number): number[] =>
  Array.from({ length: size }, (_value, index) => index + 1);

export const shuffle = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
};

export const stableShuffle = <T>(array: Array<T>, seed: number): Array<T> => {
  var random = pseudoRandom(seed, seed, seed, seed);
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
};

export const pseudoRandom = (a: number, b: number, c: number, d: number) : () => number => {
  a |= 9; b |= 17; c |= 789; d |= 777;
  let random = function() {    
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
  random();
  random();
  return random;
}
