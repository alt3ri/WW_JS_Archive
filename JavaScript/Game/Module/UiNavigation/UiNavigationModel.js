"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  CursorData_1 = require("./Data/CursorData"),
  UiNavigationGlobalData_1 = require("./New/UiNavigationGlobalData");
class UiNavigationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Lwo = new CursorData_1.Cursor()),
      (this.IsOpenLog = !1),
      (this.Fbo = new Map()),
      (this.Vbo = new Map()),
      (this.Hbo = new Set()),
      (this.jbo = void 0);
  }
  InputControllerModeChange() {
    for (const t of this.Fbo.values()) for (const e of t) e.RefreshMode();
    for (const i of this.Hbo) i.ChangeAlpha();
  }
  OnClear() {
    return (
      this.ClearCursor(),
      UiNavigationGlobalData_1.UiNavigationGlobalData.ClearBlockListener(),
      !0
    );
  }
  SetCursorFollowItem(t) {
    this.Lwo.SetFollowItem(t);
  }
  SetIsUseMouse(t) {
    this.Lwo.SetIsUseMouse(t);
  }
  MarkMoveInstantly() {
    this.Lwo.IsMoveInstantly = !0;
  }
  SetCursorActiveDelayTime(t) {
    this.Lwo.SetCursorActiveDelayTime(t);
  }
  RepeatMove() {
    this.Lwo.RepeatMove();
  }
  ClearCursor() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 11, "清理光标"),
      this.Lwo.Clear();
  }
  OnLeaveLevel() {
    return this.ClearCursor(), !0;
  }
  Tick(t) {
    this.Lwo.Tick(t);
  }
  AddActionHotKeyComponent(t, e) {
    this.Fbo.set(t, e);
  }
  GetActionHotKeyComponentSet(t) {
    return this.Fbo.get(t);
  }
  GetOrAddActionHotKeyComponentSet(t) {
    let e = this.Fbo.get(t);
    return e || ((e = new Set()), this.AddActionHotKeyComponent(t, e)), e;
  }
  Wbo(t, e) {
    var i = [];
    InputSettingsManager_1.InputSettingsManager.GetActionBinding(
      t,
    ).GetCurrentPlatformKeyNameList(i);
    for (const o of i) if (e.has(o)) return !0;
    return !1;
  }
  Kbo(t) {
    var e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
    if (e) return e.GetCurrentPlatformKeyNameList((e = [])), e;
    InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
      t,
    );
  }
  CheckKeyNameListInNavigation(t) {
    var e = this.Kbo(t);
    if (e) {
      var i,
        o,
        r = new Set(e);
      for ([i, o] of this.Fbo)
        if (t !== i && this.Wbo(i, r))
          for (const n of o)
            if (n.IsHotKeyActive())
              return (
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "UiNavigation",
                    11,
                    "非导航输入被导航输入占用",
                    ["非导航输入", t],
                    ["导航输入", i],
                  ),
                !0
              );
    }
    return !1;
  }
  AddAxisHotKeyComponent(t, e) {
    this.Vbo.set(t, e);
  }
  GetAxisHotKeyComponentSet(t) {
    return this.Vbo.get(t);
  }
  GetOrAddAxisHotKeyComponentsSet(t) {
    let e = this.Vbo.get(t);
    return e || ((e = new Set()), this.AddAxisHotKeyComponent(t, e)), e;
  }
  AddPlatformListener(t) {
    this.Hbo.add(t);
  }
  RemovePlatformListener(t) {
    this.Hbo.delete(t);
  }
  get GuideFocusListener() {
    return this.jbo;
  }
  SetGuideFocusListener(t) {
    this.jbo = t;
  }
  ResetGuideFocusListener() {
    this.jbo = void 0;
  }
}
exports.UiNavigationModel = UiNavigationModel;
//# sourceMappingURL=UiNavigationModel.js.map
