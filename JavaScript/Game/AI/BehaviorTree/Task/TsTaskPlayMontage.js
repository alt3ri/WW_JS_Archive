"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent"),
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
      (this.MaskInteract = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMontage = ""),
      (this.TsMaskInteract = !1),
      (this.IsPlayLoop = !1),
      (this.LoopMontage = !1),
      (this.TsLoopDuration = 0),
      (this.TsRepeatTimes = 0),
      (this.TsExpressionId = 0),
      (this.InteractComponent = void 0),
      (this.HasAborted = !1),
      (this.PlayingMontageId = 0),
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
      (this.TsExpressionId = this.ExpressionId));
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i,
      e,
      h = t.AiController;
    h
      ? ((this.Entity = h.CharActorComp.Entity),
        (h = ServerGmController_1.ServerGmController.AnimalDebug) &&
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
                30,
                "播放蒙太奇未配置",
                ["ConfigID", this.Entity?.GetComponent(0)?.GetPbDataId()],
                ["BehaviorTree", this.TreeAsset.GetName()],
              ),
            this.FinishExecute(!0))
          : ((this.InteractComponent = this.Entity.GetComponent(182)),
            this.TsMaskInteract &&
              this.InteractComponent &&
              this.InteractComponent.SetInteractionState(
                !1,
                "TsTaskPlayMontage ReceiveExecuteAI",
              ),
            (this.IsPlayLoop = 0 !== this.TsLoopDuration),
            (this.LoopMontage =
              -1 === this.TsLoopDuration || -1 === this.TsRepeatTimes),
            (i = this.Entity.GetComponent(39)),
            (e = new BasePerformComponent_1.PlayMontageConfig(
              this.RepeatTimes,
              this.LoopDuration,
              this.IsPlayLoop,
              this.LoopMontage,
            )),
            (this.HasAborted = !1),
            (this.PlayingMontageId = i.LoadAndPlayMontage(
              this.TsMontage,
              e,
              (t) => {
                this.TsExpressionId &&
                  t?.BodyMontage?.IsValid() &&
                  this.Entity?.GetComponent(
                    172,
                  )?.ExpressionController?.ChangeFaceForExpression(
                    t.BodyMontage,
                    this.TsExpressionId,
                  );
              },
              () => {
                ServerGmController_1.ServerGmController.AnimalDebug &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage3", [
                    "HasAborted",
                    this.HasAborted,
                  ]),
                  this.HasAborted || this.FinishExecute(!0);
              },
              () => (
                ServerGmController_1.ServerGmController.AnimalDebug &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage4"),
                !this.HasAborted
              ),
            )),
            h &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "AnimalDebug PlayMontage2", [
                "PlayingMontageId",
                this.PlayingMontageId,
              ]),
            this.PlayingMontageId < 0 && this.FinishExecute(!0)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
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
      (this.HasAborted = !0),
      this.Entity?.GetComponent(39)?.ClearAndStopMontage(this.PlayingMontageId);
  }
}
exports.default = TsTaskPlayMontage;
//# sourceMappingURL=TsTaskPlayMontage.js.map
