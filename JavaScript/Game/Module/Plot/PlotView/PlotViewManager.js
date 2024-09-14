"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotViewManager = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiConfig_1 = require("../../../Ui/Define/UiConfig"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiManager_1 = require("../../../Ui/UiManager");
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
    (this.Lto = void 0),
      (this.Dto = new Set()),
      (this.ui = !1),
      (this.Rto = !1),
      (this.Rjt = !1),
      (this.Uto = !1),
      (this.Ato = new Array()),
      (this.xto = new Set([
        "PlotView",
        "PlotSubtitleView",
        "PlotTransitionView",
        "PlotTransitionViewPop",
        "PlotLogoView",
        "PlotTipsView",
      ])),
      (this.wto = (e, t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "[PlotView] ViewChange",
            ["name", e],
            ["isShow", t],
          ),
          this.Lto !== e ||
            (t && !this.Rto) ||
            ((this.ui = t),
            this.ui &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Plot", 27, "[PlotView] 界面显示，打开完成", [
                  "open",
                  this.Lto,
                ]),
              this.Bto(!0),
              this.bto()));
      }),
      (this.FQe = (e, t) => {}),
      (this.$Ge = (e, t) => {
        this.ViewCloseCheck(e);
      }),
      (this.OnUpdateSubtitle = (e) => {
        ModelManager_1.ModelManager.PlotModel.CurTalkItem = e;
      }),
      (this.pea = (e) => {
        e
          ? ((ModelManager_1.ModelManager.PlotModel.HangViewHud = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "[PlotView] 引导界面打开挂起HUD剧情"),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.HangPlotViewHud,
              !0,
            ))
          : ((ModelManager_1.ModelManager.PlotModel.HangViewHud = !1),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "[PlotView] 引导界面解除挂起HUD剧情"),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.HangPlotViewHud,
              !1,
            ));
      }),
      (this.Bto = (t) => {
        var e = this.Dto;
        (this.Dto = new Set()),
          e.forEach((e) => {
            e?.(t);
          });
      }),
      (this.qto = (e, t) => {
        var i = UiConfig_1.UiConfig.TryGetViewInfo(e);
        return !(
          !i ||
          (i.Type === UiLayerType_1.ELayerType.Normal &&
            !this.xto.has(e) &&
            !(!!t && t?.CanOpenInPlot))
        );
      }),
      (this.Gto = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[PlotView] 剧情开始时重置主界面-完成"),
          this.bto();
      });
  }
  RegisterEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotViewChange,
      this.wto,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.OnUpdateSubtitle,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTutorialTipExistChanged,
        this.pea,
      );
  }
  UnRegisterEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotViewChange,
      this.wto,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.OnUpdateSubtitle,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTutorialTipExistChanged,
        this.pea,
      );
  }
  GetCurrentViewName() {
    return this.Lto;
  }
  OnSubmitSubtitle() {
    ModelManager_1.ModelManager.PlotModel.CurTalkItem = void 0;
  }
  ViewCloseCheck(e) {
    this.Lto === e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotView] 剧情界面关闭", [
          "viewName",
          this.Lto,
        ]),
      (this.Lto = void 0),
      (this.ui = !1),
      this.Rto &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            27,
            "[PlotView] 剧情界面意外关闭，跳过当前剧情",
          ),
        (this.Rto = !1),
        (this.Rjt = !0),
        this.Bto(!1),
        UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", this.qto),
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "剧情界面意外关闭 跳过剧情",
          !1,
        )),
      this.bto());
  }
  OpenPlotView(e, t, i) {
    this.Ao(e, i, t);
  }
  ClosePlotView() {
    this.tpi();
  }
  Ao(e, t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Plot",
        27,
        "[PlotView] 请求打开界面",
        ["new", e],
        ["current", this.Lto],
      ),
      this.Rjt
        ? this.Nto(new ViewHandle(e, t, i))
        : this.Lto === e
          ? (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdatePlotUiParam,
              t,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Plot", 27, "[PlotView] 重复打开"),
            this.WaitOpenCallback(i))
          : this.Lto
            ? (this.Nto(new ViewHandle(e, t, i)), this.tpi())
            : ((this.Rjt = !0),
              (this.Rto = !0),
              (this.Lto = e),
              this.WaitOpenCallback(i),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Plot", 27, "[PlotView] 打开", ["open", e]),
              UiManager_1.UiManager.OpenView(e, t));
  }
  tpi() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[PlotView] 请求关闭界面", [
        "current",
        this.Lto,
      ]),
      this.Rjt
        ? this.Nto(new ViewHandle())
        : this.Lto &&
          ((this.Rjt = !0),
          (this.Rto = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 27, "[PlotView] 关闭", ["close", this.Lto]),
          UiManager_1.UiManager.CloseView(this.Lto));
  }
  WaitOpenCallback(e) {
    e && (this.Rto ? (this.ui ? e(!0) : this.Dto.add(e)) : e(!1));
  }
  RemoveCallback(e) {
    e && this.Dto.delete(e);
  }
  bto() {
    var e;
    (this.Rjt = !1),
      0 !== this.Ato.length &&
        ((e = this.Ato.shift()).ResetToBattleView
          ? this.fWi()
          : e.ViewName
            ? this.Ao(e.ViewName, e.Param, e.Callback)
            : this.tpi());
  }
  Nto(e) {
    var t;
    0 < this.Ato.length &&
      ((t = this.Ato[this.Ato.length - 1]).ResetToBattleView ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "[PlotView] 上一次操作被废弃",
            ["viewName", t.ViewName],
            ["hasCallback", void 0 !== t.Callback],
          ),
        this.Ato.pop())),
      this.Ato.push(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[PlotView] 操作进入缓存", [
          "Handle",
          e.ResetToBattleView
            ? "ResetToBattleView"
            : (e.ViewName ?? "CloseView"),
        ]);
  }
  ProtectPlotView() {
    this.Uto ||
      ((this.Uto = !0),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "All",
        this.qto,
        "剧情界面打开期间禁止打开同层界面",
      ),
      this.Rjt
        ? this.Nto(new ViewHandle(void 0, void 0, void 0, !0))
        : this.fWi());
  }
  UnProtectPlotView() {
    this.Uto &&
      ((this.Uto = !1),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", this.qto));
  }
  fWi() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "[PlotView] 剧情开始时重置主界面-开始"),
      (this.Rjt = !0),
      EventSystem_1.EventSystem.Once(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.Gto,
      ),
      UiManager_1.UiManager.ResetToBattleView();
  }
}
exports.PlotViewManager = PlotViewManager;
//# sourceMappingURL=PlotViewManager.js.map
