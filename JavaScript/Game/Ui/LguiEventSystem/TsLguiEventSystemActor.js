"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsLguiEventSystemActor = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Global_1 = require("../../../Game/Global"),
  CursorController_1 = require("../../../Game/Module/Cursor/CursorController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class TsLguiEventSystemActor extends UE.LGUIEventSystemActor {
  constructor() {
    super(...arguments),
      (this.StandaloneInputModule = void 0),
      (this.TouchInputModule = void 0),
      (this.CurrentInputModule = void 0),
      (this.NavigationEnable = !1),
      (this.HandleWrapper = void 0),
      (this.ShowTypeChange = (t, e) => {});
  }
  InitializeLguiEventSystemActor() {
    this.RefreshCurrentInputModule();
    var t = (0, puerts_1.toManualReleaseDelegate)(
      TsLguiEventSystemActor.ChangeController,
    );
    (this.HandleWrapper =
      this.StandaloneInputModule.RegisterInputChangeEvent(t)),
      this.AddEvents(),
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
  InputTrigger(t, e) {
    var s;
    Info_1.Info.IsInTouch() ||
      ((s = Global_1.Global.CharacterController) &&
        s.bShowMouseCursor &&
        this.StandaloneInputModule.InputTrigger(t, e));
  }
  InputNavigation(t, e, s = !1) {
    (this.NavigationEnable || s) &&
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
  InputTouchTrigger(t, e, s) {
    this.TouchInputModule.InputTouchTrigger(t, e, s);
  }
  InputTouchMove(t, e) {
    this.TouchInputModule.InputTouchMoved(t, e);
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
  SimulateClickButton(t, e, s = new UE.Vector2D(0.5, 0.5)) {
    return this.StandaloneInputModule.SimulationLineTrace(t, e, s);
  }
  SimulationPointerDownUp(t, e, s) {
    return this.StandaloneInputModule.SimulationPointerDownUp(t, e, s);
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
    var s = this.GetPointerEventData(0, !0);
    s && (s.prevMousePos = new UE.Vector2D(t, e));
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
