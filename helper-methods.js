export const randomColor = function(opacity) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = opacity || Math.random() * 0.5 + 0.5;
  return (`rgba(${r},${g}, ${b}, ${a})`);
  // return (`rgb(${r},${g}, ${b})`);
};

const keyboard = [
  'a', 'w', 's', 'e', 'd', 'f','t','g',
  'y', 'h', 'u', 'j', 'k', 'o','l', 'p', ';'
];

export const keyIndex = (key) => {
  return keyboard.indexOf(key);
};

export const setInitX = {
  0: 4/3,
  1: 2,
  2: 5/2,
  3: 3,
  4: 11/3,
  5: 9/2,
  6: 5,
  7: 11/2,
  8: 6,
  9: 13/2,
  10: 7,
  11: 23/3,
  12: 25/3,
  13: 9,
  14: 19/2,
  15: 10,
  16: 32/3
};

export const mapToWhite = {
  0: 1,
  2: 2,
  4: 3,
  5: 4,
  7: 5,
  9: 6,
  11: 7,
  12: 8,
  14: 9,
  16: 10
};

export const mapToBlack = {
  1: 1,
  3: 2,
  6: 4,
  8: 5,
  10: 6,
  13: 8,
  15: 9
};
