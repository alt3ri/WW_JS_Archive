"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsUiNavigationPanelConfig = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  UiNavigationUtil_1 = require("../UiNavigationUtil"),
  FindNavigationResult_1 = require("./FindNavigationResult"),
  NavigationGroup_1 = require("./NavigationGroup"),
  NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator");
class TsUiNavigationPanelConfig extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.ViewName = ""),
      (this.Independent = !0),
      (this.IsChildPanel = !1),
      (this.DefaultNavigationActor = void 0),
      (this.DynamicListenerConfigMap = new UE.TMap()),
      (this.NormalGroup = void 0),
      (this.BookmarkGroup = void 0),
      (this.ScrollBarGroup = void 0),
      (this.AllowNavigateInKeyBoard = !1),
      (this.InteractiveTag = ""),
      (this.TsScrollBarGroup = void 0),
      (this.ViewHandle = void 0),
      (this.IsInActive = !1),
      (this.PanelHandle = void 0),
      (this.ViewHandleCacheFunctionList = []),
      (this.IncId = 0),
      (this.HotKeyItemSet = void 0),
      (this.CacheHotKeyStateMap = void 0),
      (this.GamepadMouseActor = void 0),
      (this.GamepadMouseItemInternal = void 0);
  }
  AwakeBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (this.InitDefaultParam(), this.InitPanelHandle());
  }
  StartBP() {
    GlobalData_1.GlobalData.GameInstance && this.NavigationViewCreate();
  }
  OnEnableBP() {
    GlobalData_1.GlobalData.GameInstance &&
      ((this.IsInActive = !0),
      this.HandleAddPanel(),
      this.HandleUIActivePanel(),
      this.HandleChildUIActivePanel());
  }
  OnDisableBP() {
    GlobalData_1.GlobalData.GameInstance &&
      ((this.IsInActive = !1),
      this.HandleAddPanel(),
      this.HandleUIActivePanel(),
      this.HandleChildUIActivePanel());
  }
  HandleUIActivePanel() {
    this.Independent &&
      this.HandleViewHandleFunction(() => {
        this.ViewHandle?.SetIsActive(this.IsInActive);
      });
  }
  HandleAddPanel() {
    this.IsInActive && this.ViewHandle?.SetCurrentAddPanel(this);
  }
  HandleChildUIActivePanel() {
    this.IsChildPanel &&
      this.Independent &&
      this.ViewHandle?.SetIsUsable(this.IsInActive);
  }
  OnDestroyBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (this.PanelHandle.Clear(),
      this.NavigationViewDestroy(),
      (this.ViewHandle = void 0));
  }
  InitDefaultParam() {
    this.HotKeyItemSet = new Set();
  }
  NavigationViewCreate() {
    (this.IncId = ++UiNavigationUtil_1.UiNavigationUtil.IncId),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.NavigationViewCreate,
        this.IncId,
        this.GetOwner(),
      );
  }
  NavigationViewDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationViewDestroy,
      this.IncId,
      this.GetOwner(),
    );
  }
  GetGroupMap() {
    var e = new Map();
    for (let i = 0, t = this.NormalGroup.Num(); i < t; ++i) {
      var s = this.NormalGroup.Get(i),
        a = ((s.GroupType = 0), new NavigationGroup_1.NavigationGroup(s));
      e.set(s.GroupName, a);
    }
    for (let i = 0, t = this.BookmarkGroup.Num(); i < t; ++i) {
      var o = this.BookmarkGroup.Get(i),
        n = ((o.GroupType = 1), new NavigationGroup_1.NavigationGroup(o));
      e.set(o.GroupName, n);
    }
    return (
      this.ScrollBarGroup &&
        ((this.ScrollBarGroup.GroupType = 2),
        (this.TsScrollBarGroup = new NavigationGroup_1.NavigationGroup(
          this.ScrollBarGroup,
        )),
        e.set(this.ScrollBarGroup.GroupName, this.TsScrollBarGroup)),
      e
    );
  }
  InitPanelHandle() {
    (this.PanelHandle =
      NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.GetPanelHandle(
        this.InteractiveTag,
      )),
      this.PanelHandle?.SetGroupMap(this.GetGroupMap()),
      this.PanelHandle.SetDefaultNavigationListenerList(
        this.DefaultNavigationActor,
      );
  }
  HandleViewHandleFunction(i) {
    this.ViewHandle
      ? i()
      : (this.ViewHandleCacheFunctionList ||
          (this.ViewHandleCacheFunctionList = []),
        this.ViewHandleCacheFunctionList.push(i));
  }
  ExecuteViewHandleFunction() {
    if (this.ViewHandleCacheFunctionList) {
      for (const i of this.ViewHandleCacheFunctionList) i();
      this.ViewHandleCacheFunctionList = [];
    }
  }
  RegisterNavigationListener(i) {
    var t;
    this.PanelHandle.AddListener(i),
      i.GetNavigationComponent().SetPanelHandle(this.PanelHandle),
      i.GetNavigationComponent().Start(),
      StringUtils_1.StringUtils.IsEmpty(i.GroupName) ||
        ((t = this.PanelHandle.GetNavigationGroup(i.GroupName))
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "UiNavigation",
                11,
                "加入监听组件到导航组",
                ["导航组名字", i.GroupName],
                ["DisplayName", i.RootUIComp.displayName],
              ),
            t.AddListener(i),
            2 === t.GroupType &&
              this.HandleViewHandleFunction(() => {
                this.ViewHandle?.MarkRefreshScrollDataDirty();
              }))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "UiNavigation",
              11,
              "导航监听组件找不到对应的导航组",
              ["导航组名字", i.GroupName],
              [
                "Path",
                UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
                  i.RootUIComp.GetOwner(),
                ),
              ],
            ));
  }
  DynamicListenerConfigHandle(i) {
    var t = i.DynamicTag;
    StringUtils_1.StringUtils.IsBlank(t) ||
      StringUtils_1.StringUtils.IsBlank(i.GroupName) ||
      (this.PanelHandle.GetNavigationGroup(i.GroupName)
        ? (t = this.DynamicListenerConfigMap.Get(t))
          ? (t.LayoutActor && (i.LayoutActor = t.LayoutActor),
            t.ScrollActor && (i.ScrollViewActor = t.ScrollActor),
            this.PanelHandle.ReplaceDefaultNavigationListener(i, t.Index))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "UiNavigation",
              11,
              "导航监听组件找不到对应的动态配置",
              ["导航组名字", i.GroupName],
              ["ViewName", this.ViewName],
            )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiNavigation",
            11,
            "导航监听组件找不到对应的导航组",
            ["导航组名字", i.GroupName],
            ["ViewName", this.ViewName],
          ));
  }
  UnRegisterNavigationListener(e) {
    this.PanelHandle.DeleteListener(e);
    var s = this.PanelHandle.GetNavigationGroup(e.GroupName);
    if (s)
      for (let i = 0, t = s.ListenerList.length; i < t; ++i)
        if (s.ListenerList[i].GetOwner() === e.GetOwner()) {
          s.RemoveListenerByIndex(i);
          break;
        }
  }
  SetViewHandle(i) {
    (this.ViewHandle = i), this.ExecuteViewHandleFunction();
  }
  GetNavigationGroup(i) {
    return this.PanelHandle.GetNavigationGroup(i);
  }
  GetFocusListener() {
    return this.ViewHandle?.GetFocusListener();
  }
  GetPanelHandle() {
    return this.PanelHandle;
  }
  FindSuitableNavigation(i) {
    var t = new FindNavigationResult_1.FindNavigationResult();
    if (this.IsAllowNavigate())
      if (this.RootUIComp.IsUIActiveInHierarchy()) {
        for (const s of this.PanelHandle.GetSuitableNavigationListenerList(i))
          if (s) {
            let i = s;
            if (s.IsScrollOrLayoutActor()) {
              if (!s.IsScrollOrLayoutActive()) continue;
              if (s.IsInScrollOrLayoutAnimation()) {
                t.Result = 4;
                break;
              }
              var e = this.PanelHandle.GetLoopOrLayoutListener(s);
              if (!e) continue;
              i = e;
            } else
              s.GetNavigationGroup()?.SuitableListenerByNoDynamic &&
                (e = this.PanelHandle.GetSuitableListenerWithoutLayout(s)) &&
                (i = e);
            if (i.IsCanFocus()) {
              if (!i.IsRegisterToPanelConfig()) {
                t.Result = 5;
                break;
              }
              (t.Result = 1), (t.Listener = i);
              break;
            }
          }
        0 === t.Result && (t.Result = 2), this.PanelHandle.NotifyFindResult(t);
      } else t.Result = 2;
    else t.Result = 2;
    this.ViewHandle.NotifySuitableNavigation(t);
  }
  CheckReFindCondition() {
    return !(
      !this.ViewHandle ||
      (!this.IsInActive && this.Independent
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiNavigation",
              11,
              "[ReFindNavigation]独立界面刚刚隐藏,触发导航对象取消不做通知处理",
            ),
          1)
        : this.ViewHandle.HasNavigationButDisActive()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiNavigation",
                11,
                "[ReFindNavigation]界面已经处于HasNavigationButDisActive状态,触发导航对象取消不做通知处理",
              ),
            1)
          : !this.Independent && !this.ViewHandle.GetIsActive())
    );
  }
  ReFindNavigation() {
    this.CheckReFindCondition() && this.ViewHandle.MarkRefreshNavigationDirty();
  }
  ReFindScrollbar() {
    this.ViewHandle && this.ViewHandle.FindNextScrollData();
  }
  TryFindScrollbar() {
    this.ViewHandle && this.ViewHandle.TryFindScrollData();
  }
  FindNavigationInNoneState() {
    this.ViewHandle &&
      this.ViewHandle.IsNonNavigation() &&
      this.ViewHandle.MarkRefreshNavigationDirty();
  }
  IsAllowNavigate() {
    var i = Info_1.Info.IsInGamepad() ?? !1;
    return this.AllowNavigateInKeyBoard || i;
  }
  AddHotKeyItem(i) {
    this.HotKeyItemSet.add(i), this.HandleAsyncHotKeyState(i);
  }
  HandleAsyncHotKeyState(i) {
    for (var [t, e] of this.GetOrCreateCacheHotKeyStateMap())
      for (const s of i.GetHotKeyComponentArray())
        s.SetVisibleMode(t, e),
          s.RefreshSelfHotKeyState(this.ViewHandle),
          s.RefreshSelfHotKeyText(this.ViewHandle);
  }
  GetOrCreateCacheHotKeyStateMap() {
    return (
      this.CacheHotKeyStateMap || (this.CacheHotKeyStateMap = new Map()),
      this.CacheHotKeyStateMap
    );
  }
  DeleteKeyItem(i) {
    this.HotKeyItemSet.delete(i);
  }
  SetHotKeyVisibleMode(i, t) {
    if ((this.GetOrCreateCacheHotKeyStateMap().set(i, t), this.HotKeyItemSet))
      for (const e of this.HotKeyItemSet)
        for (const s of e.GetHotKeyComponentArray()) s.SetVisibleMode(i, t);
  }
  NotifyListenerFocus(i) {
    this.IsAllowNavigate() && this.ViewHandle.UpdateFocus(i);
  }
  UpdateHotKeyTextForce(i, t) {
    for (const s of this.HotKeyItemSet)
      for (const a of s.GetHotKeyComponentArray()) {
        var e = a.GetBindButtonTag();
        i.Contains(e) && a.SetHotKeyDescTextForce(t);
      }
  }
  GetListenerListByTag(i) {
    return this.PanelHandle.GetListenerListByTag(i);
  }
  RefreshHotKeyComponents() {
    if (this.HotKeyItemSet)
      for (const i of this.HotKeyItemSet)
        for (const t of i.GetHotKeyComponentArray())
          t.RefreshSelfHotKeyState(this.ViewHandle),
            t.RefreshSelfHotKeyText(this.ViewHandle);
  }
  RefreshHotKeyTextId() {
    if (this.HotKeyItemSet)
      for (const i of this.HotKeyItemSet)
        for (const t of i.GetHotKeyComponentArray())
          t.RefreshSelfHotKeyText(this.ViewHandle);
  }
  get IsGamepadControlMouse() {
    return (
      !!this.Independent &&
      !!this.GamepadMouseActor &&
      this.GamepadMouseActor.IsValid()
    );
  }
  get GamepadMouseItem() {
    return (
      this.GamepadMouseItemInternal ||
        (this.GamepadMouseItemInternal =
          this.GamepadMouseActor?.GetComponentByClass(UE.UIItem.StaticClass())),
      this.GamepadMouseItemInternal
    );
  }
}
(exports.TsUiNavigationPanelConfig = TsUiNavigationPanelConfig),
  (exports.default = TsUiNavigationPanelConfig);
//# sourceMappingURL=TsUiNavigationPanelConfig.js.map
