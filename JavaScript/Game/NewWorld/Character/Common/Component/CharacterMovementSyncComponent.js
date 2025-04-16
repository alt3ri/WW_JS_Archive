"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var h,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, i, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (h = t[a]) && (o = (r < 3 ? h(o) : 3 < r ? h(e, i, o) : h(e, i)) || o);
    return 3 < r && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMovementSyncComponent = void 0);
const Cpp = require("cpp"),
  puerts_1 = require("puerts"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  BasePlatform_1 = require("../../../Common/BasePlatform"),
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
      (this.uwl = void 0),
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
  CustomAfterTickInternal(t) {
    this.YHr(t);
    var e = this.uwl && 0 <= this.uwl.Seat;
    this.CacheBaseEntityHandle &&
      this.TransformFromRelativeMove(
        this.CacheBaseEntityHandle,
        this.CacheRelativeLocation,
        this.CacheRelativeRotator,
        this.CacheFinalLocation,
        this.CacheFinalRotator,
      ) &&
      !this.ActorComp?.IsMoveAutonomousProxy &&
      !e &&
      (this.ActorComp.SetActorLocationAndRotation(
        this.CacheFinalLocation.ToUeVector(),
        this.CacheFinalRotator.ToUeRotator(),
        "角色移动同步.添加简单位移(帧末修正相对位置)",
        !1,
      ),
      (this.LastRelativeMove = !0)),
      super.CustomAfterTickInternal(t);
  }
  TickReplaySamples() {
    (this.uwl && 0 <= this.uwl.Seat) || super.TickReplaySamples();
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
      ((this.Nce = this.Entity.GetComponent(61)),
      (this.MHr = this.Entity.GetComponent(35)),
      (this.rJo = this.Entity.GetComponent(99)),
      (this.uwl = this.Entity.GetComponent(226)),
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
        CombatLog_1.CombatLog.Warn(
          "Move",
          this.Entity,
          "移动坐标点为0",
          ["Component", !!this.isn],
          ["Actor", !!this.isn?.Actor],
          ["Location", t.P5n],
          ["LinearVelocity", t.f8n],
          ["Rotation", t.g8n],
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
      this.MoveComp?.BasePlatform
        ? (t.kWn = this.GetRelativeMoveSample(this.MoveComp.BasePlatform))
        : this.LastHasBaseMovement &&
          (this.LastBasePlatform
            ? (t.kWn = this.GetRelativeMoveSample(this.LastBasePlatform, !0))
            : (this.LastHasBaseMovement = !1)),
      (t.r5n = this.Kha),
      (this.Kha = 0),
      (this.LastMoveSample = t),
      this.CompressData(t),
      t
    );
  }
  GetRelativeMoveSample(t, e = !1) {
    var i, s, h;
    if (!e || !t.CheckLeave(this.$Hr.Location))
      return (
        (e = this.ActorComp.ActorRotation),
        (h = this.isn.ScaledHalfHeight),
        ((s = this.isn.Actor.D_K2_GetActorLocation()).Z -= h),
        (h = (0, puerts_1.$ref)(void 0)),
        (i = (0, puerts_1.$ref)(void 0)),
        t.TransformToRelativeSpace(s, e, h, i),
        (s = (0, puerts_1.$unref)(h)),
        (e = (0, puerts_1.$unref)(i)),
        ((h = Protocol_1.Aki.Protocol.kWn.create()).FWn =
          MathUtils_1.MathUtils.NumberToLong(t.EntityHandle.CreatureDataId)),
        (h.HWn = { X: s.X, Y: s.Y, Z: s.Z }),
        (h.VWn = { Pitch: e.Pitch, Roll: e.Roll, Yaw: e.Yaw }),
        h
      );
    (this.LastHasBaseMovement = !1), (this.LastBasePlatform = void 0);
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
  CalcRelativeMove(t, e, i, s, h) {
    if (!t.wWn || !e.wWn) return !1;
    let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      t.wWn.BaseMovementEntityId,
    );
    if (
      !(r =
        r ||
        ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
          t.wWn.BaseMovementEntityId,
        ))
    )
      return !1;
    var o = BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(r);
    if (!o) return !1;
    o.OnCharacterEnter(this.MoveComp.CharacterMovement),
      Vector_1.Vector.Lerp(
        t.wWn.RelativeLocation,
        e.wWn.RelativeLocation,
        i,
        s,
      ),
      Rotator_1.Rotator.Lerp(
        t.wWn.RelativeRotation,
        e.wWn.RelativeRotation,
        i,
        h,
      );
    (t = (0, puerts_1.$ref)(void 0)),
      (e = (0, puerts_1.$ref)(void 0)),
      o.TransformFromRelativeSpace(s.ToUeVector(), h.ToUeRotator(), t, e),
      s.DeepCopy((0, puerts_1.$unref)(t)),
      (i = this.isn.ScaledHalfHeight);
    return (s.Z += i), h.DeepCopy((0, puerts_1.$unref)(e)), !0;
  }
  CheckRelativeMove(e, i, s, h, r) {
    if (e.wWn && i.wWn) {
      let t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        e.wWn.BaseMovementEntityId,
      );
      if (
        (t =
          t ||
          ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
            e.wWn.BaseMovementEntityId,
          ))
      ) {
        var o =
          BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(t);
        if (o)
          return (
            o.OnCharacterEnter(this.MoveComp.CharacterMovement),
            Vector_1.Vector.Lerp(
              e.wWn.RelativeLocation,
              i.wWn.RelativeLocation,
              s,
              h,
            ),
            Rotator_1.Rotator.Lerp(
              e.wWn.RelativeRotation,
              i.wWn.RelativeRotation,
              s,
              r,
            ),
            t
          );
      }
    }
  }
  TransformFromRelativeMove(t, e, i, s, h) {
    t = BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(t);
    if (!t) return !1;
    t.OnCharacterEnter(this.MoveComp.CharacterMovement);
    var r = (0, puerts_1.$ref)(void 0),
      o = (0, puerts_1.$ref)(void 0),
      t =
        (t.TransformFromRelativeSpace(e.ToUeVector(), i.ToUeRotator(), r, o),
        s.DeepCopy((0, puerts_1.$unref)(r)),
        this.isn.ScaledHalfHeight);
    return (s.Z += t), h.DeepCopy((0, puerts_1.$unref)(o)), !0;
  }
  ApplyMoveSample(t, e, i, s, h, r, o, a, n, _, p) {
    super.ApplyMoveSample(t, e, i, s, h, r, o, a, n, _, p),
      this.MoveComp?.SetForceSpeed(s),
      (this.ControllerPlayerId = r),
      this.MHr?.SlideForward.DeepCopy(h),
      this.isn?.Actor.KuroSetMovementMode({
        Mode: t,
        Context: "[CharacterMovementSyncComponent.ApplyMoveSample]",
      }),
      this.ApplyInput(o, i),
      this.CacheFinalRotator.Reset(),
      (this.CacheFinalRotator.Pitch = a),
      this.isn.Actor.Controller?.SetControlRotation(
        this.CacheFinalRotator.ToUeRotator(),
      ),
      this.TimeScaleComp?.SetMoveSyncTimeScale(n);
    let u = 0;
    this.LastReceiveMoveSample &&
      (u = 1e3 * (this.LastReceiveMoveSample.J8n - Time_1.Time.NowSeconds)),
      this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - _, u, p);
  }
};
(CharacterMovementSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(67)],
  CharacterMovementSyncComponent,
)),
  (exports.CharacterMovementSyncComponent = CharacterMovementSyncComponent);
//# sourceMappingURL=CharacterMovementSyncComponent.js.map
