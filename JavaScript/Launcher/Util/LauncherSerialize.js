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
    return JSON.parse(r, (r, e) => {
      if ("string" == typeof e && e.startsWith("__kr_long__"))
        return BigInt(e.substring("__kr_long__".length));
      if (e instanceof Array) {
        let r = !1,
          t = e.length - 1;
        for (; 0 <= t; ) {
          var n = e[t];
          "string" == typeof n &&
            "__kr_set__" === n &&
            ((r = !0), e.splice(t, 1)),
            t--;
        }
        return r ? new Set(e) : e;
      }
      if (e instanceof Object) {
        var t = new Set(Object.keys(e));
        if (t.has("__kr_map__")) {
          var _ = new Map();
          for (const o of t) "__kr_map__" !== o && _.set(o, e[o]);
          return _;
        }
      }
      return e;
    });
  }
}
exports.LauncherJson = LauncherJson;
//# sourceMappingURL=LauncherSerialize.js.map
