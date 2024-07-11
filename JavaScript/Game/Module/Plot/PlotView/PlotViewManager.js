"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotViewManager = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiConfig_1 = require("../../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiManager_1 = require("../../../Ui/UiManager");
class ViewHandle {
  constructor(e = void 0, t = void 0, i = void 0, s = !1) {
    (this.ViewName = e),
      (this.Param = t),
      (this.Callback = i),
      (this.ResetToBattleView = s);
  }
}
class PlotViewManager {
  constructor() {
    (this.Aeo = void 0),
      (this.Peo = new Set()),
      (this.ui = !1),
      (this.xeo = !1),
      (this.RHt = !1),
      (this.weo = !1),
      (this.Beo = new Array()),
      (this.beo = new Set()),
      (this.qeo = new Set([
        "PlotView",
        "PlotSubtitleView",
        "PlotTransitionView",
        "PlotTransitionViewPop",
        "InfoDisplayTypeOneView",
        "InfoDisplayTypeTwoView",
        "InfoDisplayTypeThreeView",
        "InfoDisplayTypeFourView",
        "PlotLogoView",
        "ChapterStartFloatTips",
        "ChapterEndFloatTips",
        "PlotTipsView",
      ])),
      (this.Geo = (e, t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "[PlotView] ViewChange",
            ["name", e],
            ["isShow", t],
          ),
          this.Aeo !== e ||
            (t && !this.xeo) ||
            ((this.ui = t),
            this.ui &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Plot", 27, "[PlotView] 界面显示，打开完成", [
                  "open",
                  this.Aeo,
                ]),
              this.Neo(!0),
              this.Oeo()));
      }),
      (this.UKe = (e, t) => {
        this.InterruptHud(!0, e);
      }),
      (this.$Ge = (e, t) => {
        this.InterruptHud(!1, e), this.ViewCloseCheck(e);
      }),
      (this.OnUpdateSubtitle = (e) => {
        ModelManager_1.ModelManager.PlotModel.CurTalkItem = e;
      }),
      (this.Neo = (t) => {
        const e = this.Peo;
        (this.Peo = new Set()),
          e.forEach((e) => {
            e?.(t);
          });
      }),
      (this.keo = (e) => {
        const t = UiConfig_1.UiConfig.TryGetViewInfo(e);
        return (
          !!t && (t.Type !== UiLayerType_1.ELayerType.Normal || this.qeo.has(e))
        );
      }),
      (this.Feo = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[PlotView] 剧情开始时重置主界面-完成"),
          this.Oeo();
      });
  }
  RegisterEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotViewChange,
      this.Geo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.OnUpdateSubtitle,
      );
  }
  UnRegisterEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotViewChange,
      this.Geo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.OnUpdateSubtitle,
      );
  }
  GetCurrentViewName() {
    return this.Aeo;
  }
  OnSubmitSubtitle() {
    ModelManager_1.ModelManager.PlotModel.CurTalkItem = void 0;
  }
  InterruptHud(e, t) {
    e
      ? t === "GuideTutorialTipsView" &&
        (this.beo.add(t),
        (ModelManager_1.ModelManager.PlotModel.HangViewHud = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotView] 引导界面打开挂起HUD剧情"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HangPlotViewHud,
          !0,
        ))
      : this.beo.has(t) &&
        (this.beo.delete(t), this.beo.size === 0) &&
        ((ModelManager_1.ModelManager.PlotModel.HangViewHud = !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "[PlotView] 引导界面解除挂起HUD剧情"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HangPlotViewHud,
          !1,
        ));
  }
  ViewCloseCheck(e) {
    this.Aeo === e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotView] 剧情界面关闭", [
          "viewName",
          this.Aeo,
        ]),
      (this.Aeo = void 0),
      (this.ui = !1),
      this.xeo &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            27,
            "[PlotView] 剧情界面意外关闭，跳过当前剧情",
          ),
        (this.xeo = !1),
        (this.RHt = !0),
        this.Neo(!1),
        UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", this.keo),
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "剧情界面意外关闭 跳过剧情",
          !1,
        )),
      this.Oeo());
  }
  OpenPlotView(e, t, i) {
    this.Ao(e, i, t);
  }
  ClosePlotView() {
    this.tfi();
  }
  Ao(e, t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Plot",
        27,
        "[PlotView] 请求打开界面",
        ["new", e],
        ["current", this.Aeo],
      ),
      this.RHt
        ? this.Veo(new ViewHandle(e, t, i))
        : this.Aeo === e
          ? (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdatePlotUiParam,
              t,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "[PlotView] 重复打开"),
            this.WaitOpenCallback(i))
          : this.Aeo
            ? (this.Veo(new ViewHandle(e, t, i)), this.tfi())
            : ((this.RHt = !0),
              (this.xeo = !0),
              (this.Aeo = e),
              this.WaitOpenCallback(i),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Plot", 27, "[PlotView] 打开", ["open", e]),
              UiManager_1.UiManager.OpenView(e, t));
  }
  tfi() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[PlotView] 请求关闭界面", [
        "current",
        this.Aeo,
      ]),
      this.RHt
        ? this.Veo(new ViewHandle())
        : this.Aeo &&
          ((this.RHt = !0),
          (this.xeo = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 27, "[PlotView] 关闭", ["close", this.Aeo]),
          UiManager_1.UiManager.CloseView(this.Aeo));
  }
  WaitOpenCallback(e) {
    e && (this.xeo ? (this.ui ? e(!0) : this.Peo.add(e)) : e(!1));
  }
  RemoveCallback(e) {
    e && this.Peo.delete(e);
  }
  Oeo() {
    let e;
    (this.RHt = !1),
      this.Beo.length !== 0 &&
        ((e = this.Beo.shift()).ResetToBattleView
          ? this.vji()
          : e.ViewName
            ? this.Ao(e.ViewName, e.Param, e.Callback)
            : this.tfi());
  }
  Veo(e) {
    let t;
    this.Beo.length > 0 &&
      ((t = this.Beo[this.Beo.length - 1]).ResetToBattleView ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "[PlotView] 上一次操作被废弃",
            ["viewName", t.ViewName],
            ["hasCallback", void 0 !== t.Callback],
          ),
        this.Beo.pop())),
      this.Beo.push(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotView] 操作进入缓存", [
          "Handle",
          e.ResetToBattleView ? "ResetToBattleView" : e.ViewName ?? "CloseView",
        ]);
  }
  ProtectPlotView() {
    this.weo ||
      ((this.weo = !0),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "All",
        this.keo,
        "剧情界面打开期间禁止打开同层界面",
      ),
      this.RHt
        ? this.Veo(new ViewHandle(void 0, void 0, void 0, !0))
        : this.vji());
  }
  UnProtectPlotView() {
    this.weo &&
      ((this.weo = !1),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", this.keo));
  }
  vji() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "[PlotView] 剧情开始时重置主界面-开始"),
      (this.RHt = !0),
      EventSystem_1.EventSystem.Once(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.Feo,
      ),
      UiManager_1.UiManager.ResetToBattleView();
  }
}
exports.PlotViewManager = PlotViewManager;
// # sourceMappingURL=PlotViewManager.js.map
