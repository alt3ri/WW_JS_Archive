"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationNewController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput"),
  TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener"),
  UiNavigationDefine_1 = require("./UiNavigationDefine"),
  UiNavigationGlobalData_1 = require("./UiNavigationGlobalData"),
  UiNavigationLogic_1 = require("./UiNavigationLogic"),
  UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationNewController extends UiControllerBase_1.UiControllerBase {
  static KBo() {
    var i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) return i.GetScrollbarData();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "[GetCurrentNavigationScrollbarData]查找不到当前的导航句柄",
      );
  }
  static GetCurrentNavigationActiveListenerByTag(i, t = !1) {
    var e =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (e) {
      var a = e.GetActiveListenerByTag(i);
      if (a || t) return a;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          "[GetCurrentNavigationActiveListenerByTag]查找不到对应的按钮",
          ["Tag", i],
          ["ViewName", e.ViewName],
        );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "[GetCurrentNavigationActiveListenerByTag]查找不到当前的导航句柄",
        );
  }
  static GetCurrentNavigationFocusListener() {
    var i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) {
      i = i.GetFocusListener();
      if (i) return i;
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "[GetCurrentNavigationFocusListener]查找不到当前的导航句柄",
        );
  }
  static QBo() {
    var i = this.GetCurrentNavigationFocusListener();
    if (i) {
      UiNavigationLogic_1.UiNavigationLogic.MemoryGroupConfigLastSelect(i);
      i = i.GetNavigationGroup();
      if (i) return i;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          "[GetCurrentNavigationListenerGroup]查找不到当前导航的导航组,逻辑上有问题",
        );
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LoadLguiEventSystemActor,
      this.aGe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DestroyLguiEventSystemActor,
        this.Yfe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PointerInputTypeChange,
        this.$Bo,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui方向上,
          InputMappingsDefine_1.actionMappings.Ui方向下,
          InputMappingsDefine_1.actionMappings.Ui方向左,
          InputMappingsDefine_1.actionMappings.Ui方向右,
        ],
        this.YBo,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.手柄引导下一步,
        this.JBo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LoadLguiEventSystemActor,
      this.aGe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DestroyLguiEventSystemActor,
        this.Yfe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PointerInputTypeChange,
        this.$Bo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui方向上,
          InputMappingsDefine_1.actionMappings.Ui方向下,
          InputMappingsDefine_1.actionMappings.Ui方向左,
          InputMappingsDefine_1.actionMappings.Ui方向右,
        ],
        this.YBo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.手柄引导下一步,
        this.JBo,
      );
  }
  static OnTick(i) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.Tick(i),
      ModelManager_1.ModelManager.UiNavigationModel.Tick(i);
  }
  static HotKeyCloseView() {
    var i = this.GetCurrentNavigationActiveListenerByTag(
      HotKeyViewDefine_1.EXIT_TAG,
    );
    this.JumpNavigationGroup(6)
      ? UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
          i.GetNavigationComponent(),
          "InteractClickPrevGroup",
        )
      : i
        ? this.Dje(i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "查找不到对应的热键按钮", [
            "Tag",
            HotKeyViewDefine_1.EXIT_TAG,
          ]);
  }
  static ClickButton(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this.Dje(i);
  }
  static SimulateClickItem(i, t) {
    var e =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    return (
      !!e && e.SimulateClickButton(UiNavigationDefine_1.GAMEPAD_POINT_ID, i, t)
    );
  }
  static Dje(i) {
    UiLayer_1.UiLayer.IsInMask() ||
      (this.SimulateClickItem(i.GetBehaviorComponent().RootUIComp, i.ClickPivot)
        ? (UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
            i.GetNavigationComponent(),
            "InteractClickHandle",
          ),
          ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove())
        : UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
            i.GetNavigationComponent(),
            "InteractClickFailHandle",
          ));
  }
  static ClickButtonInside(t) {
    var e = this.GetCurrentNavigationFocusListener();
    if (e) {
      let i = UiNavigationNewController.GetFocusListenerInsideListenerByTag(
        e,
        t,
      );
      (i = i || e.GetChildListenerByTag(t))
        ? this.Dje(i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[ClickButtonInside]查找不到对应的热键按钮",
            ["Tag", t],
          );
    }
  }
  static Interact(i) {
    var t = this.GetCurrentNavigationFocusListener();
    return (
      !!t &&
      (i
        ? this.zBo(t.GetSelectableComponent(), !0)
        : this.zBo(t.GetSelectableComponent(), !1))
    );
  }
  static InteractClick() {
    var i = this.GetCurrentNavigationFocusListener();
    this.InteractClickByListener(i);
  }
  static InteractClickByListener(i) {
    i && this.Dje(i);
  }
  static FindScrollbar(i) {
    var t = this.KBo();
    t && (i ? t.FindNextScrollbar() : t.FindPrevScrollbar());
  }
  static ScrollBarChangeSchedule(i) {
    var t = this.KBo();
    t && ((t = t.GetCurrentScrollbar()), this.ZBo(t, i));
  }
  static BookMarkNavigation(a, i) {
    const n = this.GetCurrentNavigationActiveListenerByTag(i);
    if (n) {
      var r = n.GetNavigationGroup();
      if (r) {
        let e = void 0;
        for (let i = 0, t = r.ListenerList.Num(); i < t; ++i) {
          const n = r.ListenerList.Get(i);
          if (n.IsCanFocus() && n.IsSelectedToggle()) {
            e = n.GetSelectableComponent();
            break;
          }
        }
        const o =
          UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(a, e);
        let t = o
          ?.GetOwner()
          ?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
        if (!t || e === t) {
          let i = void 0;
          switch (a) {
            case 3:
              i = 1;
              break;
            case 4:
              i = 2;
              break;
            case 1:
              i = 3;
              break;
            case 2:
              i = 4;
              break;
            default:
              i = 0;
          }
          const o =
            UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(
              i,
              e,
            );
          t = o
            ?.GetOwner()
            ?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
        }
        t &&
          ((a = t
            .GetOwner()
            .GetComponentByClass(
              UE.TsUiNavigationBehaviorListener_C.StaticClass(),
            )),
          t?.bAutoScrollOnSelected && a?.ScrollView?.IsValid() && this.ebo(a),
          this.Dje(a),
          r.RefreshNavigation) &&
          this.MarkViewHandleRefreshNavigationDirty();
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[BookMarkNavigation]查找不到对应的导航组",
            ["Tag", i],
          );
    }
  }
  static MarkViewHandleRefreshNavigationDirty() {
    UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().MarkRefreshNavigationDirty();
  }
  static JumpNavigationGroupByTag(i) {
    var t,
      e,
      a = this.QBo();
    return (
      !!a &&
      (StringUtils_1.StringUtils.IsBlank(i)
        ? this.JumpNavigationGroup(5)
        : ((e =
            UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()),
          (i = a.GroupNameMap.Get(i)),
          (t = this.tbo(e, i)) &&
            (e = e.GetActiveNavigationGroupByNameCheckAll(i)) &&
            (e.PrevGroupName = a.GroupName),
          t))
    );
  }
  static JumpNavigationGroup(i) {
    var t = this.QBo();
    if (!t) return !1;
    var e =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    switch (i) {
      case 5:
        return this.tbo(e, t.NextGroupName);
      case 6:
        var a = this.tbo(e, t.PrevGroupName);
        return a && t.SelectableMemory && (t.LastSelectListener = void 0), a;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiNavigation", 11, "导航组跳转方向错误", [
              "direction",
              i,
            ]),
          !1
        );
    }
  }
  static tbo(i, t) {
    return !(
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation ||
      !(i = i.GetActiveNavigationGroupByNameCheckAll(t)) ||
      ((i = this.ibo(i))
        ? (this.ebo(i), this.SwitchNavigationFocus(i), 0)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiNavigation",
              11,
              "[ChangeFocusListenerByGroupName]找不到可跳转的导航对象",
              ["GroupName", t],
            ),
          1))
    );
  }
  static ebo(i) {
    var t;
    i.ScrollView &&
      (t = i.GetSelectableComponent()) &&
      i.ScrollView.ScrollTo(t.GetRootComponent());
  }
  static ibo(i) {
    if (i) {
      if (i.SelectableMemory && i.LastSelectListener) {
        var t = i.LastSelectListener;
        if (t.IsCanFocus()) return t;
      }
      return this.obo(i);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "[GetActiveListenerInGroup]找不到导航组",
      );
  }
  static obo(i) {
    if (i.DefaultListener) {
      var t = i.DefaultListener;
      if (t.IsIgnoreScrollOrLayoutCheckInSwitchGroup()) return this.rbo(i);
      if (!t.IsScrollOrLayoutActor() && t.IsCanFocus()) return t;
    }
    return this.FindLoopOrDynListener(i);
  }
  static FindLoopOrDynListener(i) {
    var t = i.DefaultListener;
    if (t) {
      t = this.nbo(i, t);
      if (t) return t;
    }
    return this.rbo(i);
  }
  static rbo(e) {
    let a = void 0;
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      var n = e.ListenerList.Get(i);
      if ((!a && n.IsCanFocus() && (a = n), n.IsInScrollOrLayoutCanFocus()))
        return n;
    }
    return a;
  }
  static nbo(i, t) {
    return t.HasDynamicScrollView()
      ? UiNavigationNewController.sWs(i, t)
      : UiNavigationNewController.aWs(i, t);
  }
  static hWs(i, e) {
    var a = UE.LGUIBPLibrary.GetComponentsInChildren(
      i,
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !0,
    );
    for (let i = 0, t = a.Num(); i < t; ++i) {
      var n = a.Get(i);
      if (n.GroupName === e.GroupName && n.IsCanFocus()) return n;
    }
  }
  static sWs(e, i) {
    let a = void 0;
    var n = i.ScrollView.DisplayItemArray;
    for (let i = 0, t = n.Num(); i < t; ++i) {
      var r = n.Get(i),
        o = UiNavigationNewController.hWs(r, e);
      if (
        o &&
        o.IsInDynScrollDisplay(r) &&
        o.IsScrollOrLayoutActor() &&
        (!a && o.IsCanFocus() && (a = o), o.IsInScrollOrLayoutCanFocus())
      )
        return o;
    }
    return a;
  }
  static aWs(e, i) {
    let a = void 0;
    var n = i.GetScrollOrLayoutActor();
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      var r = e.ListenerList.Get(i);
      if (
        r.IsScrollOrLayoutActor() &&
        r.IsInLoopScrollDisplayByGridActor() &&
        (!a && r.IsCanFocus() && (a = r),
        !n || r.GetScrollOrLayoutActor() === n) &&
        r.IsInScrollOrLayoutCanFocus()
      )
        return r;
    }
    return a;
  }
  static GetCanFocusInsideListener(i) {
    var t = i.GetNavigationGroup().InsideGroupName,
      e = UE.LGUIBPLibrary.GetComponentsInChildren(
        i.InsideGroupActor,
        UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        !0,
      );
    if (e)
      for (let i = e.Num() - 1; 0 <= i; --i) {
        var a = e.Get(i);
        if (
          !StringUtils_1.StringUtils.IsEmpty(a.GroupName) &&
          t === a.GroupName &&
          a.IsCanFocus()
        )
          return a;
      }
  }
  static IsInFocusInsideListenerList(i, t) {
    var e;
    return (
      !StringUtils_1.StringUtils.IsEmpty(t.GroupName) &&
      ((e = i.GetNavigationGroup().InsideGroupName),
      !!(i = UE.LGUIBPLibrary.GetComponentsInChildren(
        i.InsideGroupActor,
        UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        !0,
      ))) &&
      e === t.GroupName &&
      i.Contains(t)
    );
  }
  static JumpInsideNavigationGroup() {
    var i,
      t = this.QBo();
    t &&
      ((i = this.GetCurrentNavigationFocusListener()),
      (i = this.GetCanFocusInsideListener(i))
        ? this.SwitchNavigationFocus(i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[JumpInsideNavigationGroup]查找不到内部有可导航对象",
            ["InsideGroupName", t.InsideGroupName],
          ));
  }
  static SimulationPointUp(i) {
    var i = this.GetCurrentNavigationActiveListenerByTag(i, !0);
    i
      ? this.zBo(i.GetSelectableComponent(), !1)
      : (i =
          LguiEventSystemManager_1.LguiEventSystemManager
            .LguiEventSystemActor) &&
        i.ResetNowIsTriggerPressed(UiNavigationDefine_1.GAMEPAD_POINT_ID);
  }
  static SimulationPointUpInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    t &&
      ((t = t.GetChildListenerByTag(i))
        ? this.zBo(t.GetSelectableComponent(), !1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SimulationPointUpInside]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static zBo(i, t) {
    var e;
    return (
      !UiLayer_1.UiLayer.IsInMask() &&
      !!(e =
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) &&
      e.SimulationPointerDownUp(
        UiNavigationDefine_1.GAMEPAD_POINT_ID,
        i.RootUIComp,
        t,
      )
    );
  }
  static SimulationPointDown(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i, !0);
    i && this.zBo(i.GetSelectableComponent(), !0);
  }
  static SimulationPointDownInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    t &&
      ((t = t.GetChildListenerByTag(i))
        ? this.zBo(t.GetSelectableComponent(), !0)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SimulationPointDownInside]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static FindTarget(i) {
    var t = this.GetCurrentNavigationFocusListener();
    t &&
      ((t = t.GetSelectableComponent()),
      (i = UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(
        i,
        t,
      )) !== t.RootUIComp) &&
      ((t = i
        .GetOwner()
        .GetComponentByClass(
          UE.TsUiNavigationBehaviorListener_C.StaticClass(),
        )),
      this.ebo(t));
  }
  static SliderComponentSetValue(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this.sbo(i.GetSelectableComponent(), t);
  }
  static SliderInsideComponentSetValue(i, t) {
    var e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = e.GetChildListenerByTag(i))
        ? this.sbo(e.GetSelectableComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SliderInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static ScrollbarInsideComponentSetValue(i, t) {
    var e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = this.GetFocusListenerInsideListenerByTag(e, i))
        ? this.ZBo(e.GetBehaviorComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static ZBo(i, t) {
    i && i.SetVelocity(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
  }
  static sbo(i, t) {
    var e;
    i &&
      ((e = i.Value),
      i.SetProgressIncrement(t, i.WholeNumbers),
      e === i.Value) &&
      (0 < t && e !== i.MaxValue
        ? i.SetValue(e + 1)
        : t < 0 && e !== i.MinValue && i.SetValue(e - 1));
  }
  static DraggableComponentNavigate(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this.abo(i.GetSelectableComponent(), t);
  }
  static DraggableInsideComponentNavigate(i, t) {
    var e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = this.GetFocusListenerInsideListenerByTag(e, i))
        ? this.abo(e.GetSelectableComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static abo(i, t) {
    i && (t ? i.NotifyNavigateToNext() : i.NotifyNavigateToPrev());
  }
  static SwitchNavigationFocus(i) {
    const t =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (t && !t.HasGamepadControlMouse()) {
      if (
        !LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
          .navigationComponent
      )
        if (!this.GetCurrentNavigationFocusListener() && !i) return;
      (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
        !0),
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
          .navigationComponent ||
          ((e =
            LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
              0,
            )),
          LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem?.SetSelectComponent(
            void 0,
            e,
            0,
          ));
      var e =
          LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor,
        a = i?.GetSceneComponent();
      if ((e?.UpdateNavigationListener(a), !i)) {
        const t =
          UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
        t.UpdateFocus(void 0);
      }
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
        !1;
    }
  }
  static SwitchNavigationFocusWithDirtyCheck(i) {
    var t =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    t
      ? t?.MarkSwitchNavigationFocusDirty(i)
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "[SwitchNavigationFocusWithDirtyCheck]查找不到当前的导航句柄",
        );
  }
  static SetNavigationFocusForView(i, t = !1) {
    var e, a;
    Info_1.Info.IsInTouch() ||
      (i?.IsValid() &&
        (e = i
          ?.GetOwner()
          ?.GetComponentByClass(
            TsUiNavigationBehaviorListener_1.default.StaticClass(),
          )) &&
        !StringUtils_1.StringUtils.IsBlank(e.GroupName) &&
        (a = e.GetNavigationGroup()) &&
        2 !== a.GroupType &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiNavigation", 11, "业务设置了导航对象", [
            "名字",
            i.displayName,
          ]),
        t
          ? this.SwitchNavigationFocusWithDirtyCheck(e)
          : this.SwitchNavigationFocus(e)));
  }
  static SetNavigationFocusForViewSameGroup(i) {
    var t, e;
    Info_1.Info.IsInGamepad() &&
      i?.IsValid() &&
      (!(t = i
        ?.GetOwner()
        ?.GetComponentByClass(
          TsUiNavigationBehaviorListener_1.default.StaticClass(),
        )) ||
        StringUtils_1.StringUtils.IsBlank(t.GroupName) ||
        !(e = t.GetNavigationGroup()) ||
        2 === e.GroupType ||
        ((e = this.GetCurrentNavigationFocusListener()) &&
          e.GroupName !== t.GroupName) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiNavigation", 11, "业务设置了导航对象", [
            "名字",
            i.displayName,
          ]),
        this.SwitchNavigationFocus(t)));
  }
  static SetNavigationFocusForGuide(i) {
    var t, e;
    Info_1.Info.IsInGamepad() &&
      i?.IsValid() &&
      (t = i
        ?.GetOwner()
        ?.GetComponentByClass(
          TsUiNavigationBehaviorListener_1.default.StaticClass(),
        )) &&
      !StringUtils_1.StringUtils.IsBlank(t.GroupName) &&
      (e = t.GetNavigationGroup()) &&
      2 !== e.GroupType &&
      (0 === e.GroupType
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiNavigation", 11, "引导设置了导航对象", [
              "名字",
              i.displayName,
            ]),
          this.SwitchNavigationFocus(t))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiNavigation", 11, "引导设置了非导航对象", [
              "名字",
              i.displayName,
            ]),
          ModelManager_1.ModelManager.UiNavigationModel.SetGuideFocusListener(
            t,
          )));
  }
  static ResetNavigationFocusForGuide() {
    Info_1.Info.IsInGamepad() &&
      ModelManager_1.ModelManager.UiNavigationModel.ResetGuideFocusListener();
  }
  static GetFocusListenerInsideListenerByTag(i, t) {
    let e = i.InsideActorMap?.Get(t);
    e = e || i.GetOwner();
    var a = UE.LGUIBPLibrary.GetComponentsInChildren(
      e,
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !0,
    );
    if (a)
      for (let i = a.Num() - 1; 0 <= i; --i) {
        var n = a.Get(i);
        if (n.TagArray?.Contains(t) && n.IsCanFocus()) return n;
      }
  }
  static GetMarkBookActiveListenerList(e) {
    if (!e) return [];
    if (1 !== e?.GroupType) return [];
    var a = [];
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      var n = e.ListenerList.Get(i);
      n.IsListenerActive() && a.push(n);
    }
    return a;
  }
  static ActiveTextInput(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && i.GetBehaviorComponent().ActivateInputText();
  }
  static ActiveTextInputInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    t &&
      (t = this.GetFocusListenerInsideListenerByTag(t, i)) &&
      t.GetBehaviorComponent().ActivateInputText();
  }
  static SimulationPointerTrigger(i) {
    var t =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    t &&
      (t.SimulationPointerTrigger(0, i),
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()?.SetGamepadMouseTrigger(
        i,
      ));
  }
  static GamepadControlMouseMoveForward(i) {
    var t =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    t && t.SetGamepadMouseMoveForward(i);
  }
  static GamepadControlMouseMoveRight(i) {
    var t =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    t && t.SetGamepadMouseMoveRight(i);
  }
}
(exports.UiNavigationNewController = UiNavigationNewController),
  ((_a = UiNavigationNewController).IsTickEvenPausedInternal = !0),
  (UiNavigationNewController.aGe = () => {
    var i = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem;
    i &&
      (UiNavigationLogic_1.UiNavigationLogic.InitNavigationDelegate(
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem,
      ),
      (i.HighlightWhenMouseMoveOut =
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetHighlightWhenMouseMoveOut()),
      UE.UISelectableComponent.SetShieldMobileHighlight(
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetMobileHighlight(),
      ),
      UE.UISelectableComponent.SetShieldPCPress(
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetPcPress(),
      ));
  }),
  (UiNavigationNewController.Yfe = () => (
    UiNavigationLogic_1.UiNavigationLogic.ClearNavigationDelegate(
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem,
    ),
    !0
  )),
  (UiNavigationNewController.XBo = (i, t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "[InputChange]输入类型改变!",
        ["last", i],
        ["now", t],
      ),
      ModelManager_1.ModelManager.UiNavigationModel.InputControllerModeChange(),
      UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange(),
      UiNavigationLogic_1.UiNavigationLogic.ForceChangeInputType();
  }),
  (UiNavigationNewController.$Bo = (i) => {
    Info_1.Info.IsInGamepad() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiNavigation", 11, "[InputChange]输入类型改变!", [
          "InputType",
          i,
        ]),
      UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange());
  }),
  (UiNavigationNewController.YBo = (i, t) => {
    UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, t);
  }),
  (UiNavigationNewController.JBo = () => {
    var i = ModelManager_1.ModelManager.UiNavigationModel;
    i &&
      i.GuideFocusListener &&
      (_a.Dje(i.GuideFocusListener), _a.ResetNavigationFocusForGuide());
  });
//# sourceMappingURL=UiNavigationNewController.js.map
