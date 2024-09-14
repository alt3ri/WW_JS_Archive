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
      (this.yBo = new CursorData_1.Cursor()),
      (this.IsOpenLog = !1),
      (this.Nqo = new Map()),
      (this.Oqo = new Map()),
      (this.kqo = new Set()),
      (this.Fqo = void 0);
  }
  InputControllerModeChange() {
    for (const t of this.Nqo.values()) for (const e of t) e.RefreshMode();
    for (const i of this.Oqo.values()) for (const o of i) o.RefreshMode();
    for (const r of this.kqo) r.ChangeAlpha();
  }
  OnClear() {
    return (
      this.ClearCursor(),
      UiNavigationGlobalData_1.UiNavigationGlobalData.ClearBlockListener(),
      !0
    );
  }
  SetCursorFollowItem(t) {
    this.yBo.SetFollowItem(t);
  }
  SetIsUseMouse(t) {
    this.yBo.SetIsUseMouse(t);
  }
  MarkMoveInstantly() {
    this.yBo.IsMoveInstantly = !0;
  }
  SetCursorActiveDelayTime(t) {
    this.yBo.SetCursorActiveDelayTime(t);
  }
  RepeatMove() {
    this.yBo.RepeatMove();
  }
  ClearCursor() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 11, "清理光标"),
      this.yBo.Clear();
  }
  OnLeaveLevel() {
    return this.ClearCursor(), !0;
  }
  Tick(t) {
    this.yBo.Tick(t);
  }
  AddActionHotKeyComponent(t, e) {
    this.Nqo.set(t, e);
  }
  GetActionHotKeyComponentSet(t) {
    return this.Nqo.get(t);
  }
  GetOrAddActionHotKeyComponentSet(t) {
    let e = this.Nqo.get(t);
    return e || ((e = new Set()), this.AddActionHotKeyComponent(t, e)), e;
  }
  Vqo(t, e) {
    var i = [];
    InputSettingsManager_1.InputSettingsManager.GetActionBinding(
      t,
    ).GetCurrentPlatformKeyNameList(i);
    for (const o of i) if (e.has(o)) return o;
  }
  mGa(t, e) {
    var i = [];
    InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
      t,
    ).GetCurrentPlatformKeyNameList(i);
    for (const o of i) if (e.has(o)) return o;
  }
  Hqo(t) {
    var e =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        t,
      );
    if (e) {
      var i = [];
      if ((e.GetGamepadKeyNameList(i), 0 < i.length)) return i;
    }
    e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
    if (e) {
      i = [];
      if ((e.GetCurrentPlatformKeyNameList(i), 0 < i.length)) return i;
    }
  }
  dGa(t) {
    var t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
    if (t) return t.GetCurrentPlatformKeyNameList((t = [])), t;
  }
  CheckActionNameListInNavigation(t) {
    var e = this.Hqo(t);
    if (e) {
      var i,
        o,
        r = new Set(e);
      for ([i, o] of this.Nqo)
        if (t !== i) {
          var n = this.Vqo(i, r);
          if (n)
            for (const s of o)
              if (s.IsHotKeyActive() && s.IsOccupancyFightInput())
                return (
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "UiNavigation",
                      11,
                      "非导航输入被导航输入占用",
                      ["非导航输入", t],
                      ["导航输入", i],
                      ["交集的KeyName", n],
                    ),
                  !0
                );
        }
    }
    return !1;
  }
  CheckAxisNameListInNavigation(t) {
    var e = this.dGa(t);
    if (e) {
      var i,
        o,
        r = new Set(e);
      for ([i, o] of this.Oqo)
        if (t !== i)
          if (this.mGa(i, r))
            for (const n of o)
              if (
                n.IsHotKeyActive() &&
                "ShowOnly" !== n.GetHotKeyFunctionType()
              )
                return !0;
    }
    return !1;
  }
  AddAxisHotKeyComponent(t, e) {
    this.Oqo.set(t, e);
  }
  GetAxisHotKeyComponentSet(t) {
    return this.Oqo.get(t);
  }
  GetOrAddAxisHotKeyComponentsSet(t) {
    let e = this.Oqo.get(t);
    return e || ((e = new Set()), this.AddAxisHotKeyComponent(t, e)), e;
  }
  AddPlatformListener(t) {
    this.kqo.add(t);
  }
  RemovePlatformListener(t) {
    this.kqo.delete(t);
  }
  get GuideFocusListener() {
    return this.Fqo;
  }
  SetGuideFocusListener(t) {
    this.Fqo = t;
  }
  ResetGuideFocusListener() {
    this.Fqo = void 0;
  }
}
exports.UiNavigationModel = UiNavigationModel;
//# sourceMappingURL=UiNavigationModel.js.map
