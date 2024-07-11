"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableCastFreeState = void 0);
const UE = require("ue");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(e, t) {
    super(e, t),
      (this.jrr = new UE.Vector()),
      (this.StateType = "BeCastingFree");
  }
  SetForward(e) {
    this.jrr = e;
  }
  OnEnter() {
    super.OnEnter();
    let e = 1;
    let t = 0;
    var s = this.SceneItem.Config.ThrowCfg.MotionConfig;
    var s =
      (s.Type === IComponent_1.EThrowMotion.Projectile &&
        ((e = s.Velocity), (t = s.AngularVelocity)),
      (this.SceneItem.IsCanBeHeld = !1),
      this.NeedResetPhysicsMode && (this.SceneItem.ActorComp.PhysicsMode = 3),
      UE.KismetMathLibrary.RandomUnitVector());
    const i = this.SceneItem.ActorComp.GetPrimitiveComponent();
    i.SetPhysicsLinearVelocity(this.jrr.op_Multiply(e)),
      i.SetPhysicsAngularVelocityInDegrees(s.op_Multiply(t)),
      (this.SceneItem.TargetActorComponent = void 0),
      (this.SceneItem.TargetOutletComponent = void 0),
      this.EnterCallback && this.EnterCallback();
  }
  OnTick(e) {
    return this.UpdateRotationAccordingToVelocity(), !0;
  }
}
exports.SceneItemManipulableCastFreeState = SceneItemManipulableCastFreeState;
// # sourceMappingURL=SceneItemManipulableCastFreeState.js.map
