"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulatableCastProjectileState = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, i) {
    super(t, i),
      (this.Vnr = void 0),
      (this.Hnr = void 0),
      (this.U0a = void 0),
      (this.w0a = void 0),
      (this.jnr = 0),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create()),
      (this.Knr = Vector_1.Vector.Create()),
      (this.P0a = !1),
      (this.StateType = "BeCastingFree");
  }
  OnEnter() {
    super.OnEnter(),
      this.Qnr(),
      (this.jnr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation)),
      (this.P0a = !1),
      this.EnterCallback && this.EnterCallback();
  }
  OnTick(t) {
    t = this.jnr * t;
    this.nJo += t;
    let i = new UE.Vector();
    return (
      (i = (
        this.P0a ? this.U0a : this.Vnr
      ).GetWorldLocationAtDistanceAlongSpline(this.nJo)),
      this.SceneItem.ActorComp.SetActorLocation(i),
      !this.P0a && this.nJo >= this.Vnr.GetSplineLength()
        ? this.U0a
          ? ((this.P0a = !0),
            this.SceneItem.ActorComp.SetActorLocation(
              this.U0a.GetWorldLocationAtDistanceAlongSpline(0),
              "[SceneItemManipulatableCastProjectileState] OnTeleport",
              !1,
            ),
            (this.nJo = 0))
          : ((this.SceneItem.CastFreeState.NeedNotifyServer = !1),
            (this.SceneItem.CurrentState = this.SceneItem.CastFreeState))
        : this.P0a &&
          this.nJo >= this.U0a.GetSplineLength() &&
          (this.SceneItem.CurrentState = this.SceneItem.ResetState),
      (this.SceneItem.ActorComp.PhysicsMode = 3),
      (this.Knr = Vector_1.Vector.Create()),
      this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(
        this.Wnr,
        this.Knr,
      ),
      this.Knr.Normalize(),
      (this.Wnr = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocation,
      )),
      !0
    );
  }
  OnExit() {
    super.OnExit(),
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
        this.Knr.MultiplyEqual(this.jnr).ToUeVector(),
      ),
      this.Hnr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Hnr),
        (this.Hnr = void 0),
        (this.Vnr = void 0)),
      this.w0a?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.w0a),
        (this.w0a = void 0),
        (this.U0a = void 0));
  }
  Qnr() {
    var t,
      i = this.SceneItem.LastHoldingLocation.ToUeVector(),
      e = ModelManager_1.ModelManager.ManipulaterModel.GetProjectilePath(),
      s =
        ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalProjectilePath(),
      h = Vector_1.Vector.Create(e.Get(e.Num() - 1));
    h.SubtractionEqual(Vector_1.Vector.Create(e.Get(e.Num() - 2))),
      h.Normalize(),
      s.Num() <= 0
        ? ((t = Vector_1.Vector.Create(e.Get(e.Num() - 1))).AdditionEqual(
            h.MultiplyEqual(
              2 * this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            ),
          ),
          e.Add(t.ToUeVector()))
        : ((t = Vector_1.Vector.Create(s.Get(s.Num() - 1))).AdditionEqual(
            h.MultiplyEqual(
              2 * this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            ),
          ),
          s.Add(t.ToUeVector())),
      (this.Hnr = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      this.Hnr.K2_SetActorLocation(i, !1, void 0, !0),
      (this.Vnr = this.Hnr.GetComponentByClass(
        UE.SplineComponent.StaticClass(),
      )),
      this.Vnr.SetSplinePoints(e, 0, !0),
      0 < s.Num() &&
        ((this.w0a = ActorSystem_1.ActorSystem.Get(
          UE.BP_BasePathLine_C.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        )),
        (h =
          ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalStartPosition()),
        this.w0a.K2_SetActorLocation(h, !1, void 0, !0),
        (this.U0a = this.w0a.GetComponentByClass(
          UE.SplineComponent.StaticClass(),
        )),
        this.U0a.SetSplinePoints(s, 0, !0));
  }
}
exports.SceneItemManipulatableCastProjectileState =
  SceneItemManipulatableCastProjectileState;
//# sourceMappingURL=SceneItemManipulableCastProjectileState.js.map
