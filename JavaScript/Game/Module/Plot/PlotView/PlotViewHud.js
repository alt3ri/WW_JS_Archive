"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotViewHud = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PlotTextLogic_1 = require("./PlotTextLogic");
class PlotViewHud extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.geo = void 0),
      (this.xOi = void 0),
      (this.vto = !1),
      (this.CZi = () => {
        this.$eo();
      }),
      (this.Jeo = () => {
        this.Feo(),
          ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(
            this.geo.CurrentContent,
          );
      }),
      (this.Mto = (e) => {
        this.vto || this.geo.UpdatePlotSubtitle(e);
      }),
      (this.Weo = (e, t) => {
        this.geo.HandlePortraitVisible(this.RootItem, e, t);
      }),
      (this.rto = () => {
        this.geo.ClearPlotContent(), this.Feo();
      }),
      (this.Eto = (e = !1, t = !0) => {
        this.vto === e ||
          (!e && this.IsHideOrHiding) ||
          ((this.vto = e)
            ? (t && this.SetUiActive(!1),
              this.Abn(),
              ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
                !0,
              ))
            : (t && this.SetUiActive(!0),
              this.J2n(),
              ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
                !1,
              )));
      }),
      (this.Sto = (e) => {
        (this.OpenParam = e), this.yto(), this.Ito(), this.Tto();
      });
  }
  SimulateClickSubtitle() {}
  SimulateClickOption() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIScrollViewComponent],
    ];
  }
  OnStart() {
    var e = this.GetScrollView(8);
    e?.SetCanScroll(!1),
      e?.SetRayCastTargetForScrollView(!1),
      (this.geo = new PlotTextLogic_1.PlotTextCommonLogic(
        this.GetItem(4),
        this.GetText(0),
        this.GetText(1),
        this.GetText(2),
        this.GetItem(3),
        e,
      )),
      this.geo.SetPlotContentAnimFinishCallback(this.CZi),
      this.Tto(),
      this.Ito(),
      (this.vto = !1);
  }
  $eo() {
    this.Feo();
    var e =
      ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeLevelD *
      CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.xOi = TimerSystem_1.TimerSystem.Delay(
      this.Jeo,
      this.geo.PlayDelayTime <= e ? e : this.geo.PlayDelayTime,
    );
  }
  Feo() {
    TimerSystem_1.TimerSystem.Has(this.xOi) &&
      TimerSystem_1.TimerSystem.Remove(this.xOi),
      (this.xOi = void 0);
  }
  async OnPlayingCloseSequenceAsync() {
    await this.geo.DestroyPortraitItem();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdatePlotSubtitle,
      this.Mto,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePortraitVisible,
        this.Weo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.rto,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HangPlotViewHud,
        this.Eto,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotUiParam,
        this.Sto,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdatePlotSubtitle,
      this.Mto,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePortraitVisible,
        this.Weo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.rto,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HangPlotViewHud,
        this.Eto,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotUiParam,
        this.Sto,
      );
  }
  OnAfterPlayStartSequence() {
    this.yto();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !0,
    ),
      this.Eto(ModelManager_1.ModelManager.PlotModel?.HangViewHud, !1);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !1,
    ),
      this.Eto(!0, !1);
  }
  OnBeforeDestroy() {
    this.geo.Clear(),
      ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(!1);
  }
  Tto() {
    var e,
      t = this.OpenParam;
    t &&
      t.Position &&
      t.ViewName &&
      "BattleView" !== t.ViewName &&
      ((e = this.GetItem(4)),
      3 === t.Position
        ? e.SetUIParent(this.GetItem(6))
        : 2 === t.Position
          ? e.SetUIParent(this.GetItem(7))
          : e.SetUIParent(this.GetItem(5)),
      e.SetAnchorOffsetX(0));
  }
  Ito() {
    var e;
    Info_1.Info.IsInTouch() ||
      ((e = this.OpenParam) &&
        e.TextWidth &&
        this.GetText(2)?.SetWidth(e.TextWidth));
  }
  yto() {
    var e,
      t = this.OpenParam;
    t?.ViewName &&
      ((e = UiManager_1.UiManager.GetViewByName(t.ViewName))
        ? (e.AddChild(this),
          e.IsHideOrHiding &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Plot",
                27,
                "[PlotViewHud] 父界面已经隐藏，attach时子界面主动隐藏",
              ),
            this.Hide()))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "[PlotViewHud] 父界面已经不在，子界面直接关闭",
              ["parent", t.ViewName],
            ),
          this.CloseMe()));
  }
  Abn() {
    ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
      (this.geo.PauseSubtitle(), this.xOi) &&
      this.xOi.Pause();
  }
  J2n() {
    ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
      (this.geo.ResumeSubtitle(
        ModelManager_1.ModelManager.PlotModel.CurTalkItem,
      ),
      this.xOi) &&
      this.xOi.Resume();
  }
}
exports.PlotViewHud = PlotViewHud;
//# sourceMappingURL=PlotViewHud.js.map
