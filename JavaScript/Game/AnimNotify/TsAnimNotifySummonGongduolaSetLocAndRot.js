"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifySummonGongduolaSetLocAndRot extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(o, e) {
    const r = o.GetOwner(),
      n = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonLocation,
      l = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonRotation;
    o = ModelManager_1.ModelManager.GongduolaSummonModel?.SummonGravityDir;
    if (r instanceof TsBaseVehicle_1.default && n && l && o) {
      const m = r.VehicleActorComponent.Entity;
      var t = m.GetComponent(233);
      if (!t?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Temp",
              31,
              "[TsAnimNotifySummonGongduolaSetLocAndRot] moveComp is invalid",
              ["EntityId", m?.Id],
            ),
          !1
        );
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        m,
        !1,
        "GongduolaSummonController.AfterPlayCancelSummonAnim",
        !1,
      ),
        ControllerHolder_1.ControllerHolder.GongduolaSummonController.StopCancelSummonAnim(
          m,
        ),
        o.IsZero() || t.SetGravityDirect(o),
        TimerSystem_1.TimerSystem.Delay(() => {
          r.VehicleActorComponent.SetActorLocationAndRotation(
            n.ToUeVector(),
            l.ToUeRotator(),
            "TsAnimNotifySummonGongduolaSetLocAndRot",
          ),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              r.VehicleActorComponent.Entity,
              !0,
              "GongduolaSummonController.BeforePlaySummonAnim",
              !1,
            ),
            (ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation =
              void 0),
            (ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation =
              void 0),
            ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(
              m,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Temp",
                31,
                "[ChTest]TsAnimNotifySummonGongduolaSetLocAndRot",
              );
        }, 500);
    }
    return !0;
  }
}
exports.default = TsAnimNotifySummonGongduolaSetLocAndRot;
//# sourceMappingURL=TsAnimNotifySummonGongduolaSetLocAndRot.js.map
