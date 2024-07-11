"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableCastState = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableCastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t, i) {
    super(t),
      (this.pYi = void 0),
      (this.CastDuration = -0),
      (this.CastRotAxis = void 0),
      (this.StartLoc = void 0),
      (this.StartRot = void 0),
      (this.IsUsePath = !1),
      (this.PathScaleFactor = -0),
      (this.CastDirection = void 0),
      (this.FinishCallback = void 0),
      (this.HitCallback = void 0),
      (this.Xnr = Vector_1.Vector.Create()),
      (this.$nr = Vector_1.Vector.Create()),
      (this.AfterHit = !1),
      (this.NeedResetPhysicsMode = !0),
      (this.Ynr = () => {
        this.AfterHit = !0;
      }),
      (this.pYi = i);
  }
  SetFinishCallback(t) {
    this.FinishCallback = t;
  }
  SetHitCallback(t) {
    this.HitCallback = t;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.StartCameraShake(this.pYi),
      (this.Timer = 0),
      (this.AfterHit = !1),
      this.SceneItem.ActorComp.Owner.OnActorHit.Clear(),
      this.HitCallback &&
        (this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
        this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.Ynr)),
      (this.SceneItem.NeedRemoveControllerId = !0),
      LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
        this.SceneItem.Entity.Id,
        !1,
      ),
      this.SceneItem.OnCastItem(),
      this.SceneItem.TryAddTagById(1488763518),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
        );
  }
  OnTick(t) {
    return !0;
  }
  OnExit() {
    this.StopCameraShake(),
      this.SceneItem.TryRemoveTagById(1488763518),
      (this.NeedResetPhysicsMode = !0);
  }
  StartCast() {
    var t = Vector_1.Vector.Dist(
      this.SceneItem.ActorComp.ActorLocationProxy,
      this.SceneItem.TargetActorComponent.ActorLocationProxy,
    );
    let i = 1;
    var e = this.SceneItem.Config.ThrowCfg.MotionConfig;
    e.Type === IComponent_1.EThrowMotion.Projectile && (i = e.Velocity),
      (this.CastDuration = t / i),
      (this.CastRotAxis = Vector_1.Vector.Create(
        UE.KismetMathLibrary.RandomUnitVector(),
      )),
      (this.StartLoc = Vector_1.Vector.Create(
        this.SceneItem.ActorComp.ActorLocation,
      )),
      (this.StartRot = Rotator_1.Rotator.Create(
        this.SceneItem.ActorComp.ActorRotation,
      )),
      (this.SceneItem.ActorComp.PhysicsMode = 0);
  }
  CalcDirection() {
    this.SceneItem.CalcCastTargetPoint();
    var t = Vector_1.Vector.Create(this.SceneItem.CastTargetLocation),
      t =
        (t.SubtractionEqual(this.StartLoc),
        this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线?.IsValid() &&
          (this.IsUsePath =
            t.Size() >
            ConfigManager_1.ConfigManager.ManipulateConfig.DontUseLineDistance),
        (this.PathScaleFactor = t.Size()),
        t.Normalize(),
        (this.CastDirection = Vector_1.Vector.Create(t)),
        Vector_1.Vector.Create());
    this.CastDirection.CrossProduct(Vector_1.Vector.UpVectorProxy, t),
      t.CrossProduct(this.CastDirection, this.$nr),
      this.$nr.Normalize(),
      this.$nr.CrossProduct(this.CastDirection, this.Xnr),
      this.Xnr.Normalize();
  }
  UpdateRotationAccordingToVelocity() {
    var t;
    this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
      !this.AfterHit &&
      ((t =
        this.SceneItem.ActorComp.GetPrimitiveComponent().GetComponentVelocity()).Normalize(
        MathCommon_1.MathCommon.SmallNumber,
      ),
      (t = UE.KismetMathLibrary.FindLookAtRotation(
        this.SceneItem.ActorComp.ActorLocation,
        this.SceneItem.ActorComp.ActorLocation.op_Addition(t),
      )),
      this.SceneItem.ActorComp.SetActorRotation(
        t,
        "[ManipulableCastState.UpdateRotationAccordingToVelocity]",
        !1,
      ));
  }
  UpdateLocation(t) {
    var i, e, s, h, a;
    this.SceneItem.PlayingMatchSequence ||
      ((i = Vector_1.Vector.Create()),
      this.IsUsePath
        ? ((a = Vector_1.Vector.Create(
            this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线.GetVectorValue(
              t,
            ),
          )).MultiplyEqual(this.PathScaleFactor),
          (e = Vector_1.Vector.Create()),
          (s = Vector_1.Vector.Create()),
          (h = Vector_1.Vector.Create()),
          this.CastDirection.Multiply(a.X, e),
          this.Xnr.Multiply(a.Y, s),
          this.$nr.Multiply(a.Z, h),
          i.AdditionEqual(e).AdditionEqual(s).AdditionEqual(h),
          i.AdditionEqual(this.StartLoc))
        : ((a = UE.KismetMathLibrary.Ease(0, 1, t, 6, 3)),
          Vector_1.Vector.Lerp(
            this.StartLoc,
            this.SceneItem.CastTargetLocation,
            a,
            i,
          )),
      this.SceneItem.ActorComp.SetActorLocation(
        i.ToUeVector(),
        "[ManipulableCastState.UpdateLocation]",
        void 0 !== this.HitCallback,
      ));
  }
}
exports.SceneItemManipulableCastState = SceneItemManipulableCastState;
//# sourceMappingURL=SceneItemManipulableCastState.js.map
