"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsLguiEventSystemActor = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Global_1 = require("../../../Game/Global");
const ModelManager_1 = require("../../../Game/Manager/ModelManager");
const CursorController_1 = require("../../../Game/Module/Cursor/CursorController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class TsLguiEventSystemActor extends UE.LGUIEventSystemActor {
  constructor() {
    super(...arguments),
      (this.StandaloneInputModule = void 0),
      (this.TouchInputModule = void 0),
      (this.CurrentInputModule = void 0),
      (this.NavigationEnable = !1),
      (this.HandleWrapper = void 0),
      (this.OnPlatformChanged = (t, e, s) => {});
  }
  InitializeLguiEventSystemActor() {
    this.RefreshCurrentInputModule();
    const t = (0, puerts_1.toManualReleaseDelegate)(
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
    (this.OnPlatformChanged = (t, e, s) => {
      e !== s && this.RefreshCurrentInputModule();
    }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.OnPlatformChanged,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.OnPlatformChanged,
    );
  }
  InputTrigger(t, e) {
    let s;
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      ((s = Global_1.Global.CharacterController) &&
        s.bShowMouseCursor &&
        this.StandaloneInputModule.InputTrigger(t, e));
  }
  InputNavigation(t, e, s = !1) {
    (this.NavigationEnable || s) &&
      this.CurrentInputModule &&
      this.CurrentInputModule.InputNavigation(t, e);
  }
  InputTriggerForNavigation(t) {
    this.CurrentInputModule &&
      this.CurrentInputModule.InputTriggerForNavigation(t);
  }
  InputScroll(t) {
    this.StandaloneInputModule.InputScroll(t),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        (t !== 0 &&
          (t = this.GetPointerEventData(0, !0)).inputType !== 0 &&
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
    ModelManager_1.ModelManager.PlatformModel.IsMobile()
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
  ResetNowIsTriggerPressed() {
    this.StandaloneInputModule.ResetNowIsTriggerPressed();
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
    const s = this.GetPointerEventData(0, !0);
    s && (s.prevMousePos = new UE.Vector2D(t, e));
  }
  SetCurrentInputKeyType(t) {
    this.StandaloneInputModule &&
      this.CurrentInputModule === this.StandaloneInputModule &&
      this.StandaloneInputModule.SetCurrentInputKeyType(t);
  }
  RegisterPointEnterExitEvent() {
    ModelManager_1.ModelManager.PlatformModel.IsPc() &&
      this.EventSystem.RegisterPointerEnterExitEvent(
        (0, puerts_1.toManualReleaseDelegate)(
          CursorController_1.CursorController.CursorEnterExit,
        ),
      );
  }
  UnRegisterPointEnterExitEvent() {
    ModelManager_1.ModelManager.PlatformModel.IsPc() &&
      (this.EventSystem.UnRegisterPointerEnterExitEvent(),
      (0, puerts_1.releaseManualReleaseDelegate)(
        CursorController_1.CursorController.CursorEnterExit,
      ));
  }
  BroadCastInputType() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PointerInputTypeChange,
      this.EventSystem.defaultInputType,
    );
  }
}
((exports.TsLguiEventSystemActor = TsLguiEventSystemActor).ChangeController = (
  t,
) => {
  t === 0 &&
    ModelManager_1.ModelManager.PlatformModel.SwitchInputControllerType(0, 3),
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PointerInputTypeChange,
      t,
    );
}),
  (exports.default = TsLguiEventSystemActor);
// # sourceMappingURL=TsLguiEventSystemActor.js.map
