"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isUndefined =
    exports.isSymbol =
    exports.isString =
    exports.isPromise =
    exports.isObject =
    exports.isNumber =
    exports.isFunction =
    exports.isError =
    exports.isDate =
    exports.isBoolean =
    exports.isAsyncFunction =
    exports.isArray =
      void 0);
const checkType = (s) => (e) =>
  Object.prototype.toString.call(e).slice(8, -1).toLowerCase() ===
  s.toLowerCase();
const isNumber = checkType("Number");
const isArray = ((exports.isNumber = isNumber), checkType("Array"));
const isBoolean = ((exports.isArray = isArray), checkType("Boolean"));
const isAsyncFunction =
  ((exports.isBoolean = isBoolean), checkType("AsyncFunction"));
const isPromise =
  ((exports.isAsyncFunction = isAsyncFunction), checkType("Promise"));
const isObject = ((exports.isPromise = isPromise), checkType("Object"));
const isUndefined = ((exports.isObject = isObject), checkType("Undefined"));
const isString = ((exports.isUndefined = isUndefined), checkType("String"));
const isSymbol = ((exports.isString = isString), checkType("Symbol"));
const isDate = ((exports.isSymbol = isSymbol), checkType("Date"));
const isError = ((exports.isDate = isDate), checkType("Error"));
const isFunction =
  ((exports.isError = isError), (e) => typeof e === "function");
exports.isFunction = isFunction;
// # sourceMappingURL=TypeCheckUtil.js.map
