"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetBlackBoardValue = void 0);
const UE = require("ue");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const TsAiController_1 = require("../../AI/Controller/TsAiController");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetBlackBoardValue extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    const a = e.get("Tag");
    const l = UE.KismetStringLibrary.Conv_StringToInt64(e.get("GenId"));
    const o = e.get("Type");
    const t = e.get("Key");
    const n = e.get("Value");
    var e = new Array();
    if (
      (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(l, e),
      e.length)
    ) {
      const s = FNameUtil_1.FNameUtil.GetDynamicFName(a);
      for (const i of e) {
        let c = CharacterController_1.CharacterController.GetActor(i);
        c instanceof TsBaseCharacter_1.default &&
          c?.Tags.FindIndex(s) !== -1 &&
          (c = c.GetController()) instanceof TsAiController_1.default &&
          c.AiController &&
          (c = c?.AiController?.CharAiDesignComp?.Entity?.Id) &&
          this.PRe(c, o, t, n);
      }
    }
  }
  PRe(e, r, a, l) {
    switch (r.toLowerCase()) {
      case "string":
        BlackboardController_1.BlackboardController.SetStringValueByEntity(
          e,
          a,
          l,
        );
        break;
      case "int":
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          e,
          a,
          parseInt(l),
        );
        break;
      case "float":
        BlackboardController_1.BlackboardController.SetFloatValueByEntity(
          e,
          a,
          parseFloat(l),
        );
        break;
      case "boolean":
        BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
          e,
          a,
          l.toLowerCase() === "true",
        );
    }
  }
}
exports.LevelEventSetBlackBoardValue = LevelEventSetBlackBoardValue;
// # sourceMappingURL=LevelEventSetBlackBoardValue.js.map
