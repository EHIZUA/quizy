export default function random(array) {
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
  return shuffledArray;
}
