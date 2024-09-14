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
      for (var n = t.length - 1; 0 <= n; n--)
        (r = t[n]) && (o = (h < 3 ? r(o) : 3 < h ? r(e, i, o) : r(e, i)) || o);
    return 3 < h && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMovementSyncComponent = void 0);
const Cpp = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  TsBaseItem_1 = require("../../../SceneItem/BaseItem/TsBaseItem"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  BaseMovementSyncComponent_1 = require("./BaseMovementSyncComponent");
class FastMoveSample {
  constructor() {
    (this.Location = Vector_1.Vector.Create()),
      (this.Rotation = Rotator_1.Rotator.Create()),
      (this.LinearVelocity = Vector_1.Vector.Create()),
      (this.MovementMode = 0);
  }
  ClearObject() {
    return !0;
  }
}
class ReadOnlyFastMoveSample {
  constructor() {
    (this.Location = Vector_1.Vector.Create()),
      (this.Rotation = Rotator_1.Rotator.Create()),
      (this.LinearVelocity = Vector_1.Vector.Create()),
      (this.MovementMode = 0),
      (this.IsInit = !1);
  }
  ClearObject() {
    return (
      (this.IsInit = !1),
      (this.Location = Vector_1.Vector.Create()),
      (this.Rotation = Rotator_1.Rotator.Create()),
      (this.LinearVelocity = Vector_1.Vector.Create()),
      !0
    );
  }
}
let CharacterMovementSyncComponent = class CharacterMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {
  constructor() {
    super(...arguments),
      (this.LastMovementMode = 0),
      (this.LastTimeScale = 1),
      (this.yHr = 255),
      (this.IHr = 65535),
      (this.Nce = void 0),
      (this.MHr = void 0),
      (this.rJo = void 0),
      (this.QHr = new FastMoveSample()),
      (this.XHr = new ReadOnlyFastMoveSample()),
      (this.$Hr = this.XHr),
      (this.Kha = 0),
      (this.ene = (t, e) => {
        this.Kha = e;
      });
  }
  get isn() {
    return this.ActorComp;
  }
  DefaultEnableMovementSync() {
    return !0;
  }
  GetIsMoving() {
    var t = this.$Hr.MovementMode,
      e =
        this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    return (
      this.LastMovementMode !== t ||
      this.rJo?.DirectionState ===
        CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ||
      this.LastHasBaseMovement ||
      !this.$Hr.LinearVelocity.IsZero() ||
      !this.LastLocation.Equals(this.$Hr.Location) ||
      !this.LastRotation.Equals(this.$Hr.Rotation) ||
      this.LastTimeScale !== e
    );
  }
  GetImportantMove(t) {
    var e = this.$Hr.MovementMode,
      i =
        this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1),
      e =
        this.LastMovementMode !== e ||
        this.LastHasBaseMovement !== this.MoveComp.HasBaseMovement ||
        this.LastTimeScale !== i;
    return (e ||= !t && this.LastMove);
  }
  GetSecondaryImportantMove() {
    return 0 < this.Kha ?? this.LastMoveSample?.DWn !== this.rJo.MoveState;
  }
  CustomAfterTick(t) {
    this.YHr(t);
  }
  YHr(t) {
    this.isn?.IsActorMoveInfoCache
      ? (this.XHr.IsInit ||
          ((this.XHr.IsInit = !0),
          (this.XHr.Location = this.isn?.ActorLocationProxy),
          (this.XHr.Rotation = this.isn?.ActorRotationProxy),
          (this.XHr.LinearVelocity = this.isn?.ActorVelocityProxy)),
        (this.XHr.MovementMode = this.MoveComp.CharacterMovement.MovementMode),
        (this.$Hr = this.XHr))
      : (Cpp.FFastMoveReplaySample.UpdateFastMoveSampleBase(
          this.QHr,
          this.QHr.Location,
          this.QHr.Rotation,
          this.QHr.LinearVelocity,
          this.isn.Actor,
          this.MoveComp.CharacterMovement,
        ),
        (this.$Hr = this.QHr));
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.Nce = this.Entity.GetComponent(54)),
      (this.MHr = this.Entity.GetComponent(32)),
      (this.rJo = this.Entity.GetComponent(92)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSkillEnd,
        this.ene,
      ),
      !0)
    );
  }
  OnEnd() {
    return (
      !!super.OnEnd() &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSkillEnd,
        this.ene,
      ),
      !0)
    );
  }
  ApplyInput(t, e) {
    var i;
    this.Nce &&
      (t !== this.IHr
        ? ((i = t & this.yHr),
          this.tjr(t >> 8, this.TmpVector),
          this.tjr(i, this.TmpVector2),
          this.Nce.SetMoveVectorCache(this.TmpVector, this.TmpVector2),
          this.isn?.SetInputRotatorByNumber(0, (i / this.yHr) * 360, 0))
        : (this.Nce.ResetMoveVectorCache(), this.isn?.SetInputRotator(e)));
  }
  tjr(t, e) {
    t === this.yHr
      ? e.Reset()
      : ((t = MathUtils_1.MathUtils.RangeClamp(t, 0, this.yHr, 0, 2 * Math.PI)),
        (e.X = Math.cos(t)),
        (e.Y = Math.sin(t)));
  }
  GetCurrentMoveSample() {
    var t = Protocol_1.Aki.Protocol.Wks.create(),
      e =
        ((t.P5n = { X: 0, Y: 0, Z: 0 }),
        (t.f8n = { X: 0, Y: 0, Z: 0 }),
        (t.g8n = { Pitch: 0, Roll: 0, Yaw: 0 }),
        this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0),
      i = this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
    return (
      Cpp.FFastMoveReplaySample.UpdateFastMoveSampleInput(
        t,
        t.P5n,
        t.g8n,
        t.f8n,
        this.isn?.Actor,
        this.MoveComp.CharacterMovement,
        e,
        i,
        this.yHr,
        CameraController_1.CameraController.CameraRotator.Yaw,
      ),
      ModelManager_1.ModelManager.GameModeModel?.InstanceType ===
        Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance &&
        0 === t.P5n.X &&
        0 === t.P5n.Y &&
        0 === t.P5n.Z &&
        CombatLog_1.CombatLog.Error(
          "Move",
          this.Entity,
          "移动坐标点为0",
          ["Component", !this.isn],
          ["Actor", !this.isn?.Actor],
          ["Location", t.P5n],
          ["LinearVelocity", t.f8n],
          ["Rotation", t.g8n],
        ),
      0 === t.KVn &&
        CombatLog_1.CombatLog.Warn(
          "Move",
          this.Entity,
          "获取当前的MovementMode为0",
        ),
      (t.DWn = this.rJo?.MoveState ?? 0),
      (t.GWn = Time_1.Time.CombatServerTime),
      (t.J8n = Time_1.Time.NowSeconds),
      1 < this.Entity.GetTickInterval() &&
        0 < this.LastLogicTickTime &&
        0 < this.NowLogicTickTime &&
        (t.jWn = 1e3 * (this.NowLogicTickTime - this.LastLogicTickTime)),
      (t.NWn = Net_1.Net.RttMs),
      (t.qWn =
        this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1)),
      this.MHr &&
        ((e = this.MHr.SlideForward), (t.PWn = { X: e.X, Y: e.Y, Z: e.Z })),
      this.MoveComp?.HasBaseMovement && this.MoveComp?.BasePlatform
        ? (t.kWn = this.GetRelativeMoveSample(this.MoveComp.BasePlatform))
        : this.LastHasBaseMovement &&
          (this.LastBasePlatform?.IsValid()
            ? (t.kWn = this.GetRelativeMoveSample(this.LastBasePlatform, !0))
            : (this.LastHasBaseMovement = !1)),
      (t.r5n = this.Kha),
      (this.Kha = 0),
      (this.LastMoveSample = t),
      this.CompressData(t),
      t
    );
  }
  GetRelativeMoveSample(s, r = !1) {
    if (s?.IsValid()) {
      var h = s.RootComponent.AttachParent?.GetOwner();
      if (h?.IsValid()) {
        let t = !1;
        if (!(h instanceof TsBaseCharacter_1.default)) {
          if (!(h instanceof TsBaseItem_1.default)) return;
          t = !0;
        }
        let e = void 0,
          i = new UE.Transform();
        if (t) {
          var o = h,
            o = ActorUtils_1.ActorUtils.GetEntityByActor(o);
          if (!o?.Valid) return;
          (e = o.Entity.GetComponent(0).GetCreatureDataId()),
            (i = o.Entity.GetComponent(187).ActorTransform);
        } else {
          o = h;
          if (
            0 ===
            (e = o.GetEntityNoBlueprint()?.GetComponent(0)?.GetCreatureDataId())
          )
            return;
          i = o.Mesh.GetSocketTransform(s.RootComponent.AttachSocketName);
        }
        if (r) {
          (h = UE.KismetMathLibrary.TransformLocation(i, s.LeaveSphereCenter)),
            (o =
              (this.CacheLocation.DeepCopy(h),
              Vector_1.Vector.DistSquared(
                this.$Hr.Location,
                this.CacheLocation,
              )));
          if (o > s.LeaveSphereRadius * s.LeaveSphereRadius)
            return (
              (this.LastHasBaseMovement = !1),
              void (this.LastBasePlatform = void 0)
            );
        }
        (r = this.isn.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
          (h = this.isn.Actor.K2_GetActorLocation()),
          (o =
            ((h.Z -= r), UE.KismetMathLibrary.InverseTransformLocation(i, h))),
          (s = this.ActorComp.ActorRotation),
          (r = UE.KismetMathLibrary.InverseTransformRotation(i, s)),
          (h = Protocol_1.Aki.Protocol.kWn.create());
        return (
          (h.FWn = MathUtils_1.MathUtils.NumberToLong(e)),
          (h.HWn = { X: o.X, Y: o.Y, Z: o.Z }),
          (h.VWn = { Pitch: r.Pitch, Roll: r.Roll, Yaw: r.Yaw }),
          h
        );
      }
    }
  }
  RecordLastData(t = !1) {
    (this.LastMovementMode = this.$Hr.MovementMode),
      this.MoveComp?.HasBaseMovement &&
        this.MoveComp?.BasePlatform &&
        ((this.LastHasBaseMovement = this.MoveComp.HasBaseMovement),
        (this.LastBasePlatform = this.MoveComp.BasePlatform)),
      this.LastLocation.DeepCopy(this.$Hr.Location),
      this.LastRotation.DeepCopy(this.$Hr.Rotation),
      (this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy),
      (this.LastMove = t);
    t = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    this.LastTimeScale = t;
  }
  CalcRelativeMove(t, e, i, s, r, h) {
    if (((0, puerts_1.$set)(h, !1), !t.wWn || !e.wWn)) return !1;
    let o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      t.wWn.BaseMovementEntityId,
    );
    if (
      !(o =
        o ||
        ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
          t.wWn.BaseMovementEntityId,
        ))
    )
      return !1;
    let n = !1,
      a = void 0;
    if (o.Entity.GetComponent(187)) {
      n = !0;
      var c = o.Entity.GetComponent(187),
        u =
          ((0, puerts_1.$set)(h, c.IsMoveAutonomousProxy),
          c.GetInteractionMainActor());
      if (!(a = u.BasePlatform)?.IsValid()) return !1;
      this.TmpLocation.DeepCopy(a.K2_GetActorLocation()),
        this.TmpRotation.DeepCopy(a.K2_GetActorRotation()),
        this.MoveComp?.CharacterMovement.AddTickPrerequisiteComponent(
          c.GetPrimitiveComponent(),
        );
    } else {
      (u = o.Entity.GetComponent(3)), (c = u.Actor);
      if (
        ((0, puerts_1.$set)(h, u.IsMoveAutonomousProxy),
        !(a = c.BasePlatform)?.IsValid())
      )
        return !1;
      o.Entity.GetComponent(102)?.SetTakeOverTick(!0),
        this.TmpLocation.DeepCopy(a.K2_GetActorLocation()),
        this.TmpRotation.DeepCopy(a.K2_GetActorRotation()),
        this.MoveComp?.CharacterMovement.AddTickPrerequisiteComponent(c.Mesh);
    }
    Vector_1.Vector.Lerp(t.wWn.RelativeLocation, e.wWn.RelativeLocation, i, s),
      Rotator_1.Rotator.Lerp(
        t.wWn.RelativeRotation,
        e.wWn.RelativeRotation,
        i,
        r,
      );
    let _ = new UE.Transform();
    _ = n
      ? o.Entity.GetComponent(187).ActorTransform
      : o.Entity.GetComponent(3).Actor.Mesh.GetSocketTransform(
          a.RootComponent.AttachSocketName,
        );
    (h = UE.KismetMathLibrary.TransformLocation(_, s.ToUeVector())),
      s.DeepCopy(h),
      (u = this.isn.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
      (s.Z += u),
      (c = UE.KismetMathLibrary.TransformRotation(_, r.ToUeRotator()));
    return r.DeepCopy(c), !0;
  }
  ApplyMoveSample(t, e, i, s, r, h, o, n, a, c, u) {
    super.ApplyMoveSample(t, e, i, s, r, h, o, n, a, c, u),
      this.MoveComp?.SetForceSpeed(s),
      (this.ControllerPlayerId = h),
      this.MHr?.SlideForward.DeepCopy(r),
      this.MoveComp.CharacterMovement.SetMovementMode(t),
      this.ApplyInput(o, i),
      this.CacheRotator.Reset(),
      (this.CacheRotator.Pitch = n),
      this.isn.Actor.Controller?.SetControlRotation(
        this.CacheRotator.ToUeRotator(),
      ),
      this.TimeScaleComp?.SetMoveSyncTimeScale(a);
    let _ = 0;
    this.LastReceiveMoveSample &&
      (_ = 1e3 * (this.LastReceiveMoveSample.J8n - Time_1.Time.NowSeconds)),
      this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - c, _, u);
  }
};
(CharacterMovementSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(60)],
  CharacterMovementSyncComponent,
)),
  (exports.CharacterMovementSyncComponent = CharacterMovementSyncComponent);
//# sourceMappingURL=CharacterMovementSyncComponent.js.map
