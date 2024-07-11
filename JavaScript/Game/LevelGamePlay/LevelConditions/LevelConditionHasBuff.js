"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionHasBuff = void 0);
const Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHasBuff extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    if (!e) return !1;
    var l = e.BuffId,
      t = Global_1.Global.BaseCharacter;
    if (!t) return !1;
    var t = t.CharacterActorComponent.Entity,
      n = t.CheckGetComponent(159);
    if (!n) return !1;
    let a = 0 < n.GetBuffTotalStackById(BigInt(l));
    n = t.CheckGetComponent(174);
    return (
      n &&
        (a ||=
          0 <
          (n.GetFormationBuffComp()?.GetBuffTotalStackById(BigInt(l)) ?? 0)),
      "Eq" === e.Compare ? a : !a
    );
  }
}
exports.LevelConditionHasBuff = LevelConditionHasBuff;
//# sourceMappingURL=LevelConditionHasBuff.js.map
