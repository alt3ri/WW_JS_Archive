"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationViewHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  GamepadControlMouse_1 = require("../Module/GamepadControlMouse"),
  UiNavigationUtil_1 = require("../UiNavigationUtil"),
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
      (this.Vgl = !1),
      (this.fbo = Stats_1.Stat.Create("UiNavigationViewHandle")),
      (this.pbo = !1),
      (this.vbo = !1),
      (this.Mbo = !1),
      (this.Ebo = !1),
      (this.Gfa = void 0),
      (this.bIa = void 0),
      (this.TagId = i),
      (this.ViewName = t.ViewName),
      (this.MainPanel = t),
      (this.lbo = t),
      (this.dbo = new NavigationScrollbarData_1.NavigationScrollbarData()),
      this.qIa();
  }
  set State(i) {
    this.Cbo !== i &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiNavigation",
        10,
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
          Log_1.Log.Error("UiNavigation", 10, "查找对象深度索引异常,对象无效", [
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
  GetActiveListenerListByTag(i) {
    var t = [];
    for (const e of this.hbo.values())
      for (const s of e.GetListenerListByTag(i))
        s.IsListenerActive() && t.push(s);
    return t;
  }
  GetActiveListenerByTag(i) {
    return i === HotKeyViewDefine_1.EXIT_TAG ? this.UQ_() : this.DQ_(i);
  }
  DQ_(i) {
    for (const t of this.hbo.values())
      for (const e of t.GetListenerListByTag(i))
        if (e.IsListenerActive()) return e;
  }
  UQ_() {
    var i = [];
    for (const t of this.hbo.values())
      for (const e of t.GetPanelHandle().GetListenerSet())
        e.IsListenerActive() &&
          e.TagArray.Contains(HotKeyViewDefine_1.EXIT_TAG) &&
          i.push(e);
    return (
      i.sort((i, t) => (i.ExitTagPriority < t.ExitTagPriority ? -1 : 1)),
      0 < i.length ? i[0] : void 0
    );
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
      this._bo === t &&
        ((this._bo = void 0), this.ubo?.PanelConfig === t) &&
        ((this.ubo = void 0), this.FindSuitableNavigation(!1)),
      t.SetViewHandle(void 0),
      this.Dbo(t.TsScrollBarGroup));
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
    this.hbo.clear(), this.bIa?.Clear(), (this.lbo = void 0);
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
    var i = this.cXn();
    i
      ? ((this.State = "HasNavigation"),
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          i,
        ))
      : ((this.State = "None"), (this.ubo = void 0));
  }
  cXn() {
    if (this.ubo?.IsValid()) {
      if (this.ubo.IsInScrollOrLayoutCanFocus()) return this.ubo;
      var e = this.ubo.GetNavigationGroup(),
        s = this.ubo.GetScrollOrLayoutActor();
      for (let i = 0, t = e.ListenerList.length; i < t; ++i) {
        var a = e.ListenerList[i];
        if (
          a.IsScrollOrLayoutActor() &&
          (!s || a.GetScrollOrLayoutActor() === s) &&
          a.IsInScrollOrLayoutCanFocus()
        )
          return a;
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
      ((this.lbo && !this.Vgl) || ((this.Vgl = !1), this.Lbo()),
      this.lbo
        ? this.ubo
          ? (this.State = "HasNavigation")
          : (this.lbo.FindSuitableNavigation(i),
            this.IsNonNavigation() &&
              (this.MarkRefreshHotKeyDirty(), this.Ubo(this.lbo, i)))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiNavigation", 10, "找不到合适的导航面板", [
            "ViewName",
            this.ViewName,
          ]));
  }
  FindAddPanelConfigNavigation() {
    this.IsNonNavigation() &&
      this._bo &&
      (this._bo.FindSuitableNavigation(!1), this.IsNonNavigation()) &&
      this.Ubo(this._bo, !1);
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
  Nfa() {
    if (this.pbo) {
      this.pbo = !1;
      var i = [];
      for (const t of this.hbo.values())
        t.TsScrollBarGroup && i.push(t.TsScrollBarGroup);
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
            10,
            "设置当前的导航对象",
            ["DisplayName", i?.RootUIComp.displayName],
            ["ViewName", this.ViewName],
            [
              "Path",
              i
                ? UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
                    i.GetOwner(),
                  )
                : "",
            ],
          ),
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(i),
        i?.ActiveNavigationState()),
      this.MarkRefreshHotKeyDirty());
  }
  ResetNavigationListener() {
    this.Sbo(), this.MarkResetCurrentPanelDirty();
  }
  MarkResetCurrentPanelDirty() {
    this.Vgl = !0;
  }
  UpdateHotKeyVisibleMode(i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "UiNavigation",
        10,
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
  Ffa() {
    void 0 !== this.Gfa &&
      (this.Gfa.IsValid() &&
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          this.Gfa,
        ),
      (this.Gfa = void 0));
  }
  MarkSwitchNavigationFocusDirty(i) {
    this.Gfa = i;
  }
  qIa() {
    this.HasGamepadControlMouse() &&
      ((this.bIa = new GamepadControlMouse_1.GamepadControlMouse(
        this.MainPanel.GamepadMouseItem,
        this,
      )),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "UiNavigation",
        10,
        "UiNavigation:GamepadControlMouse 初始化手柄控制鼠标",
        ["ViewName", this.ViewName],
      );
  }
  GIa(i) {
    this.bIa?.Tick(i);
  }
  HasGamepadControlMouse() {
    return this.MainPanel?.IsGamepadControlMouse ?? !1;
  }
  CanOverridePositionByGamepad(i) {
    this.bIa?.CanOverridePosition(i);
  }
  SetGamepadMouseMoveForward(i) {
    this.bIa?.MoveForwardByGamepad(i);
  }
  SetGamepadMouseMoveRight(i) {
    this.bIa?.MoveRightByGamepad(i);
  }
  SetGamepadMouseTrigger(i) {
    this.bIa?.TriggerByGamepad(i);
  }
  UpdateMousePositionByItem(i) {
    this.bIa?.UpdateMousePositionByItem(i);
  }
  TickViewHandle(i) {
    this.fbo.Start(),
      this.wbo(),
      this.Pbo(),
      this.xbo(),
      this.Nfa(),
      this.Ffa(),
      this.GIa(i),
      this.fbo.Stop();
  }
}
exports.UiNavigationViewHandle = UiNavigationViewHandle;
//# sourceMappingURL=UiNavigationViewHandle.js.map
