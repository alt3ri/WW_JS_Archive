"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareVar = void 0);
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareVar extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, a) {
    if (!e) return !1;
    var t = e.Var1,
      l = e.Var2;
    if (t.Type !== l.Type) return !1;
    var s = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a),
      n = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(l, a);
    if (void 0 === s || void 0 === n) return !1;
    switch (e.Compare) {
      case "Eq":
        return s === n;
      case "Ne":
        return s !== n;
      case "Ge":
        return n <= s;
      case "Gt":
        return n < s;
      case "Le":
        return s <= n;
      case "Lt":
        return s < n;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCompareVar = LevelConditionCompareVar;
//# sourceMappingURL=LevelConditionCompareVar.js.map
