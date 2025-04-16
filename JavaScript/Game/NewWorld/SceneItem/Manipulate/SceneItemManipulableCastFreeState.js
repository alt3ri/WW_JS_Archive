"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableCastFreeState = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments), (this.Fnr = new UE.Vector());
  }
  SetForward(e) {
    this.Fnr = e;
  }
  OnEnter() {
    super.OnEnter();
    let e = 1,
      t = 0;
    var r = this.SceneItem.Config.ThrowCfg.MotionConfig,
      r =
        (r.Type === IComponent_1.EThrowMotion.Projectile &&
          ((e = r.Velocity), (t = r.AngularVelocity)),
        (this.SceneItem.IsCanBeHeld = !1),
        this.NeedResetPhysicsMode && (this.SceneItem.ActorComp.PhysicsMode = 3),
        this.NeedNotifyServer &&
          LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
            this.SceneItem.Entity.Id,
            Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateFreeThrowing,
          ),
        UE.KismetMathLibrary.RandomUnitVector()),
      o = this.SceneItem.ActorComp.GetPrimitiveComponent();
    o.SetPhysicsLinearVelocity(this.Fnr.op_Multiply(e)),
      o.SetPhysicsAngularVelocityInDegrees(r.op_Multiply(t)),
      (this.SceneItem.TargetActorComponent = void 0),
      (this.SceneItem.TargetOutletComponent = void 0),
      this.EnterCallback && this.EnterCallback();
  }
  OnTick(e) {
    return this.UpdateRotationAccordingToVelocity(), !0;
  }
  OnChangeMoveController(e) {
    e
      ? this.SceneItem && (e = this.SceneItem.ActorComp) && (e.PhysicsMode = 3)
      : this.OnExit();
  }
  IsNoLockCasting() {
    return !0;
  }
}
exports.SceneItemManipulableCastFreeState = SceneItemManipulableCastFreeState;
//# sourceMappingURL=SceneItemManipulableCastFreeState.js.map
