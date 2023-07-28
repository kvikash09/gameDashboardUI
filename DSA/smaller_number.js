var smallerNumbersThanCurrent = function (nums) {
  let arr = [];

  for (i = 0; i < nums.length; i++) {
    let j = 0,
      count = 0;
    while (j < nums.length) {
      if (nums[i] > nums[j]) {
        count++;
      }
      j++;
    }
    arr.push(count);
  }
  return arr;
};

console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3]));
