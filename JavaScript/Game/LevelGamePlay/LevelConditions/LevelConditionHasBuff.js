"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionHasBuff = void 0);
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHasBuff extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    if (!e) return !1;
    const l = e.BuffId;
    var t = Global_1.Global.BaseCharacter;
    if (!t) return !1;
    var t = t.CharacterActorComponent.Entity;
    let n = t.CheckGetComponent(157);
    if (!n) return !1;
    let a = n.GetBuffTotalStackById(BigInt(l)) > 0;
    n = t.CheckGetComponent(171);
    return (
      n &&
        (a ||=
          (n.GetFormationBuffComp()?.GetBuffTotalStackById(BigInt(l)) ?? 0) >
          0),
      e.Compare === "Eq" ? a : !a
    );
  }
}
exports.LevelConditionHasBuff = LevelConditionHasBuff;
// # sourceMappingURL=LevelConditionHasBuff.js.map
