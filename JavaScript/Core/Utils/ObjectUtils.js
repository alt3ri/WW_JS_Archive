"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ueArrayToArray = exports.ObjectUtils = void 0);
const Long = require("../Define/Net/long");
const FNameUtil_1 = require("./FNameUtil");
const GameplayTagUtils_1 = require("./GameplayTagUtils");
const MathUtils_1 = require("./MathUtils");
class ObjectUtils {
  static CopyValue(e, a) {
    Object.keys(e).forEach((t) => {
      void 0 !== a[t] && (a[t] = e[t]);
    });
  }
  static DeepCopyValue(e, a) {
    Object.keys(e).forEach((t) => {
      e[t] instanceof Long
        ? void 0 !== a[t] && (a[t] = MathUtils_1.MathUtils.LongToBigInt(e[t]))
        : typeof e[t] === "object"
          ? ObjectUtils.DeepCopyValue(e[t], a[t])
          : void 0 !== a[t] && (a[t] = e[t]);
    });
  }
  static SettingValue(t, e) {
    for (const [a, r] of t) e[a] = r;
  }
  static IsValid(t) {
    return t?.IsValid() ?? !1;
  }
  static SoftObjectPathIsValid(t) {
    return !!t && !FNameUtil_1.FNameUtil.IsNothing(t.AssetPathName);
  }
  static SoftObjectReferenceValid(t) {
    return !!t && (t = t?.ToAssetPathName())?.length > 0 && t !== "None";
  }
  static GetGameplayTags(t) {
    const e = new Array();
    for (const r of t) {
      const a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(r);
      a && e.push(a);
    }
    return e;
  }
  static GetRandomArrayItem(e) {
    const a = e.length;
    if (a > 0) {
      let t = 0;
      return (
        a > 1 &&
          ((t = MathUtils_1.MathUtils.GetRandomRange(0, a)),
          (t = Math.floor(t)) === a) &&
          --t,
        e[t]
      );
    }
  }
}
function ueArrayToArray(e) {
  const a = e.Num();
  const r = [];
  for (let t = 0; t < a; t++) r.push(e.Get(t));
  return r;
}
(exports.ObjectUtils = ObjectUtils), (exports.ueArrayToArray = ueArrayToArray);
// # sourceMappingURL=ObjectUtils.js.map
