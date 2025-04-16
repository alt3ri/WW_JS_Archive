"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventVehicleMoveWithPathLine = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehicleMoveWithPathLine extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.Jh = void 0), (this.OPt = void 0);
  }
  ExecuteNew(e, t) {
    if (((this.OPt = e), this.OPt))
      switch (this.OPt.TargetVehicle.Type) {
        case "Current":
          (this.Jh = this.occ()), this.ncc();
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
    this.scc(this.OPt.TargetVehicle), this.ncc();
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
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("LevelEvent", 50, "获取玩家载具失败，找不到全局玩家角色");
  }
  ncc() {
    if (this.Jh)
      switch (this.OPt.ControlType.Type) {
        case "EnterPathMoving":
          var e = this.OPt.SplineEntityId,
            t = this.Jh.GetComponent(107);
          t?.SetExtraMoveParams(this.OPt.ControlType.ControlParams),
            t?.StartSplineMove(e, this.OPt.ControlType.Pattern);
          break;
        case "ExitPathMoving":
          (t = this.OPt.SplineEntityId), (e = this.Jh.GetComponent(107));
          e?.ResetExtraMoveParams(), e?.EndSplineMove(t);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          50,
          "设置载具控制状态失败，无法找到目标实体",
        );
  }
}
exports.LevelEventVehicleMoveWithPathLine = LevelEventVehicleMoveWithPathLine;
//# sourceMappingURL=LevelEventVehicleMoveWithPathLine.js.map
