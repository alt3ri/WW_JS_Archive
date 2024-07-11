"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.GameUtils = void 0);
class GameUtils {
  static ConvertToArray(r, t) {
    var o = new Array();
    for (let e = 0; e < r; e++) o.push(t(e));
    return o;
  }
  static ConvertToMap(r, t, o) {
    var a = new Map();
    for (let e = 0; e < r; e++) a.set(t(e), o(e));
    return a;
  }
}
exports.GameUtils = GameUtils;
//# sourceMappingURL=GameUtils.js.map
