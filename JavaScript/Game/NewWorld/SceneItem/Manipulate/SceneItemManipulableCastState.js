"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulableCastState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
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
      (this.NeedNotifyServer = !0),
      (this.rAc = new Map()),
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
    if (
      (this.StartCameraShake(this.pYi),
      (this.Timer = 0),
      (this.AfterHit = !1),
      this.SceneItem.ActorComp.Owner.OnActorHit.Clear(),
      this.HitCallback &&
        (this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallback),
        this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.Ynr)),
      (this.SceneItem.NeedRemoveControllerId = !0),
      this.SceneItem.OnCastItem(),
      this.SceneItem.TryAddTagById(1488763518),
      FNameUtil_1.FNameUtil.IsNothing(
        this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
      ) ||
        this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
          this.SceneItem.ManipulateBaseConfig.投掷状态碰撞预设,
        ),
      this.SceneItem.ManipulateBaseConfig.投掷状态CueId &&
        0 < this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Num())
    ) {
      var i =
        Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
          222,
        );
      if (void 0 !== i)
        for (
          let t = 0;
          t < this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Num();
          t++
        ) {
          var e = this.SceneItem.ManipulateBaseConfig.投掷状态CueId.GetKey(t),
            s = this.SceneItem.ManipulateBaseConfig.投掷状态CueId.Get(e);
          if (!(void 0 === s || s <= 0)) {
            var h = i.AddCue(e);
            const o = i.GetCueByHandle(h);
            void 0 !== o &&
              (void 0 ===
              (h = TimerSystem_1.TimerSystem.Delay(() => {
                this.rAc.delete(o), o.Destroy();
              }, s * TimeUtil_1.TimeUtil.InverseMillisecond))
                ? (Log_1.Log.CheckError() &&
                    Log_1.Log.Error("SceneItem", 31, "创建TimerHandle失败", [
                      "CueId",
                      e,
                    ]),
                  o.Destroy())
                : this.rAc.set(o, h));
          }
        }
    }
  }
  OnTick(t) {
    return !0;
  }
  OnExit() {
    if (
      (this.StopCameraShake(),
      this.SceneItem.TryRemoveTagById(1488763518),
      (this.NeedResetPhysicsMode = !0),
      (this.NeedNotifyServer = !0),
      this.HitCallback && this.SceneItem.ActorComp.Owner.OnActorHit.Clear(),
      this.rAc && 0 < this.rAc.size)
    ) {
      for (var [t, i] of this.rAc)
        TimerSystem_1.TimerSystem.Remove(i), t.Destroy();
      this.rAc.clear();
    }
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
        Vector_1.Vector.Create()),
      i = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
      this.SceneItem.ActorComp,
      i,
    ),
      this.CastDirection.CrossProduct(i, t),
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
      (t = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t)),
      (t = UE.KismetMathLibrary.D_FindLookAtRotation(
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
    var i, e, s, h, o;
    this.SceneItem.PlayingMatchSequence ||
      ((i = Vector_1.Vector.Create()),
      this.IsUsePath
        ? ((o = Vector_1.Vector.Create(
            this.SceneItem.ManipulateBaseConfig.投掷运动轨迹曲线.GetVectorValue(
              t,
            ),
          )).MultiplyEqual(this.PathScaleFactor),
          (e = Vector_1.Vector.Create()),
          (s = Vector_1.Vector.Create()),
          (h = Vector_1.Vector.Create()),
          this.CastDirection.Multiply(o.X, e),
          this.Xnr.Multiply(o.Y, s),
          this.$nr.Multiply(o.Z, h),
          i.AdditionEqual(e).AdditionEqual(s).AdditionEqual(h),
          i.AdditionEqual(this.StartLoc))
        : ((o = UE.KismetMathLibrary.Ease(0, 1, t, 6, 3)),
          Vector_1.Vector.Lerp(
            this.StartLoc,
            this.SceneItem.CastTargetLocation,
            o,
            i,
          )),
      this.SceneItem.ActorComp.SetActorLocation(
        i.ToUeVector(),
        "[ManipulableCastState.UpdateLocation]",
        void 0 !== this.HitCallback,
      ));
  }
  HasHitCallback() {
    return void 0 !== this.HitCallback;
  }
  CallHitCallback(t, i) {
    this.HitCallback && this.HitCallback(t, i);
  }
}
exports.SceneItemManipulableCastState = SceneItemManipulableCastState;
//# sourceMappingURL=SceneItemManipulableCastState.js.map
