"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTabViewBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("./UiPanelBase"),
  UiViewSequence_1 = require("./UiViewSequence");
class UiTabViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.Params = void 0),
      (this.lur = new Map()),
      (this.OperationList = []),
      (this.ExtraParams = void 0),
      (this.UiViewSequence = void 0),
      (this._ur = void 0),
      (this.uur = (e) => {
        var i = PerformanceController_1.PerformanceController.StartMonitor(
          "UiTabViewBase.TickHandler",
        );
        this.OnTickUiTabViewBase(e),
          PerformanceController_1.PerformanceController.EndMonitor(i);
      });
  }
  SetTabViewName(e) {
    this._ur = e;
  }
  OnBeforeShowImplement() {
    this.sKe === TickSystem_1.TickSystem.InvalidId &&
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.uur,
        "TabViewTick",
        0,
        !0,
      ).Id),
      this.AddEventListener();
  }
  OnAfterHideImplement() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.sKe),
      (this.sKe = TickSystem_1.TickSystem.InvalidId)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CloseTabView,
        this._ur,
      ),
      this.RemoveEventListener();
  }
  AddEventListener() {}
  RemoveEventListener() {}
  OnBeforeCreateImplement() {
    (this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiViewSequence);
  }
  OnStartImplement() {
    this.cur(), this.OnInitBehaviour();
    var i = this.OperationList.length;
    for (let e = 0; e < i; e++) (0, this.OperationList[e])();
    (this.OperationList = []), this.mur();
  }
  AddUiTabViewBehavior(e) {
    let i = this.lur.get(e);
    return (
      i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiTabModule",
            11,
            "功能模块添加重复,查看是否重复添加",
          )
        : ((i = new e()), this.lur.set(e, i)),
      i
    );
  }
  GetTabBehavior(e) {
    e = this.lur.get(e);
    if (e) return e;
  }
  OnAfterShowImplement() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OpenTabView,
      this._ur,
      this,
    );
  }
  cur() {
    for (const e of this.lur.values()) e.Init();
  }
  mur() {
    for (const e of this.lur.values()) e.Begin();
  }
  dur() {
    for (const e of this.lur.values()) e.ShowFromView();
  }
  Cur() {
    for (const e of this.lur.values()) e.ShowFromToggle();
  }
  gur() {
    for (const e of this.lur.values()) e.Hide();
  }
  fur() {
    for (const e of this.lur.values()) e.Destroy();
  }
  OnInitBehaviour() {}
  OnHideUiTabViewBase(e) {}
  OnTickUiTabViewBase(e) {}
  OnShowUiTabViewFromToggle() {}
  OnShowUiTabViewFromView() {}
  ShowUiTabViewFromToggle() {
    this.Show(), this.OnShowUiTabViewFromToggle(), this.Cur();
  }
  ShowUiTabViewFromView() {
    this.Show(), this.OnShowUiTabViewFromView(), this.dur();
  }
  HideUiTabView(e) {
    this.Hide(), this.OnHideUiTabViewBase(e), this.gur();
  }
  OnBeforeDestroyImplement() {
    this.fur();
  }
  SetParams(e) {
    this.Params = e;
  }
  SetExtraParams(e) {
    this.ExtraParams = e;
  }
  GetViewName() {
    return this._ur;
  }
  CancelAsyncLoad() {
    this.ClearUiPrefabLoadModule();
  }
}
exports.UiTabViewBase = UiTabViewBase;
//# sourceMappingURL=UiTabViewBase.js.map
