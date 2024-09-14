"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckBuff = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t = UE.KismetStringLibrary.Conv_StringToInt(
        e.LimitParams.get("PbDataId"),
      ),
      a = UE.KismetStringLibrary.Conv_StringToInt(
        e.LimitParams.get("IsPlayer"),
      ),
      e = UE.KismetStringLibrary.Conv_StringToInt64(
        e.LimitParams.get("BuffId"),
      );
    if (a) {
      a = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
      const l = EntitySystem_1.EntitySystem.Get(a)?.GetComponent(160);
      return !!l?.GetBuffTotalStackById(e);
    }
    const l =
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        t,
      )?.Entity?.GetComponent(160);
    return !!l?.GetBuffTotalStackById(e);
  }
}
exports.LevelConditionCheckBuff = LevelConditionCheckBuff;
//# sourceMappingURL=LevelConditionCheckBuff.js.map
