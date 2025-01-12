"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetBlackBoardValue = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  TsAiController_1 = require("../../AI/Controller/TsAiController"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetBlackBoardValue extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    var a = e.get("Tag"),
      l = UE.KismetStringLibrary.Conv_StringToInt64(e.get("GenId")),
      o = e.get("Type"),
      t = e.get("Key"),
      n = e.get("Value"),
      e = new Array();
    if (
      (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(l, e),
      e.length)
    ) {
      var s = FNameUtil_1.FNameUtil.GetDynamicFName(a);
      for (const i of e) {
        var c = CharacterController_1.CharacterController.GetActor(i);
        c instanceof TsBaseCharacter_1.default &&
          -1 !== c?.Tags.FindIndex(s) &&
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
          "true" === l.toLowerCase(),
        );
    }
  }
}
exports.LevelEventSetBlackBoardValue = LevelEventSetBlackBoardValue;
//# sourceMappingURL=LevelEventSetBlackBoardValue.js.map
