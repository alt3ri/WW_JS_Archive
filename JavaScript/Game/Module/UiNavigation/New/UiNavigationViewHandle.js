"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationViewHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GamepadControlMouse_1 = require("../Module/GamepadControlMouse"),
  NavigationScrollbarData_1 = require("./NavigationScrollbarData"),
  UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
  UiNavigationLogic_1 = require("./UiNavigationLogic"),
  UiNavigationNewController_1 = require("./UiNavigationNewController"),
  UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationViewHandle {
  constructor(i, t) {
    (this.TagId = 0),
      (this.ViewName = ""),
      (this.hbo = new Map()),
      (this.MainPanel = void 0),
      (this.lbo = void 0),
      (this._bo = void 0),
      (this.ubo = void 0),
      (this.cbo = !0),
      (this.dce = !0),
      (this.mbo = !0),
      (this.dbo = void 0),
      (this.Cbo = "None"),
      (this.gbo = !1),
      (this.fbo = void 0),
      (this.pbo = !1),
      (this.vbo = !1),
      (this.Mbo = !1),
      (this.Ebo = !1),
      (this.KCa = void 0),
      (this.CSa = void 0),
      (this.TagId = i),
      (this.ViewName = t.ViewName),
      (this.MainPanel = t),
      (this.lbo = t),
      (this.dbo = new NavigationScrollbarData_1.NavigationScrollbarData()),
      this.gSa();
  }
  set State(i) {
    this.Cbo !== i &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "当前界面句柄状态发生变更",
        ["当前状态", i],
        ["之前状态", this.Cbo],
      ),
      (this.Cbo = i);
  }
  get State() {
    return this.Cbo;
  }
  Sbo() {
    (this.State = "None"),
      void 0 !== this.ubo &&
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          void 0,
        );
    for (const i of this.hbo.values())
      i.GetPanelHandle().ResetGroupConfigMemory();
  }
  GetDepth() {
    return this.lbo.IsValid() && this.lbo.RootUIComp.IsValid()
      ? this.lbo.RootUIComp.flattenHierarchyIndex
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "查找对象深度索引异常,对象无效", [
            "ViewName",
            this.ViewName,
          ]),
        0);
  }
  ybo() {
    return "HasNavigation" === this.State;
  }
  Ibo() {
    return "NavigateNext" === this.State || "None" === this.State;
  }
  HasNavigationButDisActive() {
    return "HasNavigationButDisActive" === this.State;
  }
  IsNonNavigation() {
    return "NonNavigation" === this.State;
  }
  SetIsInController(i) {
    this.cbo === i ||
      ((this.cbo = i), this.UpdateAllHotKeyVisibleMode(), i) ||
      this.Tbo();
  }
  ResetStateIfNullFocus() {
    void 0 === this.ubo && this.IsNonNavigation() && (this.State = "None");
  }
  SetIsUsable(i) {
    (this.mbo = i) || this.Sbo(),
      UiNavigationViewManager_1.UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
  }
  GetIsUsable() {
    return this.mbo;
  }
  SetIsActive(i) {
    this.dce !== i &&
      ((this.dce = i),
      UiNavigationViewManager_1.UiNavigationViewManager.MarkCalculateCurrentPanelDirty());
  }
  GetIsActive() {
    return this.dce;
  }
  GetFocusListener() {
    return this.ubo;
  }
  GetActiveListenerByTag(i) {
    for (const t of this.hbo.values())
      for (const e of t.GetListenerListByTag(i))
        if (e.IsListenerActive()) return e;
  }
  GetActiveNavigationGroupByNameCheckAll(i) {
    let t = void 0;
    for (const e of this.hbo.values())
      if (
        ((t = e.GetNavigationGroup(i)),
        UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t))
      )
        return t;
    return t;
  }
  GetNavigationGroupByName(i) {
    return this.lbo?.GetNavigationGroup(i);
  }
  Lbo() {
    for (const i of this.hbo.values())
      if (i.IsInActive) {
        this.lbo = i;
        break;
      }
  }
  AddPanelConfig(i, t) {
    t.SetViewHandle(this),
      this.hbo.set(i, t),
      this.UpdateHotKeyVisibleMode(t),
      this.SetCurrentAddPanel(t);
  }
  DeletePanelConfig(i) {
    var t = this.hbo.get(i);
    t &&
      (this.hbo.delete(i),
      this.lbo === t &&
        ((this.lbo = void 0),
        (this.ubo = void 0),
        this.FindSuitableNavigation(!1)),
      t.SetViewHandle(void 0),
      this.Dbo(t.ScrollBarGroup));
  }
  GetPanelConfigMap() {
    return this.hbo;
  }
  GetPanelConfigByType(i) {
    for (const t of this.hbo.values())
      if (t.GetPanelHandle().GetType() === i) return t;
  }
  GetCurrentPanel() {
    return this.lbo;
  }
  ClearPanelConfig() {
    this.hbo.clear(), this.CSa?.Clear(), (this.lbo = void 0);
  }
  SetCurrentAddPanel(i) {
    (this._bo = i),
      (UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel =
        !0);
  }
  HasAnyPanelActive() {
    let i = !1;
    for (const t of this.hbo.values())
      if (t.IsInActive) {
        i = !0;
        break;
      }
    return i;
  }
  Rbo() {
    this.dbo.ResumeLastListener();
    var i = this.rXn();
    i
      ? ((this.State = "HasNavigation"),
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          i,
        ))
      : ((this.State = "None"), (this.ubo = void 0));
  }
  rXn() {
    if (this.ubo?.IsValid()) {
      if (this.ubo.IsInScrollOrLayoutCanFocus()) return this.ubo;
      var e = this.ubo.GetNavigationGroup(),
        a = this.ubo.GetScrollOrLayoutActor();
      for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
        var s = e.ListenerList.Get(i);
        if (
          s.IsScrollOrLayoutActor() &&
          (!a || s.GetScrollOrLayoutActor() === a) &&
          s.IsInScrollOrLayoutCanFocus()
        )
          return s;
      }
      return this.ubo.IsListenerActive() ? this.ubo : void 0;
    }
  }
  Tbo() {
    this.ybo() &&
      ((this.State = "HasNavigationButDisActive"),
      ModelManager_1.ModelManager.UiNavigationModel?.SetCursorFollowItem(
        void 0,
      ));
  }
  FindDefaultNavigation() {
    this.HasNavigationButDisActive()
      ? this.Rbo()
      : this.Ibo() && this.FindSuitableNavigation(!0);
  }
  FindSuitableNavigation(i) {
    this.MainPanel?.IsGamepadControlMouse ||
      ((this.lbo && !this.gbo) || ((this.gbo = !1), this.Lbo()),
      this.lbo
        ? this.ubo
          ? (this.State = "HasNavigation")
          : (this.lbo.FindSuitableNavigation(i),
            this.IsNonNavigation() &&
              (this.MarkRefreshHotKeyDirty(), this.Ubo(this.lbo, i)))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiNavigation", 11, "找不到合适的导航面板", [
            "ViewName",
            this.ViewName,
          ]));
  }
  FindAddPanelConfigNavigation() {
    this.IsNonNavigation() &&
      (this._bo
        ? (this._bo.FindSuitableNavigation(!1),
          this.IsNonNavigation() && this.Ubo(this._bo, !1))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "找不到添加的导航面板", [
            "ViewName",
            this.ViewName,
          ]));
  }
  Ubo(i, t) {
    for (const e of this.hbo.values())
      e !== i && this.IsNonNavigation() && e.FindSuitableNavigation(t);
  }
  NotifySuitableNavigation(i) {
    i.IsFindNavigation()
      ? ((this.State = "HasNavigation"),
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          i.Listener,
        ))
      : i.IsNotFindNavigation()
        ? this.mbo
          ? ((this.State = "NonNavigation"),
            UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
              i.Listener,
            ))
          : this.Sbo()
        : (this.ubo &&
            UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
              i.Listener,
            ),
          (this.State = "NavigateNext"));
  }
  MarkRefreshScrollDataDirty() {
    this.pbo = !0;
  }
  XCa() {
    if (this.pbo) {
      this.pbo = !1;
      var i = UE.NewArray(UE.SNavigationGroup);
      for (const t of this.hbo.values())
        t.ScrollBarGroup && i.Add(t.ScrollBarGroup);
      this.Abo(i), this.MarkRefreshHotKeyDirty();
    }
  }
  Abo(i) {
    this.dbo.AddScrollbar(i);
  }
  Dbo(i) {
    this.dbo.DeleteScrollbar(i);
  }
  FindNextScrollData() {
    this.dbo?.FindNextScrollbar();
  }
  TryFindScrollData() {
    this.dbo?.TryFindScrollbar();
  }
  GetScrollbarData() {
    return this.dbo;
  }
  UpdateFocus(i) {
    this.HasGamepadControlMouse() ||
      (this.ubo && this.ubo !== i && this.ubo.ResetNavigationState(),
      (this.ubo = i) && (this.lbo = i.PanelConfig),
      this.cbo &&
        (ModelManager_1.ModelManager.UiNavigationModel?.IsOpenLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigation",
            11,
            "设置当前的导航对象",
            ["DisplayName", i?.RootUIComp.displayName],
            ["ViewName", this.ViewName],
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(i),
        i?.ActiveNavigationState()),
      this.MarkRefreshHotKeyDirty());
  }
  ResetNavigationListener() {
    this.Sbo(), (this.gbo = !0);
  }
  UpdateHotKeyVisibleMode(i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiNavigation",
        11,
        "界面句柄刷新快捷键表现",
        ["是否激活", this.cbo],
        ["名字", this.ViewName],
      ),
      this.cbo ? i.SetHotKeyVisibleMode(4, !0) : i.SetHotKeyVisibleMode(4, !1),
      this.MarkRefreshHotKeyDirty();
  }
  UpdateAllHotKeyVisibleMode() {
    for (const i of this.hbo.values()) this.UpdateHotKeyVisibleMode(i);
  }
  Pbo() {
    if (this.vbo) {
      this.vbo = !1;
      for (const i of this.hbo.values()) i.RefreshHotKeyComponents();
    }
  }
  MarkRefreshHotKeyDirty() {
    this.vbo = !0;
  }
  xbo() {
    if (this.Mbo) {
      this.Mbo = !1;
      for (const i of this.hbo.values()) i.RefreshHotKeyTextId();
    }
  }
  MarkRefreshHotKeyTextIdDirty() {
    this.Mbo = !0;
  }
  wbo() {
    this.Ebo && ((this.Ebo = !1), this.Sbo(), this.FindSuitableNavigation(!1));
  }
  MarkRefreshNavigationDirty() {
    this.Ebo = !0;
  }
  YCa() {
    void 0 !== this.KCa &&
      (this.KCa.IsValid() &&
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          this.KCa,
        ),
      (this.KCa = void 0));
  }
  MarkSwitchNavigationFocusDirty(i) {
    this.KCa = i;
  }
  gSa() {
    this.HasGamepadControlMouse() &&
      ((this.CSa = new GamepadControlMouse_1.GamepadControlMouse(
        this.MainPanel.GamepadMouseItem,
        this,
      )),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "UiNavigation:GamepadControlMouse 初始化手柄控制鼠标",
        ["ViewName", this.ViewName],
      );
  }
  fSa() {
    this.CSa?.Tick();
  }
  HasGamepadControlMouse() {
    return this.MainPanel?.IsGamepadControlMouse ?? !1;
  }
  CanOverridePositionByGamepad(i) {
    this.CSa?.CanOverridePosition(i);
  }
  SetGamepadMouseMoveForward(i) {
    this.CSa?.MoveForwardByGamepad(i);
  }
  SetGamepadMouseMoveRight(i) {
    this.CSa?.MoveRightByGamepad(i);
  }
  SetGamepadMouseTrigger(i) {
    this.CSa?.TriggerByGamepad(i);
  }
  TickViewHandle() {
    this.wbo(), this.Pbo(), this.xbo(), this.XCa(), this.YCa(), this.fSa();
  }
}
exports.UiNavigationViewHandle = UiNavigationViewHandle;
//# sourceMappingURL=UiNavigationViewHandle.js.map
