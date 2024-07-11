"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionDistanceLess = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelConditionDistanceLess extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams) return !1;
    const s = e.LimitParams.get("StartTarget");
    const n = e.LimitParams.get("EndTargetTag");
    var e = e.LimitParams.get("Distance");
    if (!s || !n) return !1;
    let a = r;
    return (
      !!(a =
        s !== "Trigger"
          ? LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(s)
          : a) &&
      !!(r = LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(n)) &&
      a.GetDistanceTo(r) < parseFloat(e)
    );
  }
}
exports.LevelConditionDistanceLess = LevelConditionDistanceLess;
// # sourceMappingURL=LevelConditionDistanceLess.js.map
