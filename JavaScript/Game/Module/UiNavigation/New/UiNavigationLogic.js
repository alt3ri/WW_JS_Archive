"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationLogic = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener"),
  UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
  UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationLogic {
  static InitNavigationDelegate(i) {
    i.TryFindNavigationDelegate.Bind(
      UiNavigationLogic.TryFindNavigationDelegate,
    );
  }
  static ClearNavigationDelegate(i) {
    i.TryFindNavigationDelegate.Unbind();
  }
  static TBo(i, e) {
    var t;
    i?.HasDynamicScrollView() &&
      ((t = i.GetNavigationGroup()),
      (t = i.ScrollView.Horizontal ? t.HorizontalWrapMode : t.VerticalWrapMode),
      (e = 2 !== e && 4 !== e),
      i.ScrollView.NavigateScrollToUIItem(i?.GetRootComponent(), e, t));
  }
  static LBo(i) {
    i &&
      AudioSystem_1.AudioSystem.PostEvent("play_ui_gamepad_navigation_common");
  }
  static DBo(e, t) {
    if (
      e &&
      e.PanelConfig?.IsAllowNavigate() &&
      e.GetNavigationComponent().CheckFindNavigationBefore()
    ) {
      let i = void 0;
      var a = e.GetNavigationGroup(),
        a =
          ((i =
            0 === a?.GroupType
              ? UiNavigationLogic.RBo(e, t, a.AllowNavigationInSelfDynamic)
              : e.FindNavigation(t)),
          UiNavigationLogic.UBo(i));
      if (e.GetNavigationComponent().CheckFindNavigationAfter(a)) return a;
    }
  }
  static RBo(i, e, t) {
    e = i.FindNavigation(e);
    return !t &&
      (t = this.UBo(e)) &&
      ((void 0 === i.ScrollViewActor &&
        void 0 === t.ScrollViewActor &&
        void 0 === i.LayoutActor &&
        void 0 === t.LayoutActor) ||
        i.ScrollViewActor !== t.ScrollViewActor ||
        i.LayoutActor !== t.LayoutActor)
      ? i.GetSceneComponent()
      : e;
  }
  static UBo(i) {
    return i
      ?.GetOwner()
      ?.GetComponentByClass(
        TsUiNavigationBehaviorListener_1.TsUiNavigationBehaviorListener.StaticClass(),
      );
  }
  static FindUiNavigationPanelConfig(i) {
    let e = i.GetAttachParentActor(),
      t = void 0;
    for (
      ;
      void 0 !== e &&
      !(t = e.GetComponentByClass(
        UE.TsUiNavigationPanelConfig_C.StaticClass(),
      ));

    )
      e = e.GetAttachParentActor();
    return t;
  }
  static FindUpNavigationListener(i) {
    let e = i.GetAttachParentActor(),
      t = void 0;
    for (; void 0 !== e; ) {
      if (e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass()))
        break;
      if (
        (t = e.GetComponentByClass(
          UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        ))
      )
        break;
      e = e.GetAttachParentActor();
    }
    return t;
  }
  static BindHotKeyComponentAction(i, e) {
    var t,
      a = ModelManager_1.ModelManager.UiNavigationModel;
    a &&
      (t = i.GetActionName()) &&
      ((a = a.GetOrAddActionHotKeyComponentSet(t)),
      e
        ? (a.size <= 0 &&
            InputDistributeController_1.InputDistributeController.BindAction(
              t,
              UiNavigationLogic.bMe,
            ),
          a.has(i) || a.add(i))
        : a.size <= 0 ||
          (a.delete(i),
          a.size <= 0 &&
            InputDistributeController_1.InputDistributeController.UnBindAction(
              t,
              UiNavigationLogic.bMe,
            )));
  }
  static BindHotKeyComponentAxis(i, e) {
    var t,
      a = ModelManager_1.ModelManager.UiNavigationModel;
    a &&
      (t = i.GetAxisName()) &&
      ((a = a.GetOrAddAxisHotKeyComponentsSet(t)),
      e
        ? (a.size <= 0 &&
            InputDistributeController_1.InputDistributeController.BindAxis(
              t,
              UiNavigationLogic.ABo,
            ),
          a.has(i) || a.add(i))
        : a.size <= 0 ||
          (a.delete(i),
          a.size <= 0 &&
            InputDistributeController_1.InputDistributeController.UnBindAxis(
              t,
              UiNavigationLogic.ABo,
            )));
  }
  static HasActiveListenerInGroup(t) {
    if (t)
      for (let i = 0, e = t.ListenerList.Num(); i < e; ++i)
        if (t.ListenerList.Get(i).IsListenerActive()) return !0;
    return !1;
  }
  static UpdateNavigationListener(i) {
    var e = ModelManager_1.ModelManager.UiNavigationModel;
    e &&
      ((LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent =
        i?.RootUIComp),
      e.SetCursorFollowItem(i),
      this.MemoryGroupConfigLastSelect(i),
      (e = i?.GetBehaviorComponent()) instanceof UE.UISelectableComponent) &&
      e.NotifyFocusListener();
  }
  static MemoryGroupConfigLastSelect(i) {
    var e;
    i &&
      ((e = i.GetNavigationGroup())
        ? e.SelectableMemory && (e.LastSelectListener = i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[MemoryGroupConfigLastSelect]查找不到当前导航的导航组,逻辑上有问题",
          ));
  }
  static HandleInputControllerTypeChange() {
    var i,
      e,
      t = Info_1.Info.IsInGamepad(),
      a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    a && (i = a.GetPointerEventData(0))
      ? ((e =
          !(e =
            UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) ||
          e.GetCurrentPanel()?.AllowNavigateInKeyBoard),
        t
          ? (a.SetIsUseMouse(!1),
            a.UpdateNavigationListener(void 0),
            ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!1),
            e ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetNavigationListener,
              ))
          : e
            ? ((a = 0 === i.inputType),
              ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(a))
            : (ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetNavigationListener,
              )))
      : ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!t);
  }
  static ForceChangeInputType() {
    var i;
    Info_1.Info.IsInKeyBoard() &&
      (i =
        UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) &&
      !i.GetCurrentPanel().IsAllowNavigate() &&
      (i =
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) &&
      1 === i.GetPointerEventData(0).inputType &&
      i.SetIsForceChange(!0);
  }
  static ExecuteInputNavigation(i, e) {
    var t =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    t &&
      t.GetFocusListener() &&
      LguiEventSystemManager_1.LguiEventSystemManager.InputNavigation(i, e);
  }
  static ExecuteInterfaceMethod(i, e, ...t) {
    e in i && "function" == typeof i[e] && i[e](...t);
  }
}
(exports.UiNavigationLogic = UiNavigationLogic),
  ((_a = UiNavigationLogic).TryFindNavigationDelegate = (i, e) => {
    return 0 !== i || e
      ? UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation
        ? void 0
        : ((e = e
            ? e.GetRootComponent()
            : LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
                .navigationComponent),
          (e = UiNavigationLogic.UBo(e)),
          (e = UiNavigationLogic.DBo(e, i)),
          _a.TBo(e, i),
          _a.LBo(e),
          e?.GetSceneComponent())
      : LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
          .navigationComponent;
  }),
  (UiNavigationLogic.bMe = (i, e) => {
    var t = ModelManager_1.ModelManager.UiNavigationModel;
    if (t)
      for (const a of t.GetActionHotKeyComponentSet(i))
        a.IsHotKeyActive() && (0 === e ? a.Press() : a.Release());
  }),
  (UiNavigationLogic.ABo = (i, e) => {
    var t = ModelManager_1.ModelManager.UiNavigationModel;
    if (t)
      for (const a of t.GetAxisHotKeyComponentSet(i))
        a.IsAllowTickContinue() && a.InputAxis(i, e);
  });
//# sourceMappingURL=UiNavigationLogic.js.map
