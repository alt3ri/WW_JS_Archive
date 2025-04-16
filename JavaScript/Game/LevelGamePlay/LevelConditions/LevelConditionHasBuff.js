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
      a = t.CheckGetComponent(172);
    if (!a) return !1;
    let s = 0 < a.GetBuffTotalStackById(l);
    a = t.CheckGetComponent(188);
    return (
      a &&
        (s ||= 0 < (a.GetFormationBuffComp()?.GetBuffTotalStackById(l) ?? 0)),
      "Eq" === e.Compare ? s : !s
    );
  }
}
exports.LevelConditionHasBuff = LevelConditionHasBuff;
//# sourceMappingURL=LevelConditionHasBuff.js.map
