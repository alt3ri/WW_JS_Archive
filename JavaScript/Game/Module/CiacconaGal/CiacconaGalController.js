"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  CiacoonaGalPlayer_1 = require("./CiacoonaGalPlayer");
class CiacconaGalController extends ControllerBase_1.ControllerBase {
  constructor() {
    super();
  }
  static get GalPlayer() {
    return CiacconaGalController.abc;
  }
  static OnInit() {
    return (
      (CiacconaGalController.abc =
        CiacoonaGalPlayer_1.CiacconaGalPlayer.Instance),
      this.N3c(),
      !0
    );
  }
  static OnClear() {
    return (
      (CiacconaGalController.V3c = []),
      CiacconaGalController.abc.Release(),
      this.j3c(),
      !0
    );
  }
  static OnTick(a) {
    this.H3c(a), this.$3c(a);
  }
  static H3c(a) {
    this.h$i &&
      (ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty &&
        CiacconaGalController.lbc(),
      0 !== CiacconaGalController.abc.StatePendingToSwitch) &&
      CiacconaGalController.abc.SwitchState();
  }
  static $3c(a) {
    0 !== ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask &&
      (CiacconaGalController.W3c(
        ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask,
      ),
      (ModelManager_1.ModelManager.CiacconaGalModel.DataUpdateMask = 0));
  }
  static N3c() {
    Net_1.Net.Register(29958, CiacconaGalController.Q3c),
      Net_1.Net.Register(21556, CiacconaGalController.K3c),
      Net_1.Net.Register(29334, CiacconaGalController.X3c),
      Net_1.Net.Register(23150, CiacconaGalController.Y3c),
      Net_1.Net.Register(26787, CiacconaGalController.z3c);
  }
  static j3c() {
    Net_1.Net.UnRegister(29958),
      Net_1.Net.UnRegister(21556),
      Net_1.Net.UnRegister(29334),
      Net_1.Net.UnRegister(23150),
      Net_1.Net.UnRegister(26787);
  }
  static W3c(a) {
    1 & a &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCiacconaChapterDataUpdate,
      ),
      2 & a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate,
        ),
      4 & a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCiacconaRewardDataUpdate,
        ),
      8 & a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCiacconaEndingDataUpdate,
        ),
      16 & a &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCiacconaActivityStateUpdate,
        );
    a = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData;
    a &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        a.Id,
      );
  }
  static OpenGalViewByChapterId(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    t &&
      ((t = t.StepIds[0]),
      (CiacconaGalController.GalPlayer.CurHandlingChapterId = a),
      CiacconaGalController.OpenGalViewByStepId(t, a, e));
  }
  static OpenGalViewByStepId(a, e, t) {
    a = CiacconaGalController._bc(a);
    e && (CiacconaGalController.GalPlayer.CurHandlingChapterId = e),
      a &&
        UiManager_1.UiManager.OpenView("CiacconaGalView", void 0, () => {
          t && UiManager_1.UiManager.CloseView(t);
        });
  }
  static OpenChapterViewById(a, e) {
    var t = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    t &&
      ((CiacconaGalController.GalPlayer.CurHandlingChapterId = a),
      UiManager_1.UiManager.OpenView("CiacconaGalChapterView", t, () => {
        e && UiManager_1.UiManager.CloseView(e);
      }));
  }
  static async OpenChapterViewAsync(a) {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(a);
    return (
      !!e &&
      ((CiacconaGalController.GalPlayer.CurHandlingChapterId = a),
      !!(await UiManager_1.UiManager.OpenViewAsync(
        "CiacconaGalChapterView",
        e,
      )))
    );
  }
  static OpenEndingView() {
    UiManager_1.UiManager.OpenView("CiacconaGalEndingView");
  }
  static OpenEndingDetailView(a, e) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetEndingDataById(a);
    a &&
      a.IsFinished &&
      ((a = { EndingData: a, LabelTextId: e }),
      UiManager_1.UiManager.OpenView("CiacconaGalEndingDetailView", a));
  }
  static OpenChapterEntryView(a, e = 0) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    a &&
      (UiManager_1.UiManager.OpenView("CiacconaGalChapterEntryView", a),
      this.ReportEnterChapterEntryView(e));
  }
  static async OpenChapterEntryViewAsync(a, e = 0) {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    return (
      !!a &&
      ((a = await UiManager_1.UiManager.OpenViewAsync(
        "CiacconaGalChapterEntryView",
        a,
      )),
      this.ReportEnterChapterEntryView(e),
      !!a)
    );
  }
  static OpenRewardViewByActivityId(a) {
    a = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a);
    a &&
      a.IsInRewardTime &&
      UiManager_1.UiManager.OpenView("CiacconaActivityRewardView", a);
  }
  static async ExitAvg() {
    var a = this.GalPlayer.CurHandlingChapterId,
      e = this.GalPlayer.CurHandlingStepId,
      e =
        ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(
          e,
        ).SubEndingId;
    const t =
      ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
    if (!t.IsFinished || t.IsFaked) {
      var r = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
      await this.RequestFinishChapterSubEnding(r, a, e);
      const t =
        ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e);
      t?.ShouldExitOnFirstFinish
        ? ((r = []).push(
            UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterView"),
          ),
          r.push(
            UiManager_1.UiManager.CloseViewAsync("CiacconaGalChapterEntryView"),
          ),
          await Promise.all(r),
          await UiManager_1.UiManager.CloseViewAsync("CiacconaGalView"))
        : this.OpenChapterViewById(a, "CiacconaGalView");
    } else this.OpenChapterViewById(a, "CiacconaGalView");
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NotifyBtCiacconaChapterFinish,
      a,
      e,
    );
  }
  static AddOnStepDataUpdate(a) {
    CiacconaGalController.V3c.push(a);
  }
  static RemoveOnStepDataUpdate(a) {
    a = CiacconaGalController.V3c.indexOf(a);
    -1 !== a && CiacconaGalController.V3c.splice(a, 1);
  }
  static SetGalViewReady(a) {
    (CiacconaGalController.h$i = a) || CiacconaGalController.abc.Reset();
  }
  static lbc() {
    for (const a of CiacconaGalController.V3c)
      a(this.GalPlayer.CurHandlingStepId);
    ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty = !1;
  }
  static _bc(e) {
    if (!ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e))
      return !1;
    ModelManager_1.ModelManager.CiacconaGalModel.ClearCurStepData();
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetAllChapterData();
    if (!a) return !1;
    a = a.find((a) => a.StepIds.includes(e));
    if (!a) return !1;
    for (const r of a.StepIds) {
      if (r === e) break;
      var t = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(r);
      2 === t.Type && (t.ChosenId = t.ChoiceIds[0]),
        ModelManager_1.ModelManager.CiacconaGalModel.PushCurStepData(t);
    }
    return CiacconaGalController.abc.TryContinue(e), !0;
  }
  static async RequestFinishChapterSubEnding(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.ONc(),
      a =
        ((r.w6n = a),
        (r.g3c = e),
        (r.u3c = t),
        await Net_1.Net.CallAsync(28050, r));
    a &&
      a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        a.Q4n,
        29933,
      );
  }
  static async RequestUnlockChoice(a, e, t) {
    var r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(t);
    !r ||
      !r.NeedInspiration ||
      ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(a)
        .InspirationCount < r.RequiredInspiration ||
      (((r = new Protocol_1.Aki.Protocol.NNc()).w6n = a),
      (r.g3c = e),
      (r.l3c = t),
      (a = await Net_1.Net.CallAsync(24672, r)) &&
        a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          a.Q4n,
          22398,
        ));
  }
  static async RequestGetSubEndingReward(a, e, t) {
    var r = new Protocol_1.Aki.Protocol.GNc(),
      a =
        ((r.w6n = a),
        (r.g3c = e),
        (r.u3c = t),
        await Net_1.Net.CallAsync(26376, r));
    a &&
      a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        a.Q4n,
        29846,
      );
  }
  static async RequestGetActivityEndingReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.jNc(),
      a = ((t.w6n = a), (t.u3c = e), await Net_1.Net.CallAsync(22147, t));
    a &&
      a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        a.Q4n,
        22907,
      );
  }
  static async RequestGetActivityProgressReward(a, e) {
    var t = new Protocol_1.Aki.Protocol.$Nc(),
      a = ((t.w6n = a), (t.N6n = e), await Net_1.Net.CallAsync(19940, t));
    a &&
      a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        a.Q4n,
        15489,
      );
  }
  static ReportEnterChapterEntryView(a) {
    a &&
      ((a = new LogReportDefine_1.CiacconaEnterMainViewLogEvent(a)),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a));
  }
}
((exports.CiacconaGalController =
  CiacconaGalController).IsTickEvenPausedInternal = !0),
  (CiacconaGalController.abc = void 0),
  (CiacconaGalController.h$i = !1),
  (CiacconaGalController.V3c = []),
  (CiacconaGalController.Q3c = (a) => {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllChapterData(a.e3c);
  }),
  (CiacconaGalController.K3c = (a) => {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateInspirationData(a.r3c);
  }),
  (CiacconaGalController.X3c = (a) => {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateProgressRewardData(
      a.t3c,
    );
  }),
  (CiacconaGalController.Y3c = (a) => {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateAllEndingData(a.i3c);
  }),
  (CiacconaGalController.z3c = (a) => {
    ModelManager_1.ModelManager.CiacconaGalModel.UpdateActivityState(a);
  });
//# sourceMappingURL=CiacconaGalController.js.map
