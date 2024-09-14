"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, e) {
    var h,
      o = arguments.length,
      r =
        o < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, s))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, s, e);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (h = t[n]) && (r = (o < 3 ? h(r) : 3 < o ? h(i, s, r) : h(i, s)) || r);
    return 3 < o && r && Object.defineProperty(i, s, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcAnimationComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  BaseAnimationComponent_1 = require("../../Common/Component/BaseAnimationComponent"),
  TURN_SPEED = 0.36,
  TURN_RATIO = 0.04;
let SimpleNpcAnimationComponent = class SimpleNpcAnimationComponent extends BaseAnimationComponent_1.BaseAnimationComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.SlopeStepPeriodicCurve = void 0),
      (this.SlopeStepSizeCurve = void 0),
      (this.n3r = Vector_1.Vector.Create()),
      (this.s3r = void 0),
      (this.az = Quat_1.Quat.Create()),
      (this.h3r = Vector_1.Vector.Create()),
      (this.l3r = Vector_1.Vector.Create()),
      (this.g3r = 0),
      (this.p3r = -1);
  }
  static get Dependencies() {
    return [179, 0];
  }
  x3r() {
    0 < this.p3r
      ? this.p3r--
      : 0 === this.p3r &&
        (this.ActorComp.EnableActor(this.g3r),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 58, "人物上场隐藏一帧 【隐藏结束】", [
            "Entity:",
            this.Entity.Id,
          ]),
        (this.g3r = void 0),
        (this.ActorComp.Actor.Mesh.VisibilityBasedAnimTickOption =
          this.DefaultVisibilityBasedAnimTickOption),
        (this.p3r = -1));
  }
  OnInit() {
    var t;
    return (
      super.OnInit(),
      (this.SlopeStepPeriodicCurve =
        ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
          UE.CurveFloat,
        )),
      (this.SlopeStepSizeCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
        UE.CurveFloat,
      )),
      !(
        !this.SlopeStepPeriodicCurve ||
        !this.SlopeStepSizeCurve ||
        ((t = this.Entity.GetComponent(0).GetModelConfig().注释时的抬升角度) &&
          ((this.s3r = Quat_1.Quat.Create()),
          Quat_1.Quat.FindBetween(
            Vector_1.Vector.ForwardVectorProxy,
            Vector_1.Vector.Create(
              Math.cos(t * MathUtils_1.MathUtils.DegToRad),
              0,
              Math.sin(t * MathUtils_1.MathUtils.DegToRad),
            ),
            this.s3r,
          )),
        0)
      )
    );
  }
  OnStart() {
    return (
      (this.ActorComp = this.Entity.CheckGetComponent(179)),
      this.ActorComp.Actor?.Mesh
        ? ((this.Actor = this.ActorComp.Actor),
          (this.Mesh = this.Actor.Mesh),
          this.GetAnimInstanceFromMesh(),
          !!this.MainAnimInstanceInternal &&
            (this.InitBaseInfo(), this.CheckNpcAnimationAssets(), !0))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 6, "模型仍未初始化", [
              "Entity",
              this.Entity.Id,
            ]),
          !1)
    );
  }
  InitBaseInfo() {
    this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
      this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
      (this.IsPlayer = !1),
      (this.DefaultVisibilityBasedAnimTickOption = 3),
      this.Grn();
  }
  OnActivate() {
    this.StartAnimInstance();
  }
  OnTick(t) {
    this.x3r(), this.b3r(t);
  }
  OnDisable() {
    0 <= this.p3r &&
      (this.ActorComp.EnableActor(this.g3r), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Character",
        58,
        "人物上场隐藏一帧 【组件Disable 隐藏结束】",
        ["Entity:", this.Entity.Id],
      ),
      (this.p3r = -1),
      this.Entity.GetComponent(172)?.AnyIdleLoopMontagePlaying ||
        (this.MainAnimInstanceInternal?.IsValid() &&
          (this.StopMontage(),
          UE.KuroAnimLibrary.EndAnimNotifyStates(
            this.MainAnimInstanceInternal,
          )));
  }
  b3r(t) {
    this.EnableSightDirectInternal &&
      (this.SightTargetItemId || this.SightTargetPoint
        ? this.F3r(this.n3r)
        : this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy),
      this.O3r(t));
  }
  O3r(t) {
    this.h3r.FromUeVector(this.n3r),
      this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion()),
      this.az.Inverse(this.az),
      this.l3r.FromUeVector(this.n3r),
      this.az.RotateVector(this.n3r, this.n3r),
      this.ClampSightDirect(this.n3r, this.n3r),
      (this.SightDirectIsEqual && this.n3r.Equals(this.SightDirect)) ||
        (BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(
          this.SightDirect2,
          this.n3r,
          t * TURN_SPEED,
          this.SightDirect2,
        ),
        BaseAnimationComponent_1.BaseAnimationComponent.LerpVector2dByAlpha(
          this.SightDirect,
          this.SightDirect2,
          1 -
            Math.pow(TURN_RATIO, t * MathUtils_1.MathUtils.MillisecondToSecond),
          this.SightDirect,
        ),
        (this.SightDirectIsEqual = this.SightDirect.Equals(this.SightDirect2)),
        this.SightDirect.ContainsNaN() &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              6,
              "UpdateHeadRotation Contains Nan.",
              ["BeforeRotate", this.h3r],
              ["BeforeClamp", this.l3r],
              ["TargetDirect", this.n3r],
              ["SightDirect", this.SightDirect],
              ["SightDirect2", this.SightDirect2],
              ["quatInverse", this.az],
              ["IsPlayer", this.IsPlayer],
              ["CanResponseInput", !1],
              ["Delta", t],
            ),
          this.SightDirect.Set(0, 1, 0),
          this.SightDirect2.Set(0, 1, 0)));
  }
  F3r(t) {
    var i = this.GetSightTargetItem();
    !i ||
    ((this.SightTargetPoint ?? i.ActorLocationProxy).Subtraction(
      this.ActorComp.ActorLocationProxy,
      this.h3r,
    ),
    (0, RegisterComponent_1.isComponentInstance)(i, 2)
      ? (this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight)
      : (this.h3r.Z -= this.ActorComp.ScaledHalfHeight),
    this.h3r.IsNearlyZero())
      ? t.DeepCopy(this.ActorComp.ActorForwardProxy)
      : (t.DeepCopy(this.h3r), this.j3r(t));
  }
  j3r(t) {
    this.s3r &&
      (this.ActorComp.ActorQuatProxy.Inverse(this.az),
      this.az.RotateVector(t, t),
      this.s3r.RotateVector(t, t),
      this.ActorComp.ActorQuatProxy.RotateVector(t, t));
  }
  Grn(t = !0) {
    var i = Info_1.Info.IsMobilePlatform(),
      s = new UE.AnimUpdateRateParameters(),
      e = this.Mesh.LODInfo.Num();
    if (t)
      (s.bShouldUseDistanceMap = !0),
        s.BaseVisibleDistanceThresholds.Empty(),
        s.BaseVisibleDistanceThresholds.Add(i ? 50 : 800),
        s.BaseVisibleDistanceThresholds.Add(i ? 200 : 1500),
        s.BaseVisibleDistanceThresholds.Add(i ? 500 : 4e3),
        s.BaseVisibleDistanceThresholds.Add(i ? 1500 : 5e3),
        s.BaseVisibleDistanceThresholds.Add(i ? 2500 : 8e3);
    else {
      (s.bShouldUseLodMap = !0), s.LODToFrameSkipMap.Empty();
      for (let t = 0; t < e; t++) s.LODToFrameSkipMap.Add(t, t < 2 ? 0 : t - 1);
    }
    (s.BaseNonRenderedUpdateRate = 8), (s.MaxEvalRateForInterpolation = 8);
    var h = (0, puerts_1.$ref)(s),
      o = this.Actor.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      );
    for (let t = 0; t < o.Num(); t++) {
      var r = o.Get(t);
      (r.bEnableUpdateRateOptimizations = !0),
        r.SetAnimUpdateRateParameters(h),
        (r.VisibilityBasedAnimTickOption =
          this.DefaultVisibilityBasedAnimTickOption);
    }
    (0, puerts_1.$unref)(h);
  }
};
(SimpleNpcAnimationComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(180)],
  SimpleNpcAnimationComponent,
)),
  (exports.SimpleNpcAnimationComponent = SimpleNpcAnimationComponent);
//# sourceMappingURL=SimpleNpcAnimationComponent.js.map
