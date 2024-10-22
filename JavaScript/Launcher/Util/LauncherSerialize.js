"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherJson = void 0);
class LauncherJson {
  static Stringify(r) {
    return JSON.stringify(r, (r, t) => {
      if ("bigint" == typeof t) return t.toString();
      if (t instanceof Set) {
        var e = new Array(t.size);
        let r = 0;
        for (const n of t) (e[r] = n), r++;
        return e;
      }
      return t;
    });
  }
  static Parse(r) {
    return JSON.parse(r);
  }
}
exports.LauncherJson = LauncherJson;
//# sourceMappingURL=LauncherSerialize.js.map
