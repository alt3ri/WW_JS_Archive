"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var r,
      h = arguments.length,
      o =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, i, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (o = (h < 3 ? r(o) : 3 < h ? r(e, i, o) : r(e, i)) || o);
    return 3 < h && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoPerformComponent = void 0);
const UE = require("ue"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  StackableChessComponent_1 = require("./StackableChessComponent"),
  STAND_DELAY_TIME = 100,
  SCALE_SIZE = 1.2;
let DangoPerformComponent = class DangoPerformComponent extends StackableChessComponent_1.StackableChessComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.rRe = void 0),
      (this.IsBeginJump = !1),
      (this.IsInterruptJump = !1),
      (this.JumpHeight = 0),
      (this.JumpDistance = 0),
      (this.tu = 0),
      (this.mMc = 0),
      (this.Fxc = 0),
      (this.fMc = void 0),
      (this.Asr = Vector_1.Vector.Create()),
      (this.gMc = Vector_1.Vector.Create()),
      (this.CMc = Rotator_1.Rotator.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.cie = Rotator_1.Rotator.Create());
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.ActorComp = this.Entity.CheckGetComponent(2)), !0)
    );
  }
  OnActivate() {
    var t = this.Entity.GetComponent(175)?.MainAnimInstance,
      t =
        (t &&
          UE.KuroStaticLibrary.IsObjectClassByName(
            t,
            new UE.FName("ABP_TuanziNPC_C"),
          ) &&
          (this.rRe = t),
        this.ActorComp?.Owner);
    t?.IsValid() &&
      (this.cz.Set(SCALE_SIZE, SCALE_SIZE, SCALE_SIZE),
      t.D_SetActorScale3D(this.cz.ToUeVector()),
      (t = t.GetComponentByClass(
        UE.CharacterMovementComponent.StaticClass(),
      ))) &&
      t.SetComponentTickEnabled(!1);
  }
  OnTick(e) {
    if (0 !== this.tu) {
      var i = ModelManager_1.ModelManager.DangoGlobalModel.Config;
      if (i)
        if (this.mMc >= i.MoveTotalTime) this.pMc();
        else if (((this.mMc += e), !(this.mMc <= i.MoveStartingTime)))
          if (this.mMc >= i.MoveStartingTime + i.MoveTime)
            2 === this.tu &&
              (this.ActorComp.SetActorLocationAndRotation(
                this.gMc.ToUeVector(),
                this.CMc.ToUeRotator(),
                "ChessMove",
              ),
              (this.tu = 3));
          else {
            2 !== this.tu &&
              ((this.tu = 2),
              ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoMoveCamera(
                this.gMc,
              ));
            var s = (this.mMc - i.MoveStartingTime) / i.MoveTime,
              r =
                (Vector_1.Vector.Lerp(this.Asr, this.gMc, s, this.cz),
                this.$xc(s, 2));
            let t = 0;
            t = (
              0 < this.Fxc ? i.MoveRiseCurve : i.MoveFallCurve
            ).GetFloatValue(s);
            (s = Math.abs(this.Fxc)),
              (r = (r * (1 - s) + t * s) * i.MoveBaseHeightOffset),
              (s = ((this.cz.Z += r), this.ActorComp.ActorRotationProxy));
            s.Equals2(this.CMc) ||
              (this.cie.DeepCopy(this.CMc),
              MathUtils_1.MathUtils.RotatorInterpConstantTo(
                s,
                this.cie,
                e * MathUtils_1.MathUtils.MillisecondToSecond,
                i.MoveRotateSpeed,
                this.cie,
              )),
              this.ActorComp.SetActorLocationAndRotation(
                this.cz.ToUeVector(),
                this.cie.ToUeRotator(),
                "ChessMove",
              );
          }
    }
  }
  $xc(t, e) {
    return 1 - Math.pow(Math.abs(2 * t - 1), e);
  }
  GetStackableLocation() {
    var t;
    if (this.ActorComp?.Valid)
      return (
        this.cz.DeepCopy(this.ActorComp.ActorLocationProxy),
        (t = (t = ModelManager_1.ModelManager.DangoGlobalModel.Config)
          ? t.StackInterval
          : 0),
        (this.cz.Z += t * SCALE_SIZE),
        this.cz
      );
  }
  OnPreviousMoveStateChange(t, e) {
    e
      ? ((this.JumpHeight = t.JumpHeight),
        (this.JumpDistance = t.JumpDistance),
        this.r01(this.JumpHeight, this.JumpDistance))
      : ((this.JumpHeight = 0), (this.JumpDistance = 0), this.o01());
  }
  Move(t, e, i) {
    var s;
    this.ActorComp?.Valid
      ? (s = ModelManager_1.ModelManager.DangoGlobalModel.Config) &&
        (this.Asr.DeepCopy(this.ActorComp.ActorLocationProxy),
        this.gMc.DeepCopy(t),
        (this.gMc.Z += this.ActorComp.HalfHeight * SCALE_SIZE),
        this.CMc.DeepCopy(e),
        (this.fMc = i),
        (this.tu = 1),
        (this.mMc = 0),
        (t = this.gMc.Z - this.Asr.Z),
        (this.Fxc =
          0 <= t
            ? MathCommon_1.MathCommon.Clamp(t / s.MaxRiseHeightEdge, 0, 1)
            : MathCommon_1.MathCommon.Clamp(t / s.MaxFallHeightEdge, -1, 0)),
        (this.JumpHeight = t),
        (this.JumpDistance = Vector_1.Vector.Distance(this.gMc, this.Asr)),
        this.r01(t, Vector_1.Vector.Distance(this.gMc, this.Asr)))
      : this.pMc();
  }
  Teleport(t, e) {
    this.ActorComp &&
      (this.cz.DeepCopy(t),
      (this.cz.Z += this.ActorComp.HalfHeight * SCALE_SIZE),
      this.ActorComp.SetActorLocationAndRotation(
        this.cz.ToUeVector(),
        e.ToUeRotator(),
        "ChessTeleport",
        !1,
      ));
  }
  pMc() {
    (this.tu = 0),
      (this.mMc = 0),
      this.o01(),
      (this.JumpHeight = 0),
      (this.JumpDistance = 0),
      TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        this.fMc?.();
      }, STAND_DELAY_TIME);
  }
  IsPerformRecursion(t) {
    return (
      1 ===
      ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(t)
        ?.ActionTargetType
    );
  }
  Perform(t, e, i) {
    t =
      ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(t);
    if (t && this.ActorComp?.Valid) {
      var s = this.ActorComp.ActorLocationProxy;
      for (const h of t.EffectConfigList) {
        const o = Vector_1.Vector.Create();
        o.DeepCopy(s),
          1 === h.PerformLocationType && e && o.DeepCopy(e),
          o.AdditionEqual(h.LocationOffset);
        let t = void 0;
        0 === h.PerformLocationType && (t = h.AttachSocket);
        var r = h.DelayTime;
        r <= 0
          ? this.NQt(o, h.EffectPath, t)
          : TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
              this.NQt(o, h.EffectPath, t);
            }, r);
      }
      this.n01(t.ActionType),
        TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
          this.o01(),
            TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
              i();
            }, STAND_DELAY_TIME);
        }, t.Duration);
    } else i();
  }
  OnPreviousPerformStateChange(t, e, i) {
    i
      ? (i =
          ModelManager_1.ModelManager.DangoGlobalModel.Config?.GetPerformConfig(
            e,
          )) && this.n01(i.RecursionActionType)
      : this.o01();
  }
  r01(t, e) {
    this.rRe?.IsValid() && this.rRe.StartJumpWithParams(t, e);
  }
  n01(t) {
    this.rRe?.IsValid() && this.rRe.StartActionPerform(t);
  }
  o01() {
    this.rRe?.IsValid() && this.rRe.ReturnStand();
  }
  GetAttachSocketName() {
    return ModelManager_1.ModelManager.DangoGlobalModel.Config
      ?.AttachSocketName;
  }
  NQt(t, e, i) {
    var s = this.ActorComp?.SkeletalMesh;
    s?.IsValid() &&
      ((t = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        new UE.TransformDouble(
          Rotator_1.Rotator.ZeroRotator,
          t.ToUeVector(),
          Vector_1.Vector.OneVectorDouble,
        ),
        e,
        "[DangoPerformComponent.SpawnEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      )),
      FNameUtil_1.FNameUtil.IsNothing(i) ||
        EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(
          s,
          i,
          2,
          2,
          2,
          !1,
        ));
  }
};
(DangoPerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(280)],
  DangoPerformComponent,
)),
  (exports.DangoPerformComponent = DangoPerformComponent);
//# sourceMappingURL=DangoPerformComponent.js.map
