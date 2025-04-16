"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventVehicleSprint = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleSprint extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.Jh = void 0), (this.OPt = void 0);
  }
  ExecuteNew(e, t) {
    if (((this.OPt = e), this.OPt))
      switch (this.OPt.TargetVehicle.Type) {
        case "Current":
          (this.Jh = this.occ()), this.acc();
          break;
        case "Appointed":
          this.CreateWaitEntityTask(this.OPt.TargetVehicle.VehicleId);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", [
              "Type",
              this.OPt.TargetVehicle.Type,
            ]);
      }
  }
  ExecuteWhenEntitiesReady() {
    this.scc(this.OPt.TargetVehicle), this.acc();
  }
  scc(e) {
    switch (e.Type) {
      case "Current":
        this.Jh = this.occ();
        break;
      case "Appointed":
        this.Jh = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          e.VehicleId,
        )?.Entity;
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 50, "不支持的目标类型", [
            "Type",
            e.Type,
          ]);
    }
  }
  occ() {
    if (Global_1.Global.BaseCharacter)
      return Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
        226,
      )?.VehicleEntity;
  }
  acc() {
    if (this.Jh) {
      var e = this.Jh?.GetComponent(230);
      if (e)
        switch (e.VehicleType) {
          case "Gongduola":
          case "FishingBoat":
            e?.TryEnterSprint(!0);
        }
    }
  }
}
exports.LevelEventVehicleSprint = LevelEventVehicleSprint;
//# sourceMappingURL=LevelEventVehicleSprint.js.map
