"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckIsUsingVehicle = void 0);
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsUsingVehicle extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var a = e?.Condition;
    if (a)
      switch (a.Type) {
        case "UsingVehicle":
          return this.Pi_(a, r);
        case "PlayerInVehicle":
          return this.wi_(a, r);
      }
    return !1;
  }
  Pi_(e, r) {
    let a = void 0;
    e.TargetVehicle
      ? (a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          e.TargetVehicle,
        )?.Entity)
      : r instanceof TsBaseVehicle_1.default
        ? (a = r.VehicleActorComponent.Entity)
        : r instanceof TsBaseCharacter_1.default &&
          (a = r.CharacterActorComponent.Entity);
    (r = a?.GetComponent(0)),
      (r = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(
        r.GetCreatureDataId(),
      ));
    if (0 < r?.length) for (const s of r) if (s.Seat === e.Seat) return !1;
    var r = a?.GetComponent(230);
    return !!r && ((r = r.IsVehicleInUse(e.Seat)), e.CheckIsBeingUsed ? r : !r);
  }
  wi_(e, r) {
    var a = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return (
      !!a &&
      !!(a = a.Entity.GetComponent(226)) &&
      ((a = a.VehicleType === e.VehicleType), e.CheckType ? a : !a)
    );
  }
}
exports.LevelConditionCheckIsUsingVehicle = LevelConditionCheckIsUsingVehicle;
//# sourceMappingURL=LevelConditionCheckIsUsingVehicle.js.map
