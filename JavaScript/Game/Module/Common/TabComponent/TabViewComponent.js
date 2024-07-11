"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabViewComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiTabViewStorage_1 = require("../../../Ui/UiTabViewStorage");
class TabViewComponent {
  constructor(e) {
    (this.Hbt = e),
      (this.N6e = void 0),
      (this.y9 = void 0),
      (this.jbt = new Map()),
      (this.Wbt = (e, t) => {
        var i = this.N6e ?? this.y9;
        t.DynamicTabName === i &&
          (t = this.jbt.get(i)) &&
          e.ViewData.SetAttachedView(t);
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GuideFocusNeedUiTabView,
        this.Wbt,
      );
  }
  Kbt(e, t) {
    e?.RegisterViewModule?.(t);
  }
  Qbt() {
    for (const e of this.jbt.values()) e.Destroy();
    this.jbt.clear();
  }
  Xbt() {
    var e = this.jbt.get(this.N6e);
    e &&
      (e.IsCreateOrCreating || e.IsStarting
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiTabModule", 11, "异步加载中,不执行页签隐藏", [
            "TabViewName",
            this.N6e,
          ])
        : e.HideUiTabView(!0));
  }
  ToggleCallBack(e, t, i = void 0, s = void 0) {
    void 0 !== this.N6e && this.Xbt(), (this.N6e = t);
    let r = this.jbt.get(t);
    var o;
    r ||
      ((o = UiTabViewStorage_1.UiTabViewStorage.GetUiTabViewBase(t)),
      (r = new o.CreateUiTabView()).SetTabViewName(t),
      this.Kbt(i, r),
      this.jbt.set(t, r),
      r.CreateByResourceIdAsync(o.ResourceId, this.Hbt).then(() => {
        this.N6e === t ? r?.ShowUiTabViewFromToggle() : r?.HideUiTabView(!0);
      })),
      r.SetParams(e),
      r.SetExtraParams(s),
      r.IsCreateOrCreating || r.IsStarting || r.ShowUiTabViewFromToggle();
  }
  GetCurrentTabViewName() {
    return this.N6e;
  }
  GetCurrentTabView() {
    return this.GetTabViewByTabName(this.N6e);
  }
  GetTabViewByTabName(e) {
    return this.jbt.get(e);
  }
  SetCurrentTabViewState(e) {
    var t;
    this.N6e &&
      (t = this.jbt.get(this.N6e)) &&
      (e && t.IsHideOrHiding
        ? t.ShowUiTabViewFromView()
        : e || t.IsHideOrHiding || t.HideUiTabView(!1));
  }
  DestroyTabViewComponent() {
    this.Qbt(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GuideFocusNeedUiTabView,
        this.Wbt,
      );
  }
}
exports.TabViewComponent = TabViewComponent;
//# sourceMappingURL=TabViewComponent.js.map
