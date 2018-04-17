'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * https://www.youtube.com/watch?v=UK16ttNfGSk
 * https://cs.nyu.edu/courses/Fall12/CSCI-GA.1133-002/notes/InfixToPostfixExamples.pdf
 * Algorithm: https://www.youtube.com/watch?v=OVFwgYrMShw
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * https://www.youtube.com/watch?v=y_snKkv0gWc
 */

/**
 * Change parenthesis orientation
 * @param  {Array} expression.
 */
var changeParenthesis = function changeParenthesis(expression) {
  return expression.map(function (value) {
    if (value === ')') {
      return '(';
    } else if (value === '(') {
      return ')';
    }
    return value;
  });
};
/**
 * @param  {String} token. Get hierarchical level to
 * handle operations in stack
 */
var getPrecedence = function getPrecedence(token) {
  switch (token) {
    case '*':
    case '/':
      return 2;
    case '+':
    case '-':
      return 1;
    default:
      return 0;
  }
};
/**
 * @param  {String} token. Check if a token is a left o right parenthesis
 */
var isPts = function isPts(token) {
  return token === '(' || token === ')';
};

/**
 * @param  {Array} stack. Array of arithmetic operators.
 */
var comparePrecedence = function comparePrecedence(stack) {
  var stackValueB = stack.pop();
  var stackValueA = stack.pop();

  var evalA = getPrecedence(stackValueA);
  var evalB = getPrecedence(stackValueB);

  if (evalA > evalB || evalA === evalB) {
    stack.push(stackValueB);
    return stackValueA;
  } else {
    stack.push(stackValueA);
    stack.push(stackValueB);
  }
};

/**
 * @param  {Array} stack. Arithmetic tokens
 * @param  {Array} output. Postfix result array.
 */
var checkStack = function checkStack(stack, output) {
  if (stack.length > 1) {
    if (!isPts(stack[stack.length - 2]) && !isPts(stack[stack.length - 1])) {
      var operator = comparePrecedence(stack);
      if (operator) output.push(operator);
    }
  }
};

/**
 * @param  {Array} stack.
 * @param  {Array} output.
 */
var parenthesisOperatorsToStack = function parenthesisOperatorsToStack(stack, output) {
  var index = stack.lastIndexOf('(');
  var body = stack.slice(0, index);
  var tail = stack.slice(index + 1, stack.length);
  tail.reverse().map(function (token) {
    return output.push(token);
  });
  return body;
};

/**
 * @param  {String} value. Current value from input array
 * @param  {Array} stack.
 * @param  {Array} output.
 */
var checkAndUpdateStack = function checkAndUpdateStack(value, stack, output) {
  // get arithmetic expression and push it on output array.
  // pop all surrounding operators over parenthesis
  if (value === ')') {
    return parenthesisOperatorsToStack(stack, output);
  }

  stack.push(value);
  return stack;
};

/**
 * @param  {Array} expression. Input array of tokens and numeric values
 */
var shuntingYard = function shuntingYard(expression) {

  var stack = [];
  var output = [];

  expression.map(function (value, i) {
    // require('child_process').spawnSync("read _ ", {shell: true, stdio: [0, 1, 2]}) to debugger
    if (isNaN(value)) {
      stack = checkAndUpdateStack(value, stack, output);
    } else {
      output.push(value);
    }
    checkStack(stack, output);
    // console.log('temp ' + i, stack, output)
  });

  if (stack.length > 0) {
    var orderStack = stack.reverse();
    output = [].concat(_toConsumableArray(output), _toConsumableArray(orderStack));
  }

  return output;
};

/**
 * @param  {string} expression. infix expression
 */
var infixToPostfix = function infixToPostfix(expression) {
  var input = expression.replace(/\s/g, "");
  input = [].concat(_toConsumableArray(input));
  return shuntingYard(input);
};

/**
 * @param  {string} expression. infix expression
 */
var infixToPrefix = function infixToPrefix(expression) {
  var input = expression.replace(/\s/g, "");
  input = changeParenthesis([].concat(_toConsumableArray(input))).reverse();
  return shuntingYard(input).reverse();
};

exports.infixToPostfix = infixToPostfix;
exports.infixToPrefix = infixToPrefix;