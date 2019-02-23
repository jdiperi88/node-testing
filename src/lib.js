const assert = {
  equal(actual, expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${actual} to equal ${expected}`);
    }
  }
};

const test = function(testTitle, callback) {
  try {
    callback();
    console.log(`Passed: ${testTitle}`);
  } catch (err) {
    console.error(`Failed: ${testTitle}`);
    throw err;
  }
};

module.exports = {
  test,
  assert
};
