"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionMoveStateCheck = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const Global_1 = require("../../Global");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionMoveStateCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams || !r) return !1;
    r = Global_1.Global.BaseCharacter;
    if (!r) return !1;
    r = r.CharacterActorComponent.Entity.GetComponent(158);
    if (!r) return !1;
    switch (r.PositionState) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        if (e.LimitParams.get("Glide") === StringUtils_1.ONE_STRING) break;
        return !1;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        if (e.LimitParams.get("Climb") === StringUtils_1.ONE_STRING) break;
        return !1;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        if (e.LimitParams.get("Swim") === StringUtils_1.ONE_STRING) break;
        return !1;
    }
    return !0;
  }
}
exports.LevelConditionMoveStateCheck = LevelConditionMoveStateCheck;
// # sourceMappingURL=LevelConditionMoveStateCheck.js.map
