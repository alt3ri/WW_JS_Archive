"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const DEFAULT_WAIT_TIME = 3;
const STOP_MONTAGE_BLEND_OUT_TIME = 0.1;
class TsTaskNpcPlayFlow extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.FlowListName = ""),
      (this.FlowSubTitle = ""),
      (this.IsInitTsVariables = !1),
      (this.TsFlowListName = ""),
      (this.TsFlowSubTitle = ""),
      (this.TempTalkItems = void 0),
      (this.TempFlowIndex = 0),
      (this.TimeRemain = 0),
      (this.FlowEnd = !0),
      (this.HeadInfoComp = void 0),
      (this.AnimInstance = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsFlowListName = this.FlowListName),
      (this.TsFlowSubTitle = this.FlowSubTitle));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables(),
      t instanceof TsAiController_1.default &&
      this.TsFlowListName &&
      this.TsFlowSubTitle &&
      (t = t.AiController.CharActorComp)
        ? (this.Reset(),
          (this.HeadInfoComp = t.Entity.GetComponent(70)),
          (t = t.Entity.GetComponent(160)) &&
            (this.AnimInstance = t.MainAnimInstance),
          this.HandlePlayFlow() ? this.HandleFlowAction(0) : this.Finish(!1))
        : this.FinishExecute(!1);
  }
  ReceiveTickAI(t, i, s) {
    this.FlowEnd
      ? this.Finish(!0)
      : this.TimeRemain > 0 &&
        ((this.TimeRemain -= s), this.TimeRemain < 0) &&
        this.HandleFlowAction(this.TempFlowIndex + 1);
  }
  HandlePlayFlow() {
    const t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
      this.TsFlowListName,
      Number(this.TsFlowSubTitle),
      this.ActorOwner.ActorLabel,
    );
    return !!t && ((this.TempTalkItems = t.TalkItems), !0);
  }
  HandleFlowAction(t) {
    this.TempFlowIndex = t;
    let i = this.TempTalkItems;
    i.length > t
      ? ((i = i[t]),
        this.ExecuteNpcFlow(i)
          ? ((this.FlowEnd = !1),
            (this.TimeRemain =
              i.WaitTime && i.WaitTime > 0 ? i.WaitTime : DEFAULT_WAIT_TIME))
          : this.HandleFlowAction(t + 1))
      : (this.FlowEnd = !0);
  }
  ExecuteNpcFlow(t) {
    let i = !1;
    let s = this.GetFlowText(t.TidTalk);
    return (
      s &&
        ((i = !0), this.HeadInfoComp) &&
        this.HeadInfoComp.SetDialogueText(s),
      this.AnimInstance &&
        (t.Montage
          ? ((i = !0),
            (s = t.Montage.ActionMontage.Path),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              s,
              UE.AnimMontage,
              (t) => {
                t?.IsValid() &&
                  this.AnimInstance &&
                  this.AnimInstance.Montage_Play(t);
              },
            ))
          : this.AnimInstance.IsAnyMontagePlaying() &&
            this.AnimInstance.Montage_Stop(STOP_MONTAGE_BLEND_OUT_TIME)),
      i
    );
  }
  GetFlowText(t) {
    if (t && !StringUtils_1.StringUtils.IsEmpty(t))
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  Reset() {
    (this.TempTalkItems = void 0),
      (this.TempFlowIndex = 0),
      (this.TimeRemain = 0),
      (this.FlowEnd = !0);
  }
  OnClear() {
    this.Reset(),
      this.HeadInfoComp &&
        (this.HeadInfoComp.HideDialogueText(), (this.HeadInfoComp = void 0)),
      this.AnimInstance?.IsAnyMontagePlaying() &&
        (this.AnimInstance.Montage_Stop(STOP_MONTAGE_BLEND_OUT_TIME),
        (this.AnimInstance = void 0));
  }
}
exports.default = TsTaskNpcPlayFlow;
// # sourceMappingURL=TsTaskNpcPlayFlow.js.map
