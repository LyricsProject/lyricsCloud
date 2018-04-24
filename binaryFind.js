function binaryFind(arr, member) {
  let left = 0;
  let right = arr.length;
  let insertionPoint = left + Math.floor((right - left) / 2);

  while (left < right) {
    if (member < arr[insertionPoint].letter) {
      right = insertionPoint;
    } else if (member > arr[insertionPoint].letter) {
      left = insertionPoint + 1;
    } else return insertionPoint;
    insertionPoint = left + Math.floor((right - left) / 2);
  }

  return insertionPoint;
}

module.exports = binaryFind;
