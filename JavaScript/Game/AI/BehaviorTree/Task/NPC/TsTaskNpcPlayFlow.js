"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  TsAiController_1 = require("../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
  DEFAULT_WAIT_TIME = 3,
  STOP_MONTAGE_BLEND_OUT_TIME = 0.1;
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
      (this.AnimComp = void 0),
      (this.PerformComp = void 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsFlowListName = ""),
      (this.TsFlowSubTitle = ""),
      (this.TempTalkItems = void 0),
      (this.TempFlowIndex = 0),
      (this.TimeRemain = 0),
      (this.FlowEnd = !0),
      (this.HeadInfoComp = void 0),
      (this.AnimComp = void 0),
      (this.PerformComp = void 0);
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
          (this.HeadInfoComp = t.Entity.GetComponent(80)),
          (this.AnimComp = t.Entity.GetComponent(175)),
          (this.PerformComp = t.Entity.GetComponent(45)),
          this.HandlePlayFlow() ? this.HandleFlowAction(0) : this.Finish(!1))
        : this.FinishExecute(!1);
  }
  ReceiveTickAI(t, i, s) {
    this.FlowEnd
      ? this.Finish(!0)
      : 0 < this.TimeRemain &&
        ((this.TimeRemain -= s), this.TimeRemain < 0) &&
        this.HandleFlowAction(this.TempFlowIndex + 1);
  }
  HandlePlayFlow() {
    var t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
      this.TsFlowListName,
      Number(this.TsFlowSubTitle),
      this.ActorOwner.ActorLabel,
    );
    return !!t && ((this.TempTalkItems = t.TalkItems), !0);
  }
  HandleFlowAction(t) {
    this.TempFlowIndex = t;
    var i = this.TempTalkItems;
    i.length > t
      ? ((i = i[t]),
        this.ExecuteNpcFlow(i)
          ? ((this.FlowEnd = !1),
            (this.TimeRemain =
              i.WaitTime && 0 < i.WaitTime ? i.WaitTime : DEFAULT_WAIT_TIME))
          : this.HandleFlowAction(t + 1))
      : (this.FlowEnd = !0);
  }
  ExecuteNpcFlow(t) {
    let i = !1;
    var s = this.GetFlowText(t.TidTalk);
    return (
      s &&
        ((i = !0), this.HeadInfoComp) &&
        this.HeadInfoComp.SetDialogueText(s),
      this.AnimComp &&
        (t.Montage
          ? ((i = !0),
            (s = t.Montage.ActionMontage.Path),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              s,
              UE.AnimMontage,
              (t) => {
                t?.IsValid() &&
                  this.PerformComp &&
                  this.PerformComp.PlayPerformMontage(3, { MontageAsset: t });
              },
            ))
          : this.PerformComp &&
            this.PerformComp.StopPerformMontage(3, {
              Method: 0,
              BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME,
            })),
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
      this.PerformComp &&
        this.PerformComp.StopPerformMontage(3, {
          Method: 0,
          BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME,
        });
  }
}
exports.default = TsTaskNpcPlayFlow;
//# sourceMappingURL=TsTaskNpcPlayFlow.js.map
