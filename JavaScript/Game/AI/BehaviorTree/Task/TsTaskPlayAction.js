"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const DEFAULT_FINISHED_TIME = 6e4;
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
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    let e = t.AiController;
    if (e) {
      this.OnMontageEnded ||
        (this.OnMontageEnded = (t, s) => {
          this.EndTime = Time_1.Time.WorldTime;
        });
      e = e.CharActorComp.Entity;
      let s = this.TsLoopTimeMillisecond;
      let t =
        (this.TsBlackboardKeyTime &&
          (i = BlackboardController_1.BlackboardController.GetIntValueByEntity(
            e.Id,
            this.TsBlackboardKeyTime,
          )) &&
          (s = i),
        this.TsMontageName);
      var i =
        BlackboardController_1.BlackboardController.GetStringValueByEntity(
          e.Id,
          "TargetMontageName",
        );
      i &&
        ((t = i),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          e.Id,
          "TargetMontageName",
        )),
        (this.InteractComponent = e.GetComponent(178)),
        this.TsMaskInteract &&
          this.InteractComponent &&
          this.InteractComponent.SetInteractionState(
            !1,
            "TsTaskPlayAction ReceiveExecuteAI",
          ),
        (this.EndTime = s + Time_1.Time.WorldTime),
        (this.AnimComp = e.GetComponent(160)),
        this.AnimComp &&
          (i = this.AnimComp.GetMontageResPathByName(t))?.includes("/") &&
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, (t) => {
            ObjectUtils_1.ObjectUtils.IsValid(t) &&
              this.AnimComp?.MainAnimInstance &&
              (s === 0 &&
                ((this.EndTime = DEFAULT_FINISHED_TIME + Time_1.Time.WorldTime),
                this.OnMontageEnded) &&
                this.AnimComp.MainAnimInstance.OnMontageEnded.Add(
                  this.OnMontageEnded,
                ),
              this.AnimComp.MainAnimInstance.Montage_Play(t));
          });
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  ReceiveTickAI(t, s, e) {
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
// # sourceMappingURL=TsTaskPlayAction.js.map
