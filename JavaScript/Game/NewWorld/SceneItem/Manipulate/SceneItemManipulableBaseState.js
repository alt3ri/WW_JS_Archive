"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableBaseState = void 0);
const UE = require("ue"),
  Global_1 = require("../../../Global");
class SceneItemManipulableBaseState {
  constructor(e) {
    (this.SceneItem = void 0),
      (this.PropComp = void 0),
      (this.Unr = void 0),
      (this.EnterCallback = void 0),
      (this.ExitCallback = void 0),
      (this.Timer = 0),
      (this.UeActorComp = void 0),
      (this.SceneItem = e),
      (this.PropComp = e.PropComp),
      (this.UeActorComp = e.ActorComp?.Owner?.GetComponentByClass(
        UE.ActorComponent.StaticClass(),
      ));
  }
  ChangeMoveController(e) {
    this.OnChangeMoveController(e);
  }
  OnChangeMoveController(e) {
    if (e)
      switch (this.SceneItem?.GetState()) {
        case 8:
        case 7:
        case 6:
        case 4:
        case 11:
        case 3:
          this.SceneItem?.SetState(9, "OnChangeMoveController");
      }
    else this.OnExit();
  }
  Enter(e) {
    e
      ? this.OnEnter !== SceneItemManipulableBaseState.prototype.OnEnter &&
        this.OnEnter()
      : this.OnSimulateEnter !==
          SceneItemManipulableBaseState.prototype.OnSimulateEnter &&
        this.OnSimulateEnter();
  }
  OnEnter() {}
  OnSimulateEnter() {}
  Tick(e, t) {
    t
      ? this.OnTick !== SceneItemManipulableBaseState.prototype.OnTick &&
        this.OnTick(e)
      : this.OnSimulateTick !==
          SceneItemManipulableBaseState.prototype.OnSimulateTick &&
        this.OnSimulateTick(e);
  }
  OnTick(e) {}
  OnSimulateTick(e) {}
  Exit(e) {
    e
      ? this.OnExit !== SceneItemManipulableBaseState.prototype.OnExit &&
        this.OnExit()
      : this.OnSimulateExit !==
          SceneItemManipulableBaseState.prototype.OnSimulateExit &&
        this.OnSimulateExit();
  }
  OnExit() {}
  OnSimulateExit() {}
  StartCameraShake(e) {
    var t = Global_1.Global.CharacterCameraManager;
    t?.IsValid() && e?.IsValid() && (this.Unr = t.StartMatineeCameraShake(e));
  }
  StopCameraShake() {
    var e = Global_1.Global.CharacterCameraManager;
    e?.IsValid() && this.Unr?.IsValid() && e.StopCameraShake(this.Unr);
  }
  OpenPhysicsSplit() {
    this.UeActorComp?.IsValid() &&
      (this.UeActorComp.bEnableAutoPhysicsSplit = !0);
  }
  ClosePhysicsSplit() {
    this.UeActorComp?.IsValid() &&
      ((this.UeActorComp.bEnableAutoPhysicsSplit = !1),
      this.UeActorComp.KuroCreatePhysicsState());
  }
  IsNoLockCasting() {
    return !1;
  }
}
exports.SceneItemManipulableBaseState = SceneItemManipulableBaseState;
//# sourceMappingURL=SceneItemManipulableBaseState.js.map
