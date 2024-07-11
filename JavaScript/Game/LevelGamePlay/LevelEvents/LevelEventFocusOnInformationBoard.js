"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFocusOnInformationBoard = void 0);
const Global_1 = require("../../Global");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFocusOnInformationBoard extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, a) {
    const r = Global_1.Global.BaseCharacter;
    r &&
      r.CharacterActorComponent.Entity.CheckGetComponent(158).SetDirectionState(
        CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection,
      );
  }
}
exports.LevelEventFocusOnInformationBoard = LevelEventFocusOnInformationBoard;
// # sourceMappingURL=LevelEventFocusOnInformationBoard.js.map
