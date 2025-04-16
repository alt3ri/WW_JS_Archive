"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityControllerBase = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiManager_1 = require("../../Ui/UiManager");
class ActivityControllerBase {
  Init() {
    var e = this.OnInit();
    return this.OnRegisterNetEvent(), this.OnAddEvents(), e;
  }
  Clear() {
    return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), this.OnClear();
  }
  GetActivityResource(e) {
    e = this.OnGetActivityResource(e);
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
  }
  CreateSubPageComponent(e) {
    return this.OnCreateSubPageComponent(e);
  }
  OpenView(e) {
    this.OnOpenView(e);
  }
  async OpenViewByViewName(e) {
    return await this.OnOpenSubView(e);
  }
  CreateActivityData(e) {
    var t = this.OnCreateActivityData(e);
    return t.Init(e), t;
  }
  GetIsOpeningActivityRelativeView() {
    return this.OnGetIsOpeningActivityRelativeView();
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  async OnOpenSubView(e) {
    return Promise.resolve(!1);
  }
  GetActivityLevelUnlockState(e) {
    return !0;
  }
  GetActivityMapMarkState(e) {
    return !1;
  }
  OnActivityFirstUnlock(e) {
    e.LocalConfig &&
      e.LocalConfig.ShowUnlockTip &&
      UiManager_1.UiManager.OpenView("ActivityUnlockTipView", e);
  }
}
exports.ActivityControllerBase = ActivityControllerBase;
//# sourceMappingURL=ActivityControllerBase.js.map
