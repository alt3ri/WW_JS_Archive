"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ServerGmController_1 = require("../../../World/Controller/ServerGmController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPlayMontage extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Montage = void 0),
      (this.MontagePath = ""),
      (this.ExpressionId = 0),
      (this.LoopDuration = 0),
      (this.RepeatTimes = 0),
      (this.KeepMontageWhenEnd = !1),
      (this.MaskInteract = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMontage = ""),
      (this.TsMaskInteract = !1),
      (this.TsLoopDuration = 0),
      (this.TsRepeatTimes = 0),
      (this.TsExpressionId = 0),
      (this.TsKeepMontageWhenEnd = !1),
      (this.InteractComponent = void 0),
      (this.PlayingMontageId = -1),
      (this.Entity = void 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsMontage = ""),
      (this.TsMaskInteract = !1),
      (this.TsLoopDuration = 0),
      (this.TsRepeatTimes = 0),
      (this.TsExpressionId = 0),
      (this.TsKeepMontageWhenEnd = !1),
      (this.InteractComponent = void 0),
      (this.PlayingMontageId = -1),
      (this.Entity = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMontage = this.Montage.ToAssetPathName()),
      "" === this.TsMontage && (this.TsMontage = this.MontagePath),
      (this.TsMaskInteract = this.MaskInteract),
      (this.TsLoopDuration = this.LoopDuration),
      (this.TsRepeatTimes = this.RepeatTimes),
      (this.TsExpressionId = this.ExpressionId),
      (this.TsKeepMontageWhenEnd = this.KeepMontageWhenEnd));
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i = t.AiController;
    i
      ? ((this.Entity = i.CharActorComp.Entity),
        ServerGmController_1.ServerGmController.AnimalDebug &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug PlayMontage",
            ["Tree", this.TreeAsset?.GetName()],
            ["TsMontage", this.TsMontage],
          ),
        "" === this.TsMontage
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "BehaviorTree",
                29,
                "播放蒙太奇未配置",
                ["ConfigID", this.Entity?.GetComponent(0)?.GetPbDataId()],
                ["BehaviorTree", this.TreeAsset.GetName()],
              ),
            this.FinishExecute(!0))
          : ((this.InteractComponent = this.Entity.GetComponent(195)),
            this.TsMaskInteract &&
              this.InteractComponent &&
              this.InteractComponent.SetInteractionState(
                !1,
                "TsTaskPlayMontage ReceiveExecuteAI",
              ),
            this.PlayMontageByPerformComp()))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!0));
  }
  OnAbort() {
    this.TsMaskInteract &&
      this.InteractComponent &&
      this.InteractComponent.SetInteractionState(
        !0,
        "TsTaskPlayMontage OnClear",
      ),
      (this.InteractComponent = void 0),
      this.Entity?.GetComponent(45)?.VolatileMontageStopByLoad(
        3,
        this.PlayingMontageId,
        this.TsKeepMontageWhenEnd ? 1 : 0,
      ),
      (this.PlayingMontageId = -1);
  }
  PlayMontageByPerformComp() {
    var t = ServerGmController_1.ServerGmController.AnimalDebug,
      s = this.Entity.GetComponent(45);
    (this.PlayingMontageId = s.VolatileMontagePlayByLoad(
      3,
      this.TsMontage,
      (t) => {
        this.Entity?.GetComponent(
          185,
        )?.ExpressionController?.ChangeFaceForExpression(
          t,
          this.TsExpressionId,
        );
      },
      () => {
        ServerGmController_1.ServerGmController.AnimalDebug &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage3"),
          this.FinishExecute(!0);
      },
      this.TsLoopDuration,
      this.TsRepeatTimes,
    )),
      t &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage2", [
          "PlayingMontageId",
          this.PlayingMontageId,
        ]),
      this.PlayingMontageId < 0 && this.FinishExecute(!0);
  }
}
exports.default = TsTaskPlayMontage;
//# sourceMappingURL=TsTaskPlayMontage.js.map
