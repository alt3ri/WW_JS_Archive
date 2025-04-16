"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulatableCastProjectileState = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulatableCastProjectileState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments),
      (this.Vnr = void 0),
      (this.Hnr = void 0),
      (this.wga = void 0),
      (this.Pga = void 0),
      (this.jnr = 0),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create()),
      (this.Knr = Vector_1.Vector.Create()),
      (this.xga = !1);
  }
  OnEnter() {
    super.OnEnter(),
      this.Qnr(),
      (this.jnr = this.SceneItem.ManipulateBaseConfig.抛物瞄准模式初速度),
      (this.nJo = 0),
      (this.Wnr = Vector_1.Vector.Create(this.SceneItem.LastHoldingLocation)),
      (this.xga = !1),
      this.NeedNotifyServer &&
        LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
          this.SceneItem.Entity.Id,
          Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateFreeThrowing,
        ),
      this.EnterCallback && this.EnterCallback();
  }
  OnTick(t) {
    t = this.jnr * t;
    this.nJo += t;
    let e = new UE.VectorDouble();
    return (
      (e = (this.xga ? this.wga : this.Vnr).D_GetLocationAtDistanceAlongSpline(
        this.nJo,
        1,
      )),
      this.SceneItem.ActorComp.SetActorLocation(e),
      !this.xga && this.nJo >= this.Vnr.GetSplineLength()
        ? this.wga
          ? ((this.xga = !0),
            this.SceneItem.ActorComp.SetActorLocation(
              this.wga.D_GetLocationAtDistanceAlongSpline(0, 1),
              "[SceneItemManipulatableCastProjectileState] OnTeleport",
              !1,
            ),
            (this.nJo = 0))
          : ((this.SceneItem.CastFreeState.NeedNotifyServer = !1),
            this.SceneItem?.SetState(
              9,
              "CastProjectileState over spline and no afterPortal",
            ))
        : this.xga &&
          this.nJo >= this.wga.GetSplineLength() &&
          this.SceneItem?.SetState(1, "CastProjectileState over spline"),
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
        this.Knr.MultiplyEqual(this.jnr).ToUeVectorOld(),
      ),
      this.Hnr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(
          "SceneItemManipulatableCastProjectileState.OnExit1",
          this.Hnr,
        ),
        (this.Hnr = void 0),
        (this.Vnr = void 0)),
      this.Pga?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(
          "SceneItemManipulatableCastProjectileState.OnExit2",
          this.Pga,
        ),
        (this.Pga = void 0),
        (this.wga = void 0));
  }
  Qnr() {
    var t,
      e = this.SceneItem.LastHoldingLocation.ToUeVector(),
      i = ModelManager_1.ModelManager.ManipulaterModel.GetProjectilePath(),
      s =
        ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalProjectilePath(),
      r = Vector_1.Vector.Create(i.Get(i.Num() - 1));
    r.SubtractionEqual(Vector_1.Vector.Create(i.Get(i.Num() - 2))),
      r.Normalize(),
      s.Num() <= 0
        ? ((t = Vector_1.Vector.Create(i.Get(i.Num() - 1))).AdditionEqual(
            r.MultiplyEqual(
              2 * this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            ),
          ),
          i.Add(t.ToUeVector()))
        : ((t = Vector_1.Vector.Create(s.Get(s.Num() - 1))).AdditionEqual(
            r.MultiplyEqual(
              2 * this.SceneItem.ManipulateBaseConfig.抛物瞄准射线检测半径,
            ),
          ),
          s.Add(t.ToUeVector())),
      (this.Hnr = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePathLine_C.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransformDouble,
      )),
      this.Hnr.D_K2_SetActorLocation(e, !1, void 0, !0),
      (this.Vnr = this.Hnr.GetComponentByClass(
        UE.SplineComponent.StaticClass(),
      )),
      this.Vnr.D_SetSplinePoints(i, 0, !0),
      0 < s.Num() &&
        ((this.Pga = ActorSystem_1.ActorSystem.Get(
          UE.BP_BasePathLine_C.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransformDouble,
        )),
        (r =
          ModelManager_1.ModelManager.ManipulaterModel.GetAfterPortalStartPosition()),
        this.Pga.D_K2_SetActorLocation(r, !1, void 0, !0),
        (this.wga = this.Pga.GetComponentByClass(
          UE.SplineComponent.StaticClass(),
        )),
        this.wga.D_SetSplinePoints(s, 0, !0));
  }
  IsNoLockCasting() {
    return !0;
  }
}
exports.SceneItemManipulatableCastProjectileState =
  SceneItemManipulatableCastProjectileState;
//# sourceMappingURL=SceneItemManipulableCastProjectileState.js.map
