"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventChangeToVision = void 0);
const Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeToVision extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var s;
    e &&
      ((s = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity)
        .GetComponent(3)
        .ClearInput(),
      s.GetComponent(203)?.AddTag(-1697149502),
      (s = s.GetComponent(39))) &&
      (s.EndOwnerAndFollowSkills(),
      s.BeginSkill(e.Id, { Reason: "LevelEventChangeToVision.ExecuteNew" }));
  }
}
exports.LevelEventChangeToVision = LevelEventChangeToVision;
//# sourceMappingURL=LevelEventChangeToVision.js.map
