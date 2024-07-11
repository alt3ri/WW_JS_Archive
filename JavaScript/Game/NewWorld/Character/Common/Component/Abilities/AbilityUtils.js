"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbilityUtils = void 0);
class AbilityUtils {
  static GetLevelValue(t, e, r) {
    return t && t.length !== 0
      ? e >= 1 && e - 1 < t.length
        ? t[e - 1]
        : e === 0
          ? t[0]
          : t[t.length - 1]
      : r;
  }
  static GetArrayValue(t, e, r) {
    return !t || t.length === 0 || e < 0
      ? r
      : e < t.length
        ? t[e]
        : t[t.length - 1];
  }
  static GetAttrValue(t, e, r) {
    if (!t) return 0;
    switch (r) {
      case 2:
        return t.GetCurrentValue(e) - t.GetBaseValue(e);
      case 1:
        return t.GetCurrentValue(e);
      default:
        return t.GetBaseValue(e);
    }
  }
}
exports.AbilityUtils = AbilityUtils;
// # sourceMappingURL=AbilityUtils.js.map
