"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsUiNavigationBehaviorListener = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  NavigationSelectableCreator_1 = require("./Selectable/NavigationSelectableCreator"),
  UiNavigationCursorModule_1 = require("./UiNavigationCursorModule"),
  UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
  UiNavigationLogic_1 = require("./UiNavigationLogic"),
  UiNavigationModeModule_1 = require("./UiNavigationModeModule"),
  UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class TsUiNavigationBehaviorListener extends UE.UINavigationBehaviour {
  constructor() {
    super(...arguments),
      (this.GroupName = ""),
      (this.TagArray = void 0),
      (this.ShieldHotKeyIndexArray = void 0),
      (this.ScrollViewActor = void 0),
      (this.GridBaseActor = void 0),
      (this.LayoutActor = void 0),
      (this.HotKeyTipsTextIdMap = void 0),
      (this.ClickPivot = new UE.Vector2D(0.5, 0.5)),
      (this.InsideGroupActor = void 0),
      (this.InsideActorMap = void 0),
      (this.ScrollbarIndex = 0),
      (this.InteractiveTag = ""),
      (this.DynamicTag = ""),
      (this.OpenAdsorbed = !1),
      (this.AdsorbedDistance = 0),
      (this.AdsorbedPivot = new UE.Vector2D(0.5, 0.5)),
      (this.ScrollView = void 0),
      (this.LayoutBase = void 0),
      (this.TextChangeComponent = void 0),
      (this.PanelConfig = void 0),
      (this.InNavigation = !1),
      (this.ChildTagMap = void 0),
      (this.NavigationComponent = void 0),
      (this.IsAwakeCalled = !1),
      (this.IsStartCalled = !1),
      (this.IsInitLayout = !1),
      (this.IsInitScroll = !1),
      (this.IsFocusScrollbar = !1),
      (this.AnimController = void 0),
      (this.IsInitAnimController = !1),
      (this.NavigationMode = void 0),
      (this.ModeModule = void 0),
      (this.Cursor = void 0),
      (this.CursorModule = void 0);
  }
  AwakeBP() {
    GlobalData_1.GlobalData.GameInstance && this.AwakeInit();
  }
  StartBP() {
    GlobalData_1.GlobalData.GameInstance && this.StartInit();
  }
  OnNotifyNavigationEnterBP(i) {
    !GlobalData_1.GlobalData.GameInstance ||
      StringUtils_1.StringUtils.IsBlank(this.GroupName) ||
      (this.PanelConfig?.IsAllowNavigate() &&
        this.NavigationComponent.HandlePointerEnter(i) &&
        this.SetListenerInNavigation());
  }
  OnNotifyNavigationSelectBP(i) {
    !GlobalData_1.GlobalData.GameInstance ||
      StringUtils_1.StringUtils.IsBlank(this.GroupName) ||
      (this.PanelConfig?.IsAllowNavigate() &&
        this.NavigationComponent.HandlePointerSelect(i) &&
        this.SetListenerInNavigation());
  }
  OnCheckCanSetNavigationBP() {
    return (
      (!this.ScrollView ||
        !(this.ScrollView instanceof UE.UILoopScrollViewComponent) ||
        -1 === this.ScrollView.NavigationIndex ||
        this.ScrollView.NavigationIndex !== this.LoopScrollViewGridIndex) &&
      this.InNavigation
    );
  }
  OnCheckLoopScrollChangeNavigationBP() {
    return (
      !!this.ScrollView &&
      !!this.ScrollView.IsChangeNavigation &&
      (this.ScrollView.ResetIsChangeNavigation(), !0)
    );
  }
  OnEnableBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(),
      this.RefreshPanelConfig(),
      this.TryFindScrollbar());
  }
  OnDisableBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(),
      this.DisActiveHandle());
  }
  OnNotifyInteractiveBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (this.NavigationComponent.SetIsInteractive(!0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiNavigation", 11, "导航对象可交互", [
          "name",
          this.RootUIComp.displayName,
        ]),
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey());
  }
  OnNotifyNotInteractiveBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (this.NavigationComponent.SetIsInteractive(!1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiNavigation", 11, "导航对象不可交互", [
          "name",
          this.RootUIComp.displayName,
        ]),
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(),
      this.DisActiveHandle());
  }
  OnDestroyBP() {
    GlobalData_1.GlobalData.GameInstance &&
      (this.DisActiveHandle(),
      this.UnBindLoopScrollView(),
      this.UnRegisterListenerToPanel(),
      this.NavigationComponent?.Clear(),
      (this.PanelConfig = void 0),
      (this.LayoutBase = void 0),
      (this.ScrollView = void 0));
  }
  AwakeInit() {
    this.IsAwakeCalled ||
      ((this.InNavigation = !1),
      (this.ModeModule = new UiNavigationModeModule_1.UiNavigationModeModule(
        this,
      )),
      (this.CursorModule =
        new UiNavigationCursorModule_1.UiNavigationCursorModule(this.Cursor)),
      (this.ChildTagMap = new Map()),
      this.CreateNavigationComponent(),
      (this.IsAwakeCalled = !0));
  }
  StartInit() {
    this.IsStartCalled ||
      (this.SetTextChangeComponent(),
      this.InitInsideGroupActor(),
      this.NotifyParentListener(this),
      this.RegisterListenerToPanel(),
      this.InitScrollViewAndLayout(),
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(),
      this.RefreshPanelConfig(),
      (this.IsStartCalled = !0));
  }
  InitScrollViewAndLayout() {
    this.InitScrollView(), this.InitLayout();
  }
  InitAnimController() {
    var i;
    this.IsInitAnimController ||
      ((this.IsInitAnimController = !0),
      this.ScrollView &&
        ((i = this.ScrollView?.GetContent()),
        (this.AnimController = i?.GetComponentByClass(
          UE.UIInturnAnimController.StaticClass(),
        ))),
      this.LayoutBase &&
        (this.AnimController = this.LayoutBase?.GetOwner().GetComponentByClass(
          UE.UIInturnAnimController.StaticClass(),
        )));
  }
  InitScrollView() {
    !this.ScrollViewActor ||
      this.IsInitScroll ||
      ((this.ScrollView = this.ScrollViewActor.GetComponentByClass(
        UE.UIScrollViewWithScrollbarComponent.StaticClass(),
      )),
      this.BindLoopScrollView(),
      (this.IsInitScroll = !0),
      this.ScrollView) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigation", 11, "找不到滚动列表组件", [
          "节点",
          this.RootUIComp.displayName,
        ]));
  }
  InitLayout() {
    !this.LayoutActor ||
      this.IsInitLayout ||
      ((this.LayoutBase = this.LayoutActor.GetComponentByClass(
        UE.UILayoutBase.StaticClass(),
      )),
      (this.IsInitLayout = !0),
      this.LayoutBase) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiNavigation", 11, "找不到循环滚动列表组件", [
          "节点",
          this.RootUIComp.displayName,
        ]));
  }
  TryFindScrollbar() {
    this.PanelConfig && this.PanelConfig.TryFindScrollbar();
  }
  DisActiveHandle() {
    this.PanelConfig &&
      (this.InNavigation &&
        ((this.InNavigation = !1), this.PanelConfig.ReFindNavigation()),
      this.IsFocusScrollbar) &&
      this.PanelConfig.ReFindScrollbar();
  }
  SetTextChangeComponent() {
    this.TextChangeComponent = this.GetOwner().GetComponentByClass(
      UE.TsUiNavigationTextChangeListener_C.StaticClass(),
    );
  }
  NotifyParentListener(i) {
    var t = UiNavigationLogic_1.UiNavigationLogic.FindUpNavigationListener(
      this.GetOwner(),
    );
    t && t.RegisterChildListener(i);
  }
  RegisterChildListener(s) {
    for (let i = 0, t = s.TagArray.Num(); i < t; ++i) {
      var e = s.TagArray.Get(i);
      this.ChildTagMap.set(e, s);
    }
    this.NotifyParentListener(s);
  }
  InitInsideGroupActor() {
    this.InsideGroupActor || (this.InsideGroupActor = this.GetOwner());
  }
  BindLoopScrollView() {
    var i;
    this.HasLoopScrollView() &&
      ((i = this.GetSelectableComponent()),
      this.ScrollView.BindParentUIItem(i));
  }
  UnBindLoopScrollView() {
    var i;
    this.HasLoopScrollView() &&
      this.ScrollView.IsValid() &&
      ((i = this.GetSelectableComponent()),
      this.ScrollView.UnBindParentUIItem(i));
  }
  HasLoopScrollView() {
    return (
      !!this.ScrollView &&
      this.ScrollView instanceof UE.UILoopScrollViewComponent
    );
  }
  HasDynamicScrollView() {
    return (
      !!this.ScrollView &&
      this.ScrollView instanceof UE.UIDynScrollViewComponent
    );
  }
  RegisterListenerToPanel() {
    (this.PanelConfig =
      UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(
        this.GetOwner(),
      )),
      this.PanelConfig &&
        (this.PanelConfig.RegisterNavigationListener(this),
        this.PanelConfig.DynamicListenerConfigHandle(this));
  }
  UnRegisterListenerToPanel() {
    this.PanelConfig && this.PanelConfig.UnRegisterNavigationListener(this);
  }
  RefreshPanelConfig() {
    StringUtils_1.StringUtils.IsBlank(this.GroupName) ||
      (this.PanelConfig && this.PanelConfig.FindNavigationInNoneState());
  }
  CreateNavigationComponent() {
    (this.NavigationComponent =
      NavigationSelectableCreator_1.NavigationSelectableCreator.CreateNavigationBehavior(
        this.GetOwner(),
        this.InteractiveTag,
      )),
      this.NavigationComponent.SetListener(this),
      this.NavigationComponent.Init();
  }
  GetNavigationComponent() {
    return (
      this.NavigationComponent || this.CreateNavigationComponent(),
      this.NavigationComponent
    );
  }
  GetSelectableComponent() {
    return this.GetBehaviorComponent();
  }
  GetBehaviorComponent() {
    return this.GetNavigationComponent().GetSelectable();
  }
  GetSceneComponent() {
    return this.GetBehaviorComponent().GetRootComponent();
  }
  GetChildListenerByTag(i) {
    return this.ChildTagMap.get(i);
  }
  IsScrollOrLayoutActor() {
    return (
      this.InitScrollViewAndLayout(), !!(this.ScrollView ?? this.LayoutBase)
    );
  }
  GetScrollOrLayoutActor() {
    return this.ScrollViewActor || this.LayoutActor || void 0;
  }
  IsScrollOrLayoutActive() {
    return (
      this.InitScrollViewAndLayout(),
      this.ScrollView
        ? this.ScrollView.RootUIComp.IsUIActiveInHierarchy()
        : !!this.LayoutBase &&
          this.LayoutBase.RootUIComp.IsUIActiveInHierarchy()
    );
  }
  IsInScrollOrLayoutAnimation() {
    return this.InitAnimController(), this.AnimController?.IsPlaying() ?? !1;
  }
  IsInLoopScrollDisplay() {
    var i;
    return (
      !this.HasLoopScrollView() ||
      -1 === (i = this.ScrollView).NavigationIndex ||
      i.NavigationIndex === this.LoopScrollViewGridIndex
    );
  }
  IsInLoopScrollDisplayByGridActor() {
    var i, t, s;
    return (
      !this.GridBaseActor ||
      !this.HasLoopScrollView() ||
      ((i = this.ScrollView),
      (t = (0, puerts_1.$ref)(3)),
      (s = (0, puerts_1.$ref)(3)),
      i.GetOutOfBottomBoundsType(this.GridBaseActor.GetUIItem(), t, s),
      i.Vertical
        ? 0 === (0, puerts_1.$unref)(t)
        : 0 === (0, puerts_1.$unref)(s))
    );
  }
  GetDynErrorTolerance(i) {
    var t = this.RootUIComp.RelativeScale3D;
    let s = MathUtils_1.MathUtils.KindaSmallNumber;
    return (
      i
        ? ((i = t.Y - 1), (s += (i * this.RootUIComp.Height) / 2))
        : ((i = t.X - 1), (s += (i * this.RootUIComp.Width) / 2)),
      s
    );
  }
  IsInDynScrollDisplay() {
    var i, t, s, e;
    return (
      !this.HasDynamicScrollView() ||
      ((i = this.ScrollView),
      (t = (0, puerts_1.$ref)(3)),
      (s = (0, puerts_1.$ref)(3)),
      (e = this.GetDynErrorTolerance(i.Vertical)),
      i.GetOutOfBottomBoundsType(this.RootUIComp, t, s, e),
      i.Vertical
        ? 0 === (0, puerts_1.$unref)(t)
        : 0 === (0, puerts_1.$unref)(s))
    );
  }
  IsInScrollOrLayoutCanFocus() {
    return (
      !!this.NavigationComponent &&
      this.NavigationComponent.CanFocusInScrollOrLayout()
    );
  }
  IsCanFocus() {
    return !!this.NavigationComponent && this.NavigationComponent.CanFocus();
  }
  IsRegisterToPanelConfig() {
    return this.IsStartCalled;
  }
  IsListenerActive() {
    return !!this.NavigationComponent && this.NavigationComponent.IsActive();
  }
  IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
    return (
      !!this.NavigationComponent &&
      this.NavigationComponent.IsIgnoreScrollOrLayoutCheckInSwitchGroup()
    );
  }
  ResetNavigationState() {
    (this.InNavigation = !1),
      this.UpdateNavigationState(),
      this.UpdateLoopNavigationIndex(-1);
  }
  ActiveNavigationState() {
    (this.InNavigation = !0),
      this.UpdateNavigationState(),
      this.UpdateLoopNavigationIndex(this.LoopScrollViewGridIndex);
  }
  UpdateNavigationState() {
    var i = this.GetBehaviorComponent();
    i?.IsValid() &&
      i instanceof UE.UISelectableComponent &&
      (i.SetSelectionState(i.GetSelectionState()), i.ApplySelectionState(!0));
  }
  UpdateLoopNavigationIndex(i) {
    this.ScrollViewActor &&
      this.ScrollView instanceof UE.UILoopScrollViewComponent &&
      this.ScrollView.SetNavigationIndex(i);
  }
  SetListenerInNavigation() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup
      ? ((UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
          !1),
        this.PanelConfig.NotifyListenerFocus(this))
      : (this.InNavigation && this.IsInLoopScrollDisplay()) ||
        this.PanelConfig.NotifyListenerFocus(this);
  }
  GetNavigationGroup() {
    return this.PanelConfig?.GetNavigationGroup(this.GroupName);
  }
  IsSelectedToggle() {
    var i = this.GetSelectableComponent();
    return !!i && 1 === i.ToggleState;
  }
  NotifyTextChangeByComponent(i) {
    this.PanelConfig &&
      this.PanelConfig.UpdateHotKeyTextForce(this.TagArray, i);
  }
  GetTipsTextIdByState() {
    return this.NavigationComponent.GetTipsTextId();
  }
  GetTextChangeComponent() {
    return this.TextChangeComponent;
  }
  FindNavigation(i) {
    var t;
    return 0 === i
      ? this.GetSceneComponent()
      : 6 === i
        ? (t = this.ModeModule.FindActorByDirection(1)) &&
          t !== this.GetSceneComponent()
          ? t
          : this.ModeModule.FindActorByDirection(3)
        : 5 === i
          ? (t = this.ModeModule.FindActorByDirection(2)) &&
            t !== this.GetSceneComponent()
            ? t
            : this.ModeModule.FindActorByDirection(4)
          : this.ModeModule.FindActorByDirection(i);
  }
  GetCursorOffset() {
    return this.CursorModule.GetCursorOffset();
  }
  GetBoundOffset() {
    return this.CursorModule.GetBoundOffset();
  }
}
(exports.TsUiNavigationBehaviorListener = TsUiNavigationBehaviorListener),
  (exports.default = TsUiNavigationBehaviorListener);
//# sourceMappingURL=TsUiNavigationBehaviorListener.js.map
