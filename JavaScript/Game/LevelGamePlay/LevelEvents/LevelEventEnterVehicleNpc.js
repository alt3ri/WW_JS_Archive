"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnterVehicleNpc = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterVehicleNpc extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.OPt = void 0), (this.nx = void 0);
  }
  ExecuteNew(e, t) {
    (this.OPt = e),
      (this.nx = t),
      this.OPt && this.OPt.Target
        ? this.CreateWaitEntityTask(this.OPt.Target)
        : this.FinishExecute(!1);
  }
  ExecuteWhenEntitiesReady() {
    var e = this.OPt,
      t = this.nx;
    e && t ? this._bl(e, t) : this.FinishExecute(!1);
  }
  _bl(e, t) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity,
      s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        e.Target,
      )?.Entity;
    i
      ? (s = s?.GetComponent(230))
        ? (s.TryEnter(i, e.Seat), this.FinishExecute(!0))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Vehicle",
              50,
              "进入载具NPC时获取目标载具实体失败",
              ["TargetVehicle", e.Target],
            ),
          this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Vehicle", 50, "进入载具NPC时无法获取目标乘客"),
        this.FinishExecute(!1));
  }
}
exports.LevelEventEnterVehicleNpc = LevelEventEnterVehicleNpc;
//# sourceMappingURL=LevelEventEnterVehicleNpc.js.map
