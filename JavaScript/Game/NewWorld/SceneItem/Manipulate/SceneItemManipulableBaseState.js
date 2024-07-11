"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableBaseState = void 0);
const UE = require("ue"),
  Global_1 = require("../../../Global");
class SceneItemManipulableBaseState {
  constructor(t) {
    (this.SceneItem = void 0),
      (this.PropComp = void 0),
      (this.Unr = void 0),
      (this.StateType = "Reset"),
      (this.EnterCallback = void 0),
      (this.ExitCallback = void 0),
      (this.Timer = 0),
      (this.UeActorComp = void 0),
      (this.SceneItem = t),
      (this.PropComp = t.PropComp),
      (this.UeActorComp = t.ActorComp?.Owner?.GetComponentByClass(
        UE.ActorComponent.StaticClass(),
      ));
  }
  Enter() {
    (this.SceneItem.State = this.StateType), this.OnEnter();
  }
  OnEnter() {}
  Tick(t) {
    return this.OnTick(t);
  }
  OnTick(t) {
    return !0;
  }
  Exit() {
    this.OnExit();
  }
  OnExit() {}
  End() {}
  StartCameraShake(t) {
    var i = Global_1.Global.CharacterCameraManager;
    i?.IsValid() && t?.IsValid() && (this.Unr = i.StartMatineeCameraShake(t));
  }
  StopCameraShake() {
    var t = Global_1.Global.CharacterCameraManager;
    t?.IsValid() && this.Unr?.IsValid() && t.StopCameraShake(this.Unr);
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
}
exports.SceneItemManipulableBaseState = SceneItemManipulableBaseState;
//# sourceMappingURL=SceneItemManipulableBaseState.js.map
