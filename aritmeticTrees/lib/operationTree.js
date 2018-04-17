'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _shuntingYard = require('./shuntingYard.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var node = function node(value, level) {
    var left = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var right = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return left && right ? { value: value, level: level, left: left, right: right } : { value: value, level: level };
};

var buildNode = function buildNode(tokens, level) {
    var _tokens = _toArray(tokens),
        head = _tokens[0],
        tail = _tokens.slice(1);

    return _ramda2.default.test(/[+,*,\-,\/]/, head) ? buildTree(tokens, level + 1) : [node(head, level + 1), tail];
};

var buildTree = function buildTree(tokens, level) {
    var _tokens2 = _toArray(tokens),
        value = _tokens2[0],
        mTail = _tokens2.slice(1);

    var _buildNode = buildNode(mTail, level),
        _buildNode2 = _slicedToArray(_buildNode, 2),
        left = _buildNode2[0],
        lTail = _buildNode2[1];

    var _buildNode3 = buildNode(lTail, level),
        _buildNode4 = _slicedToArray(_buildNode3, 2),
        right = _buildNode4[0],
        rTail = _buildNode4[1];

    return [node(value, level, left, right), rTail];
};

var createTree = function createTree(expr) {
    var tokens = (0, _shuntingYard.infixToPrefix)(expr);

    var _buildTree = buildTree(tokens, 0),
        _buildTree2 = _slicedToArray(_buildTree, 1),
        tree = _buildTree2[0];

    return tree;
};

var mustTree = {
    left: {
        left: null,
        right: null,
        value: '1'
    },
    right: {
        left: null,
        right: null,
        value: '2'
    },
    value: '+'
};

var tree = createTree("(1 + (5 * (2 - 1))) + (6 / 2)");

console.log(JSON.stringify(tree, null, 2));