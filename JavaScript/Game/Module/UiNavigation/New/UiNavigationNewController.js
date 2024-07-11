"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationNewController = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener");
const UiNavigationDefine_1 = require("./UiNavigationDefine");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationNewController extends UiControllerBase_1.UiControllerBase {
  static $wo() {
    const i =
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
    let e =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (e) {
      e = e.GetActiveListenerByTag(i);
      if (e || t) return e;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          "[GetCurrentNavigationActiveListenerByTag]查找不到对应的按钮",
          ["Tag", i],
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
    let i =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) {
      i = i.GetFocusListener();
      if (i) return i;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "[GetCurrentNavigationFocusListener]查找不到当前导航对象",
        );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          11,
          "[GetCurrentNavigationFocusListener]查找不到当前的导航句柄",
        );
  }
  static Ywo() {
    let i = this.GetCurrentNavigationFocusListener();
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
        EventDefine_1.EEventName.OnPlatformChanged,
        this.Jwo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PointerInputTypeChange,
        this.zwo,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui方向上,
          InputMappingsDefine_1.actionMappings.Ui方向下,
          InputMappingsDefine_1.actionMappings.Ui方向左,
          InputMappingsDefine_1.actionMappings.Ui方向右,
        ],
        this.Zwo,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.手柄引导下一步,
        this.eBo,
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
        EventDefine_1.EEventName.OnPlatformChanged,
        this.Jwo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PointerInputTypeChange,
        this.zwo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui方向上,
          InputMappingsDefine_1.actionMappings.Ui方向下,
          InputMappingsDefine_1.actionMappings.Ui方向左,
          InputMappingsDefine_1.actionMappings.Ui方向右,
        ],
        this.Zwo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.手柄引导下一步,
        this.eBo,
      );
  }
  static OnTick(i) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.Tick(i),
      ModelManager_1.ModelManager.UiNavigationModel.Tick(i);
  }
  static HotKeyCloseView() {
    const i = this.GetCurrentNavigationActiveListenerByTag(
      HotKeyViewDefine_1.EXIT_TAG,
    );
    this.JumpNavigationGroup(6)
      ? UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(
          i.GetNavigationComponent(),
          "InteractClickPrevGroup",
        )
      : i
        ? this.CHe(i)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiNavigation", 11, "查找不到对应的热键按钮", [
            "Tag",
            HotKeyViewDefine_1.EXIT_TAG,
          ]);
  }
  static ClickButton(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this.CHe(i);
  }
  static SimulateClickItem(i, t) {
    const e =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    return (
      !!e && e.SimulateClickButton(UiNavigationDefine_1.GAMEPAD_POINT_ID, i, t)
    );
  }
  static CHe(i) {
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
    const e = this.GetCurrentNavigationFocusListener();
    if (e) {
      let i = UiNavigationNewController.GetFocusListenerInsideListenerByTag(
        e,
        t,
      );
      (i = i || e.GetChildListenerByTag(t))
        ? this.CHe(i)
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
    const t = this.GetCurrentNavigationFocusListener();
    return (
      !!t &&
      (i
        ? this.tBo(t.GetSelectableComponent(), !0)
        : this.tBo(t.GetSelectableComponent(), !1))
    );
  }
  static InteractClick() {
    const i = this.GetCurrentNavigationFocusListener();
    this.InteractClickByListener(i);
  }
  static InteractClickByListener(i) {
    i && this.CHe(i);
  }
  static FindScrollbar(i) {
    const t = this.$wo();
    t && (i ? t.FindNextScrollbar() : t.FindPrevScrollbar());
  }
  static ScrollBarChangeSchedule(i) {
    let t = this.$wo();
    t && ((t = t.GetCurrentScrollbar()), this.iBo(t, i));
  }
  static BookMarkNavigation(a, i) {
    const n = this.GetCurrentNavigationActiveListenerByTag(i);
    if (n) {
      const r = n.GetNavigationGroup();
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
          t?.bAutoScrollOnSelected && a?.ScrollView?.IsValid() && this.oBo(a),
          this.CHe(a),
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
    let t;
    let e;
    const a = this.Ywo();
    return (
      !!a &&
      (StringUtils_1.StringUtils.IsBlank(i)
        ? this.JumpNavigationGroup(5)
        : ((e =
            UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()),
          (i = a.GroupNameMap.Get(i)),
          (t = this.rBo(e, i)) &&
            (e = e.GetActiveNavigationGroupByNameCheckAll(i)) &&
            (e.PrevGroupName = a.GroupName),
          t))
    );
  }
  static JumpNavigationGroup(i) {
    const t = this.Ywo();
    if (!t) return !1;
    const e =
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    switch (i) {
      case 5:
        return this.rBo(e, t.NextGroupName);
      case 6:
        var a = this.rBo(e, t.PrevGroupName);
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
  static rBo(i, t) {
    return !(
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation ||
      !(i = i.GetActiveNavigationGroupByNameCheckAll(t)) ||
      ((i = this.nBo(i))
        ? (this.oBo(i), this.SwitchNavigationFocus(i), 0)
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
  static oBo(i) {
    let t;
    i.ScrollView &&
      (t = i.GetSelectableComponent()) &&
      i.ScrollView.ScrollTo(t.GetRootComponent());
  }
  static nBo(i) {
    if (i) {
      if (i.SelectableMemory && i.LastSelectListener) {
        const t = i.LastSelectListener;
        if (t.IsCanFocus()) return t;
      }
      return this.sBo(i);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "[GetActiveListenerInGroup]找不到导航组",
      );
  }
  static sBo(i) {
    if (i.DefaultListener) {
      const t = i.DefaultListener;
      if (t.IsIgnoreScrollOrLayoutCheckInSwitchGroup()) return this.aBo(i);
      if (!t.IsScrollOrLayoutActor() && t.IsCanFocus()) return t;
    }
    return this.FindLoopOrDynListener(i);
  }
  static FindLoopOrDynListener(i) {
    let t = i.DefaultListener;
    if (t) {
      t = this.hBo(i, t);
      if (t) return t;
    }
    return this.aBo(i);
  }
  static aBo(e) {
    let a = void 0;
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      const n = e.ListenerList.Get(i);
      if ((!a && n.IsCanFocus() && (a = n), n.IsInScrollOrLayoutCanFocus()))
        return n;
    }
    return a;
  }
  static hBo(i, t) {
    return t.HasDynamicScrollView()
      ? UiNavigationNewController.S5s(i, t)
      : UiNavigationNewController.E5s(i, t);
  }
  static y5s(i, e) {
    const a = UE.LGUIBPLibrary.GetComponentsInChildren(
      i,
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !0,
    );
    for (let i = 0, t = a.Num(); i < t; ++i) {
      const n = a.Get(i);
      if (n.GroupName === e.GroupName) return n;
    }
  }
  static S5s(e, i) {
    let a = void 0;
    const n = i.ScrollView.DisplayItemArray;
    for (let i = 0, t = n.Num(); i < t; ++i) {
      const r = n.Get(i);
      const o = UiNavigationNewController.y5s(r, e);
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
  static E5s(e, i) {
    let a = void 0;
    const n = i.GetScrollOrLayoutActor();
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      const r = e.ListenerList.Get(i);
      if (
        r.IsScrollOrLayoutActor() &&
        (!a && r.IsCanFocus() && (a = r),
        (!n || r.GetScrollOrLayoutActor() === n) &&
          r.IsInScrollOrLayoutCanFocus())
      )
        return r;
    }
    return a;
  }
  static GetCanFocusInsideListener(i) {
    const t = i.GetNavigationGroup().InsideGroupName;
    const e = UE.LGUIBPLibrary.GetComponentsInChildren(
      i.InsideGroupActor,
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !0,
    );
    if (e)
      for (let i = e.Num() - 1; i >= 0; --i) {
        const a = e.Get(i);
        if (
          !StringUtils_1.StringUtils.IsEmpty(a.GroupName) &&
          t === a.GroupName &&
          a.IsCanFocus()
        )
          return a;
      }
  }
  static IsInFocusInsideListenerList(i, t) {
    let e;
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
    let i;
    const t = this.Ywo();
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
      ? this.tBo(i.GetSelectableComponent(), !1)
      : (i =
          LguiEventSystemManager_1.LguiEventSystemManager
            .LguiEventSystemActor) && i.ResetNowIsTriggerPressed();
  }
  static SimulationPointUpInside(i) {
    let t = this.GetCurrentNavigationFocusListener();
    t &&
      ((t = t.GetChildListenerByTag(i))
        ? this.tBo(t.GetSelectableComponent(), !1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SimulationPointUpInside]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static tBo(i, t) {
    let e;
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
    i && this.tBo(i.GetSelectableComponent(), !0);
  }
  static SimulationPointDownInside(i) {
    let t = this.GetCurrentNavigationFocusListener();
    t &&
      ((t = t.GetChildListenerByTag(i))
        ? this.tBo(t.GetSelectableComponent(), !0)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SimulationPointDownInside]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static FindTarget(i) {
    let t = this.GetCurrentNavigationFocusListener();
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
      this.oBo(t));
  }
  static SliderComponentSetValue(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this.lBo(i.GetSelectableComponent(), t);
  }
  static SliderInsideComponentSetValue(i, t) {
    let e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = e.GetChildListenerByTag(i))
        ? this.lBo(e.GetSelectableComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[SliderInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static ScrollbarInsideComponentSetValue(i, t) {
    let e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = this.GetFocusListenerInsideListenerByTag(e, i))
        ? this.iBo(e.GetBehaviorComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static iBo(i, t) {
    i &&
      i.SetScrollProgressIncrement(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
  }
  static lBo(i, t) {
    let e;
    i &&
      ((e = i.Value),
      i.SetProgressIncrement(t, i.WholeNumbers),
      e === i.Value) &&
      (t > 0 && e !== i.MaxValue
        ? i.SetValue(e + 1)
        : t < 0 && e !== i.MinValue && i.SetValue(e - 1));
  }
  static DraggableComponentNavigate(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && this._Bo(i.GetSelectableComponent(), t);
  }
  static DraggableInsideComponentNavigate(i, t) {
    let e = this.GetCurrentNavigationFocusListener();
    e &&
      ((e = this.GetFocusListenerInsideListenerByTag(e, i))
        ? this._Bo(e.GetSelectableComponent(), t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮",
            ["Tag", i],
          ));
  }
  static _Bo(i, t) {
    i && (t ? i.NotifyNavigateToNext() : i.NotifyNavigateToPrev());
  }
  static SwitchNavigationFocus(i) {
    if (
      !LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
        .navigationComponent &&
      !this.GetCurrentNavigationFocusListener() &&
      !i
    )
      return;
    (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
      !0),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem
        .navigationComponent ||
        ((t =
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
            0,
          )),
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem?.SetSelectComponent(
          void 0,
          t,
          0,
        ));
    var t =
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    const e = i?.GetSceneComponent();
    t?.UpdateNavigationListener(e),
      i ||
        UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().UpdateFocus(
          void 0,
        ),
      (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup =
        !1);
  }
  static SetNavigationFocusForView(i) {
    let t, e;
    ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
      i?.IsValid() &&
      (t = i
        ?.GetOwner()
        ?.GetComponentByClass(
          TsUiNavigationBehaviorListener_1.default.StaticClass(),
        )) &&
      !StringUtils_1.StringUtils.IsBlank(t.GroupName) &&
      (e = t.GetNavigationGroup()) &&
      e.GroupType !== 2 &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiNavigation", 11, "业务设置了导航对象", [
          "名字",
          i.displayName,
        ]),
      this.SwitchNavigationFocus(t));
  }
  static SetNavigationFocusForGuide(i) {
    let t, e;
    ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
      i?.IsValid() &&
      (t = i
        ?.GetOwner()
        ?.GetComponentByClass(
          TsUiNavigationBehaviorListener_1.default.StaticClass(),
        )) &&
      !StringUtils_1.StringUtils.IsBlank(t.GroupName) &&
      (e = t.GetNavigationGroup()) &&
      e.GroupType !== 2 &&
      (e.GroupType === 0
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
    ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
      ModelManager_1.ModelManager.UiNavigationModel.ResetGuideFocusListener();
  }
  static GetFocusListenerInsideListenerByTag(i, t) {
    let e = i.InsideActorMap?.Get(t);
    e = e || i.GetOwner();
    const a = UE.LGUIBPLibrary.GetComponentsInChildren(
      e,
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !0,
    );
    if (a)
      for (let i = a.Num() - 1; i >= 0; --i) {
        const n = a.Get(i);
        if (n.TagArray?.Contains(t) && n.IsCanFocus()) return n;
      }
  }
  static GetMarkBookActiveListenerList(e) {
    if (!e) return [];
    if (e?.GroupType !== 1) return [];
    const a = [];
    for (let i = 0, t = e.ListenerList.Num(); i < t; ++i) {
      const n = e.ListenerList.Get(i);
      n.IsListenerActive() && a.push(n);
    }
    return a;
  }
  static ActiveTextInput(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    i && i.GetBehaviorComponent().ActivateInputText();
  }
  static ActiveTextInputInside(i) {
    let t = this.GetCurrentNavigationFocusListener();
    t &&
      (t = this.GetFocusListenerInsideListenerByTag(t, i)) &&
      t.GetBehaviorComponent().ActivateInputText();
  }
}
(exports.UiNavigationNewController = UiNavigationNewController),
  ((_a = UiNavigationNewController).IsTickEvenPausedInternal = !0),
  (UiNavigationNewController.aGe = () => {
    const i = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem;
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
  (UiNavigationNewController.Jwo = (i, t, e, a) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigation",
        11,
        "[InputChange]输入平台改变!",
        ["last", a],
        ["now", i],
      ),
      ModelManager_1.ModelManager.UiNavigationModel.InputControllerModeChange(),
      UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange(),
      UiNavigationLogic_1.UiNavigationLogic.ForceChangeInputType();
  }),
  (UiNavigationNewController.zwo = (i) => {
    ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiNavigation", 11, "[InputChange]输入类型改变!", [
          "InputType",
          i,
        ]),
      UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange());
  }),
  (UiNavigationNewController.Zwo = (i, t) => {
    UiNavigationLogic_1.UiNavigationLogic.ExecuteInputNavigation(i, t);
  }),
  (UiNavigationNewController.eBo = () => {
    const i = ModelManager_1.ModelManager.UiNavigationModel;
    i &&
      i.GuideFocusListener &&
      (_a.CHe(i.GuideFocusListener), _a.ResetNavigationFocusForGuide());
  });
// # sourceMappingURL=UiNavigationNewController.js.map
