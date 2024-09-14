"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  ServerGmController_1 = require("../../../World/Controller/ServerGmController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  DEFAULT_FINISHED_TIME = 6e4;
class TsTaskPlayAction extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MontageName = ""),
      (this.LoopTimeMillisecond = 0),
      (this.BlackboardKeyTime = ""),
      (this.MaskInteract = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMontageName = ""),
      (this.TsLoopTimeMillisecond = 0),
      (this.TsBlackboardKeyTime = ""),
      (this.TsMaskInteract = !1),
      (this.EndTime = -0),
      (this.AnimComp = void 0),
      (this.InteractComponent = void 0),
      (this.OnMontageEnded = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMontageName = this.MontageName),
      (this.TsLoopTimeMillisecond = this.LoopTimeMillisecond),
      (this.TsBlackboardKeyTime = this.BlackboardKeyTime),
      (this.TsMaskInteract = this.MaskInteract));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var i = e.AiController;
    const s = ServerGmController_1.ServerGmController.AnimalDebug;
    if (
      (s &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          6,
          "AnimalDebug PlayAction",
          ["Tree", this.TreeAsset?.GetName()],
          ["aiController", !!i],
          ["aiComp", !!i?.CharAiDesignComp],
          ["SelfId", i?.CharActorComp?.Entity.Id],
        ),
      i)
    ) {
      this.OnMontageEnded ||
        (this.OnMontageEnded = (e, t) => {
          this.EndTime = Time_1.Time.WorldTime;
        });
      i = i.CharActorComp.Entity;
      let t = this.TsLoopTimeMillisecond,
        e =
          (this.TsBlackboardKeyTime &&
            (o =
              BlackboardController_1.BlackboardController.GetIntValueByEntity(
                i.Id,
                this.TsBlackboardKeyTime,
              )) &&
            (t = o),
          this.TsMontageName);
      var o =
        BlackboardController_1.BlackboardController.GetStringValueByEntity(
          i.Id,
          "TargetMontageName",
        );
      o &&
        ((e = o),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          i.Id,
          "TargetMontageName",
        )),
        s &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug PlayAction2",
            ["TsLoopTimeMillisecond", this.TsLoopTimeMillisecond],
            ["time", t],
            ["TsMontageName", this.TsMontageName],
            ["spMontageName", o],
            ["montageName", e],
          ),
        (this.InteractComponent = i.GetComponent(182)),
        this.TsMaskInteract &&
          this.InteractComponent &&
          this.InteractComponent.SetInteractionState(
            !1,
            "TsTaskPlayAction ReceiveExecuteAI",
          ),
        (this.EndTime = t + Time_1.Time.WorldTime),
        (this.AnimComp = i.GetComponent(163)),
        this.AnimComp &&
          ((o = this.AnimComp.GetMontageResPathByName(e)),
          s &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 6, "AnimalDebug PlayAction3", [
              "montageResPath",
              o,
            ]),
          o?.includes("/")) &&
          ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.AnimMontage, (e) => {
            s &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                6,
                "AnimalDebug PlayAction4",
                ["montageAsset", e?.GetName()],
                [
                  "MainAnimInstance",
                  this.AnimComp?.MainAnimInstance?.GetName(),
                ],
              ),
              ObjectUtils_1.ObjectUtils.IsValid(e) &&
                this.AnimComp?.MainAnimInstance &&
                (0 === t &&
                  ((this.EndTime =
                    DEFAULT_FINISHED_TIME + Time_1.Time.WorldTime),
                  this.OnMontageEnded) &&
                  this.AnimComp.MainAnimInstance.OnMontageEnded.Add(
                    this.OnMontageEnded,
                  ),
                this.AnimComp.MainAnimInstance.Montage_Play(e));
          });
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  ReceiveTickAI(e, t, i) {
    this.EndTime < Time_1.Time.WorldTime &&
      (this.TsMaskInteract &&
        this.InteractComponent &&
        this.InteractComponent.SetInteractionState(
          !0,
          "TsTaskPlayAction ReceiveTickAI",
        ),
      this.Finish(!0));
  }
  OnClear() {
    (this.EndTime = 0),
      this.AnimComp &&
        (this.AnimComp.MainAnimInstance &&
          this.OnMontageEnded &&
          this.AnimComp.MainAnimInstance.OnMontageEnded.Remove(
            this.OnMontageEnded,
          ),
        (this.AnimComp = void 0));
  }
}
exports.default = TsTaskPlayAction;
//# sourceMappingURL=TsTaskPlayAction.js.map
