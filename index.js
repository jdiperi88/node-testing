function add(num1, num2) {
  if (!num1 || !num2) {
    throw new error("no arguments passed");
  }
  return num1 + num2;
}

module.exports = {
  add
};
