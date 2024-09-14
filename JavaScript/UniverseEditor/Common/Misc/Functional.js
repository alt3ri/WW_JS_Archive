"use strict";
function once(t) {
  let o = !1,
    r = void 0;
  return function e() {
    return o || ((o = !0), (r = t())), r;
  };
}
function isIterable(e) {
  return !!e && "object" == typeof e && "function" == typeof e[Symbol.iterator];
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isIterable = exports.once = void 0),
  (exports.once = once),
  (exports.isIterable = isIterable);
//# sourceMappingURL=Functional.js.map
