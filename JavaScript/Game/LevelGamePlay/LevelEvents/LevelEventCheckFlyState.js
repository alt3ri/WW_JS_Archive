"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCheckFlyState = void 0);
const Global_1 = require("../../Global");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventCheckFlyState extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    let l;
    const t = Global_1.Global.BaseCharacter;
    t &&
      (t.CharacterActorComponent.Entity.GetComponent(158).MoveState ===
      CharacterUnifiedStateTypes_1.ECharMoveState.Glide
        ? (l = e.get("Success")) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
            l,
            t,
          )
        : (l = e.get("Failure")) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
            l,
            t,
          ));
  }
}
exports.LevelEventCheckFlyState = LevelEventCheckFlyState;
// # sourceMappingURL=LevelEventCheckFlyState.js.map
