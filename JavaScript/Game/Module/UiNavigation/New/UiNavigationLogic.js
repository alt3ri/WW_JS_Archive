"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationLogic = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
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
  static Rwo(i, e) {
    var a;
    i?.HasDynamicScrollView() &&
      ((a = i.GetNavigationGroup()),
      (a = i.ScrollView.Horizontal ? a.HorizontalWrapMode : a.VerticalWrapMode),
      (e = 2 !== e && 4 !== e),
      i.ScrollView.NavigateScrollToUIItem(i?.GetRootComponent(), e, a));
  }
  static Uwo(i) {
    i &&
      AudioSystem_1.AudioSystem.PostEvent("play_ui_gamepad_navigation_common");
  }
  static Awo(e, a) {
    if (
      e &&
      e.PanelConfig?.IsAllowNavigate() &&
      e.GetNavigationComponent().CheckFindNavigationBefore()
    ) {
      let i = void 0;
      var t = e.GetNavigationGroup(),
        t =
          ((i =
            0 === t?.GroupType
              ? UiNavigationLogic.Pwo(e, a, t.AllowNavigationInSelfDynamic)
              : e.FindNavigation(a)),
          UiNavigationLogic.xwo(i));
      if (e.GetNavigationComponent().CheckFindNavigationAfter(t)) return t;
    }
  }
  static Pwo(i, e, a) {
    e = i.FindNavigation(e);
    return !a &&
      (a = this.xwo(e)) &&
      ((void 0 === i.ScrollViewActor &&
        void 0 === a.ScrollViewActor &&
        void 0 === i.LayoutActor &&
        void 0 === a.LayoutActor) ||
        i.ScrollViewActor !== a.ScrollViewActor ||
        i.LayoutActor !== a.LayoutActor)
      ? i.GetSceneComponent()
      : e;
  }
  static xwo(i) {
    return i
      ?.GetOwner()
      ?.GetComponentByClass(
        TsUiNavigationBehaviorListener_1.TsUiNavigationBehaviorListener.StaticClass(),
      );
  }
  static FindUiNavigationPanelConfig(i) {
    let e = i.GetAttachParentActor(),
      a = void 0;
    for (
      ;
      void 0 !== e &&
      !(a = e.GetComponentByClass(
        UE.TsUiNavigationPanelConfig_C.StaticClass(),
      ));

    )
      e = e.GetAttachParentActor();
    return a;
  }
  static FindUpNavigationListener(i) {
    let e = i.GetAttachParentActor(),
      a = void 0;
    for (; void 0 !== e; ) {
      if (e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass()))
        break;
      if (
        (a = e.GetComponentByClass(
          UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        ))
      )
        break;
      e = e.GetAttachParentActor();
    }
    return a;
  }
  static BindHotKeyComponentAction(i, e) {
    var a,
      t = ModelManager_1.ModelManager.UiNavigationModel;
    t &&
      (a = i.GetActionName()) &&
      ((t = t.GetOrAddActionHotKeyComponentSet(a)),
      e
        ? (t.size <= 0 &&
            InputDistributeController_1.InputDistributeController.BindAction(
              a,
              UiNavigationLogic.bMe,
            ),
          t.has(i) || t.add(i))
        : t.size <= 0 ||
          (t.delete(i),
          t.size <= 0 &&
            InputDistributeController_1.InputDistributeController.UnBindAction(
              a,
              UiNavigationLogic.bMe,
            )));
  }
  static BindHotKeyComponentAxis(i, e) {
    var a,
      t = ModelManager_1.ModelManager.UiNavigationModel;
    t &&
      (a = i.GetAxisName()) &&
      ((t = t.GetOrAddAxisHotKeyComponentsSet(a)),
      e
        ? (t.size <= 0 &&
            InputDistributeController_1.InputDistributeController.BindAxis(
              a,
              UiNavigationLogic.wwo,
            ),
          t.has(i) || t.add(i))
        : t.size <= 0 ||
          (t.delete(i),
          t.size <= 0 &&
            InputDistributeController_1.InputDistributeController.UnBindAxis(
              a,
              UiNavigationLogic.wwo,
            )));
  }
  static HasActiveListenerInGroup(a) {
    if (a) {
      for (let i = 0, e = a.ListenerList.Num(); i < e; ++i)
        if (a.ListenerList.Get(i).IsListenerActive()) return !0;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "组内没有可导航对象",
          ["数量", a.ListenerList.Num()],
          ["组名", a.GroupName],
        );
    }
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
      a = ModelManager_1.ModelManager.PlatformModel.IsInGamepad(),
      t = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    t && (i = t.GetPointerEventData(0))
      ? ((e =
          !(e =
            UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) ||
          e.GetCurrentPanel()?.AllowNavigateInKeyBoard),
        a
          ? (t.SetIsUseMouse(!1),
            t.UpdateNavigationListener(void 0),
            ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!1),
            e ||
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetNavigationListener,
              ))
          : e
            ? ((t = 0 === i.inputType),
              ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(t))
            : (ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetNavigationListener,
              )))
      : ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!a);
  }
  static ForceChangeInputType() {
    var i;
    ModelManager_1.ModelManager.PlatformModel.IsInKeyBoard() &&
      (i =
        UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) &&
      !i.GetCurrentPanel().IsAllowNavigate() &&
      (i =
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) &&
      1 === i.GetPointerEventData(0).inputType &&
      i.SetIsForceChange(!0);
  }
  static ExecuteInputNavigation(i, e) {
    var a =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    a &&
      a.GetFocusListener() &&
      LguiEventSystemManager_1.LguiEventSystemManager.InputNavigation(i, e);
  }
  static ExecuteInterfaceMethod(i, e, ...a) {
    e in i && "function" == typeof i[e] && i[e](...a);
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
          (e = UiNavigationLogic.xwo(e)),
          (e = UiNavigationLogic.Awo(e, i)),
          _a.Rwo(e, i),
          _a.Uwo(e),
          e?.GetSceneComponent())
      : LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
          .navigationComponent;
  }),
  (UiNavigationLogic.bMe = (i, e) => {
    var a = ModelManager_1.ModelManager.UiNavigationModel;
    if (a)
      for (const t of a.GetActionHotKeyComponentSet(i))
        t.IsHotKeyActive() && (0 === e ? t.Press() : t.Release());
  }),
  (UiNavigationLogic.wwo = (i, e) => {
    var a = ModelManager_1.ModelManager.UiNavigationModel;
    if (a)
      for (const t of a.GetAxisHotKeyComponentSet(i))
        t.IsAllowTickContinue() && t.InputAxis(i, e);
  });
//# sourceMappingURL=UiNavigationLogic.js.map
