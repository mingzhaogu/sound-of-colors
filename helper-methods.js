export const randomColor = function() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return (`rgba(${r},${g}, ${b}, ${Math.random()})`);
};
