"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPortal extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Distance = 0),
      (this.EffectDieTime = -0),
      (this.EffectBornTime = -0),
      (this.ActiveModel = !1),
      (this.WaitTime = -0),
      (this.EffectId = 0),
      (this.StartMaterialControllerData = void 0),
      (this.EndMaterialControllerData = void 0),
      (this.FollowPointName = "FollowPoint"),
      (this.FollowPoint = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsEffectDieTime = -0),
      (this.TsEffectBornTime = -0),
      (this.TsActiveModel = !1),
      (this.TsWaitTime = -0),
      (this.TsStartMaterialControllerData = void 0),
      (this.TsEndMaterialControllerData = void 0),
      (this.TsFollowPointName = "");
  }
  Constructor() {
    super.Constructor(),
      (this.EffectId = 0),
      (this.FollowPoint = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsEffectDieTime = -0),
      (this.TsEffectBornTime = -0),
      (this.TsActiveModel = !1),
      (this.TsWaitTime = -0),
      (this.TsStartMaterialControllerData = void 0),
      (this.TsEndMaterialControllerData = void 0),
      (this.TsFollowPointName = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsEffectDieTime = this.EffectDieTime),
      (this.TsEffectBornTime = this.EffectBornTime),
      (this.TsActiveModel = this.ActiveModel),
      (this.TsWaitTime = this.WaitTime),
      (this.TsStartMaterialControllerData = this.StartMaterialControllerData),
      (this.TsEndMaterialControllerData = this.EndMaterialControllerData),
      (this.TsFollowPointName = this.FollowPointName));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables(),
      t.AiController
        ? this.TsActiveModel || this.FinishExecute(!1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]);
  }
  ReceiveTickAI(i, t, s) {
    i = i.AiController;
    if (i) {
      var e = i.CharActorComp;
      this.FollowPoint =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
          i.CharAiDesignComp.Entity.Id,
          this.TsFollowPointName,
        );
      let t = Vector_1.Vector.ZeroVectorDouble;
      this.FollowPoint &&
        (t = new UE.VectorDouble(
          this.FollowPoint.X,
          this.FollowPoint.Y,
          this.FollowPoint.Z,
        )),
        this.TsActiveModel
          ? this.TsWaitTime <= Time_1.Time.WorldTime &&
            (e.Actor.CharRenderingComponent.RemoveMaterialControllerData(
              this.EffectId,
            ),
            e.Actor.CharRenderingComponent.AddMaterialControllerData(
              this.TsStartMaterialControllerData,
            ),
            (this.TsActiveModel = !1),
            (i = UE.KismetMathLibrary.D_ProjectPointOnToPlane(
              e.ActorLocation,
              t,
              new UE.VectorDouble(0, 0, 1),
            )),
            (i = UE.KismetMathLibrary.D_FindLookAtRotation(i, t)),
            e.SetActorLocationAndRotation(t, i, "行为树节点.巡逻", !0),
            (this.TsWaitTime = this.TsEffectBornTime + Time_1.Time.WorldTime))
          : this.TsWaitTime <= Time_1.Time.WorldTime &&
            t &&
            t !== Vector_1.Vector.ZeroVectorDouble &&
            ((this.TsActiveModel = !0),
            (this.EffectId =
              e.Actor.CharRenderingComponent.AddMaterialControllerData(
                this.TsEndMaterialControllerData,
              )),
            (this.TsWaitTime = this.TsEffectDieTime + Time_1.Time.WorldTime));
    } else this.FinishExecute(!1);
  }
}
exports.default = TsTaskPortal;
//# sourceMappingURL=TsTaskPortal.js.map
