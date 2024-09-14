"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsLguiEventSystemActor = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../../Game/Global"),
  CursorController_1 = require("../../../Game/Module/Cursor/CursorController"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiNavigationDefine_1 = require("../../Module/UiNavigation/New/UiNavigationDefine");
class TsLguiEventSystemActor extends UE.LGUIEventSystemActor {
  constructor() {
    super(...arguments),
      (this.StandaloneInputModule = void 0),
      (this.TouchInputModule = void 0),
      (this.CurrentInputModule = void 0),
      (this.NavigationEnable = !1),
      (this.HandleWrapper = void 0),
      (this.ShowTypeChange = (t, e) => {}),
      (this.ControllerConnectChange = (t, e, i) => {});
  }
  InitializeLguiEventSystemActor() {
    this.RefreshCurrentInputModule();
    var t = (0, puerts_1.toManualReleaseDelegate)(
      TsLguiEventSystemActor.ChangeController,
    );
    (this.HandleWrapper =
      this.StandaloneInputModule.RegisterInputChangeEvent(t)),
      this.AddEvents(),
      this.RegisterControllerChange(),
      CursorController_1.CursorController.SetWindowCursorStyle(),
      this.RegisterPointEnterExitEvent(),
      this.BroadCastInputType();
  }
  ResetLguiEventSystemActor() {
    this.StandaloneInputModule.UnregisterInputChangeEvent(this.HandleWrapper),
      (0, puerts_1.releaseManualReleaseDelegate)(
        TsLguiEventSystemActor.ChangeController,
      ),
      (this.HandleWrapper = void 0),
      this.UnRegisterControllerChange(),
      this.RemoveEvents(),
      this.UnRegisterPointEnterExitEvent();
  }
  AddEvents() {
    (this.ShowTypeChange = (t, e) => {
      this.RefreshCurrentInputModule();
    }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowTypeChange,
        this.ShowTypeChange,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShowTypeChange,
      this.ShowTypeChange,
    );
  }
  RegisterControllerChange() {
    (this.ControllerConnectChange = (t, e, i) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MobileInputSwitch", 11, "广播了连接通知"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ControllerConnectChange,
          t,
          e,
          i,
        );
    }),
      this.EventSystem.OnConnectionChanged.Add(this.ControllerConnectChange),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MobileInputSwitch",
          11,
          "注册了连接通知",
          ["this.EventSystem", void 0 !== this.EventSystem],
          [
            "this.ControllerConnectChange",
            void 0 !== this.ControllerConnectChange,
          ],
        );
  }
  UnRegisterControllerChange() {
    this.EventSystem.OnConnectionChanged.Remove(this.ControllerConnectChange),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MobileInputSwitch", 11, "注销了连接通知");
  }
  InputTrigger(t, e) {
    var i;
    Info_1.Info.IsInTouch() ||
      ((i = Global_1.Global.CharacterController) &&
        i.bShowMouseCursor &&
        this.StandaloneInputModule.InputTrigger(t, e));
  }
  InputNavigation(t, e, i = !1) {
    (this.NavigationEnable || i) &&
      this.CurrentInputModule &&
      ((TsLguiEventSystemActor.InputType = 1),
      this.CurrentInputModule.InputNavigation(t, e));
  }
  InputTriggerForNavigation(t) {
    this.CurrentInputModule &&
      ((TsLguiEventSystemActor.InputType = 1),
      this.CurrentInputModule.InputTriggerForNavigation(t));
  }
  SwitchToNavigationInputType() {
    this.CurrentInputModule &&
      1 !== TsLguiEventSystemActor.InputType &&
      ((TsLguiEventSystemActor.InputType = 1),
      this.CurrentInputModule.SwitchToNavigationInputType());
  }
  InputScroll(t) {
    this.StandaloneInputModule.InputScroll(t),
      Info_1.Info.IsInTouch() ||
        (0 !== t &&
          0 !== (t = this.GetPointerEventData(0, !0)).inputType &&
          ((t.inputType = 0),
          TsLguiEventSystemActor.ChangeController(t.inputType)));
  }
  InputTouchTrigger(t, e, i) {
    let s = e;
    Platform_1.Platform.IsMobilePlatform() &&
      Info_1.Info.IsInGamepad() &&
      (s = e + UiNavigationDefine_1.MOBILE_TOUCHID_ADD_INGAMEPAD),
      this.TouchInputModule.InputTouchTrigger(t, s, i);
  }
  InputTouchMove(t, e) {
    let i = t;
    Platform_1.Platform.IsMobilePlatform() &&
      Info_1.Info.IsInGamepad() &&
      (i = t + UiNavigationDefine_1.MOBILE_TOUCHID_ADD_INGAMEPAD),
      this.TouchInputModule.InputTouchMoved(i, e);
  }
  RefreshCurrentInputModule() {
    Info_1.Info.IsInTouch()
      ? (this.CurrentInputModule = this.TouchInputModule)
      : (this.CurrentInputModule = this.StandaloneInputModule),
      this.CurrentInputModule.Activate(!1);
  }
  GetNowHitComponent() {
    if (this.CurrentInputModule)
      return this.CurrentInputModule.GetNowHitComponent();
  }
  GetPointerEventData(t, e = !1) {
    if (this.CurrentInputModule)
      return this.CurrentInputModule.GetPointerEventData(t, e);
  }
  IsPointerEventDataLineTrace(t) {
    return (
      !!this.CurrentInputModule &&
      this.CurrentInputModule.IsPointerEventDataLineTrace(t)
    );
  }
  SimulateClickButton(t, e, i = new UE.Vector2D(0.5, 0.5)) {
    return this.StandaloneInputModule.SimulationLineTrace(t, e, i);
  }
  SimulationPointerDownUp(t, e, i) {
    return this.StandaloneInputModule.SimulationPointerDownUp(t, e, i);
  }
  SimulationPointerTrigger(t, e) {
    this.StandaloneInputModule.SimulationPointerTrigger(t, e);
  }
  ResetNowIsTriggerPressed(t) {
    this.StandaloneInputModule.ResetNowIsTriggerPressed(t);
  }
  UpdateNavigationListener(t) {
    this.StandaloneInputModule.UpdateNavigation(t);
  }
  SetIsUseMouse(t) {
    this.StandaloneInputModule.SetIsUseMouse(t);
  }
  SetIsForceChange(t) {
    this.StandaloneInputModule.SetIsForceChange(t);
  }
  SetPrevMousePosition(t, e) {
    var i = this.GetPointerEventData(0, !0);
    i && (i.prevMousePos = new UE.Vector2D(t, e));
  }
  SetCurrentInputKeyType(t) {
    this.StandaloneInputModule &&
      this.CurrentInputModule === this.StandaloneInputModule &&
      this.StandaloneInputModule.SetCurrentInputKeyType(t);
  }
  OverrideMousePosition(t) {
    this.StandaloneInputModule &&
      this.StandaloneInputModule.InputOverrideMousePosition(t);
  }
  SetIsOverrideMousePosition(t) {
    this.StandaloneInputModule &&
      (this.StandaloneInputModule.bOverrideMousePosition = t);
  }
  RegisterPointEnterExitEvent() {
    Info_1.Info.IsPcOrGamepadPlatform() &&
      this.EventSystem.RegisterPointerEnterExitEvent(
        (0, puerts_1.toManualReleaseDelegate)(
          CursorController_1.CursorController.CursorEnterExit,
        ),
      );
  }
  UnRegisterPointEnterExitEvent() {
    Info_1.Info.IsPcOrGamepadPlatform() &&
      (this.EventSystem.UnRegisterPointerEnterExitEvent(),
      (0, puerts_1.releaseManualReleaseDelegate)(
        CursorController_1.CursorController.CursorEnterExit,
      ));
  }
  BroadCastInputType() {
    (TsLguiEventSystemActor.InputType = this.EventSystem.defaultInputType),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PointerInputTypeChange,
        this.EventSystem.defaultInputType,
      );
  }
}
((exports.TsLguiEventSystemActor = TsLguiEventSystemActor).InputType = 2),
  (TsLguiEventSystemActor.ChangeController = (t) => {
    0 === t &&
      ((TsLguiEventSystemActor.InputType = 0),
      Info_1.Info.SwitchInputControllerType(1, "MouseMove")),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PointerInputTypeChange,
        t,
      );
  }),
  (exports.default = TsLguiEventSystemActor);
//# sourceMappingURL=TsLguiEventSystemActor.js.map
