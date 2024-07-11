"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationViewHandle = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const ModelManager_1 = require("../../../Manager/ModelManager");
const NavigationScrollbarData_1 = require("./NavigationScrollbarData");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationNewController_1 = require("./UiNavigationNewController");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationViewHandle {
  constructor(i, t) {
    (this.TagId = 0),
      (this.ViewName = ""),
      (this.uBo = new Map()),
      (this.MainPanel = void 0),
      (this.cBo = void 0),
      (this.mBo = void 0),
      (this.dBo = void 0),
      (this.CBo = !0),
      (this.dce = !0),
      (this.gBo = !0),
      (this.fBo = void 0),
      (this.pBo = "None"),
      (this.vBo = !1),
      (this.MBo = void 0),
      (this.SBo = !1),
      (this.EBo = !1),
      (this.yBo = !1),
      (this.IBo = !1),
      (this.TagId = i),
      (this.ViewName = t.ViewName),
      (this.MainPanel = t),
      (this.cBo = t),
      (this.fBo = new NavigationScrollbarData_1.NavigationScrollbarData());
  }
  set State(i) {
    this.pBo !== i &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "当前界面句柄状态发生变更",
        ["当前状态", i],
        ["之前状态", this.pBo],
      ),
      (this.pBo = i);
  }
  get State() {
    return this.pBo;
  }
  TBo() {
    (this.State = "None"),
      void 0 !== this.dBo &&
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          void 0,
        );
    for (const i of this.uBo.values())
      i.GetPanelHandle().ResetGroupConfigMemory();
  }
  GetDepth() {
    return this.cBo.IsValid() && this.cBo.RootUIComp.IsValid()
      ? this.cBo.RootUIComp.flattenHierarchyIndex
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "查找对象深度索引异常,对象无效", [
            "ViewName",
            this.ViewName,
          ]),
        0);
  }
  LBo() {
    return this.State === "HasNavigation";
  }
  DBo() {
    return this.State === "NavigateNext" || this.State === "None";
  }
  HasNavigationButDisActive() {
    return this.State === "HasNavigationButDisActive";
  }
  IsNonNavigation() {
    return this.State === "NonNavigation";
  }
  SetIsInController(i) {
    this.CBo === i ||
      ((this.CBo = i), this.UpdateAllHotKeyVisibleMode(), i) ||
      this.RBo();
  }
  ResetStateIfNullFocus() {
    void 0 === this.dBo && this.IsNonNavigation() && (this.State = "None");
  }
  SetIsUsable(i) {
    (this.gBo = i) || this.TBo(),
      UiNavigationViewManager_1.UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
  }
  GetIsUsable() {
    return this.gBo;
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
    return this.dBo;
  }
  GetActiveListenerByTag(i) {
    for (const t of this.uBo.values())
      for (const e of t.GetListenerListByTag(i))
        if (e.IsListenerActive()) return e;
  }
  GetActiveNavigationGroupByNameCheckAll(i) {
    let t = void 0;
    for (const e of this.uBo.values())
      if (
        ((t = e.GetNavigationGroup(i)),
        UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t))
      )
        return t;
    return t;
  }
  GetNavigationGroupByName(i) {
    return this.cBo?.GetNavigationGroup(i);
  }
  UBo() {
    for (const i of this.uBo.values())
      if (i.IsInActive) {
        this.cBo = i;
        break;
      }
  }
  AddPanelConfig(i, t) {
    t.SetViewHandle(this),
      this.uBo.set(i, t),
      this.UpdateHotKeyVisibleMode(t),
      this.SetCurrentAddPanel(t);
  }
  DeletePanelConfig(i) {
    const t = this.uBo.get(i);
    t &&
      (this.uBo.delete(i),
      this.cBo === t &&
        ((this.cBo = void 0),
        (this.dBo = void 0),
        this.FindSuitableNavigation(!1)),
      t.SetViewHandle(void 0),
      this.ABo(t.ScrollBarGroup));
  }
  GetPanelConfigMap() {
    return this.uBo;
  }
  GetPanelConfigByType(i) {
    for (const t of this.uBo.values())
      if (t.GetPanelHandle().GetType() === i) return t;
  }
  GetCurrentPanel() {
    return this.cBo;
  }
  ClearPanelConfig() {
    this.uBo.clear(), (this.cBo = void 0);
  }
  SetCurrentAddPanel(i) {
    (this.mBo = i),
      (UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshCurrentPanel =
        !0);
  }
  HasAnyPanelActive() {
    let i = !1;
    for (const t of this.uBo.values())
      if (t.IsInActive) {
        i = !0;
        break;
      }
    return i;
  }
  PBo() {
    this.fBo.ResumeLastListener();
    const i = this.aFs();
    i
      ? ((this.State = "HasNavigation"),
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          i,
        ))
      : ((this.State = "None"), (this.dBo = void 0));
  }
  aFs() {
    if (this.dBo?.IsValid()) {
      if (this.dBo.IsInScrollOrLayoutCanFocus()) return this.dBo;
      const e = this.dBo.GetNavigationGroup();
      const a = this.dBo.GetScrollOrLayoutActor();
      for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
        const s = e.ListenerList.Get(i);
        if (
          s.IsScrollOrLayoutActor() &&
          (!a || s.GetScrollOrLayoutActor() === a) &&
          s.IsInScrollOrLayoutCanFocus()
        )
          return s;
      }
      return this.dBo.IsListenerActive() ? this.dBo : void 0;
    }
  }
  RBo() {
    this.LBo() &&
      ((this.State = "HasNavigationButDisActive"),
      ModelManager_1.ModelManager.UiNavigationModel?.SetCursorFollowItem(
        void 0,
      ));
  }
  FindDefaultNavigation() {
    this.HasNavigationButDisActive()
      ? this.PBo()
      : this.DBo() && this.FindSuitableNavigation(!0);
  }
  FindSuitableNavigation(i) {
    (this.cBo && !this.vBo) || ((this.vBo = !1), this.UBo()),
      this.cBo
        ? this.dBo
          ? (this.State = "HasNavigation")
          : (this.cBo.FindSuitableNavigation(i),
            this.IsNonNavigation() &&
              (this.MarkRefreshHotKeyDirty(), this.xBo(this.cBo, i)))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiNavigation", 11, "找不到合适的导航面板", [
            "ViewName",
            this.ViewName,
          ]);
  }
  FindAddPanelConfigNavigation() {
    this.IsNonNavigation() &&
      (this.mBo
        ? (this.mBo.FindSuitableNavigation(!1),
          this.IsNonNavigation() && this.xBo(this.mBo, !1))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "找不到添加的导航面板", [
            "ViewName",
            this.ViewName,
          ]));
  }
  xBo(i, t) {
    for (const e of this.uBo.values())
      e !== i && this.IsNonNavigation() && e.FindSuitableNavigation(t);
  }
  NotifySuitableNavigation(i) {
    i.IsFindNavigation()
      ? ((this.State = "HasNavigation"),
        UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
          i.Listener,
        ))
      : i.IsNotFindNavigation()
        ? this.gBo
          ? ((this.State = "NonNavigation"),
            UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
              i.Listener,
            ))
          : this.TBo()
        : (this.dBo &&
            UiNavigationNewController_1.UiNavigationNewController.SwitchNavigationFocus(
              i.Listener,
            ),
          (this.State = "NavigateNext"));
  }
  MarkRefreshScrollDataDirty() {
    this.SBo = !0;
  }
  RefreshScrollData() {
    if (this.SBo) {
      this.SBo = !1;
      const i = UE.NewArray(UE.SNavigationGroup);
      for (const t of this.uBo.values())
        t.ScrollBarGroup && i.Add(t.ScrollBarGroup);
      this.wBo(i), this.MarkRefreshHotKeyDirty();
    }
  }
  wBo(i) {
    this.fBo.AddScrollbar(i);
  }
  ABo(i) {
    this.fBo.DeleteScrollbar(i);
  }
  FindNextScrollData() {
    this.fBo?.FindNextScrollbar();
  }
  TryFindScrollData() {
    this.fBo?.TryFindScrollbar();
  }
  GetScrollbarData() {
    return this.fBo;
  }
  UpdateFocus(i) {
    this.dBo && this.dBo !== i && this.dBo.ResetNavigationState(),
      (this.dBo = i) && (this.cBo = i.PanelConfig),
      this.CBo &&
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
      this.MarkRefreshHotKeyDirty();
  }
  ResetNavigationListener() {
    this.TBo(), (this.vBo = !0);
  }
  UpdateHotKeyVisibleMode(i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "界面句柄刷新快捷键表现",
        ["是否激活", this.CBo],
        ["名字", this.ViewName],
      ),
      this.CBo ? i.SetHotKeyVisibleMode(4, !0) : i.SetHotKeyVisibleMode(4, !1),
      this.MarkRefreshHotKeyDirty();
  }
  UpdateAllHotKeyVisibleMode() {
    for (const i of this.uBo.values()) this.UpdateHotKeyVisibleMode(i);
  }
  BBo() {
    if (this.EBo) {
      this.EBo = !1;
      for (const i of this.uBo.values()) i.RefreshHotKeyComponents();
    }
  }
  MarkRefreshHotKeyDirty() {
    this.EBo = !0;
  }
  bBo() {
    if (this.yBo) {
      this.yBo = !1;
      for (const i of this.uBo.values()) i.RefreshHotKeyTextId();
    }
  }
  MarkRefreshHotKeyTextIdDirty() {
    this.yBo = !0;
  }
  qBo() {
    this.IBo && ((this.IBo = !1), this.TBo(), this.FindSuitableNavigation(!1));
  }
  MarkRefreshNavigationDirty() {
    this.IBo = !0;
  }
  TickViewHandle() {
    this.qBo(), this.BBo(), this.bBo(), this.RefreshScrollData();
  }
}
exports.UiNavigationViewHandle = UiNavigationViewHandle;
// # sourceMappingURL=UiNavigationViewHandle.js.map
