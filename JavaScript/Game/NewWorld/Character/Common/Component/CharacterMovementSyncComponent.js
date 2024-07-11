"use strict";
var CharacterMovementSyncComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        o = arguments.length,
        r =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (r = (o < 3 ? h(r) : 3 < o ? h(e, i, r) : h(e, i)) || r);
      return 3 < o && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMovementSyncComponent = void 0);
const Cpp = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Deque_1 = require("../../../../../Core/Container/Deque"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../../../GlobalData"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  CombatDebugDrawController_1 = require("../../../../Utils/CombatDebugDrawController"),
  TsBaseItem_1 = require("../../../SceneItem/BaseItem/TsBaseItem"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
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
class RelativeMove {
  constructor() {
    (this.BaseMovementEntityId = 0),
      (this.RelativeLocation = void 0),
      (this.RelativeRotation = void 0);
  }
}
class ReplaySample {
  constructor(t, e, i) {
    (this.$kn = Vector_1.Vector.Create()),
      (this.D3n = Rotator_1.Rotator.Create()),
      (this.A3n = Vector_1.Vector.Create()),
      (this.K9n = Vector_1.Vector.Create()),
      (this.ControllerPitch = 0),
      (this.r5n = 0),
      (this.Q9n = 0),
      (this.h4n = 0),
      (this.$9n = void 0),
      (this.X9n = 0),
      (this.Y9n = 1),
      (this.J9n = 0),
      (this.z9n = 0);
    const s = t.$kn,
      h = t.D3n;
    var o = t.A3n,
      r = t.K9n,
      o =
        (this.$kn.Set(s.X, s.Y, s.Z),
        this.D3n.Set(h.Pitch, h.Yaw, h.Roll),
        this.A3n.Set(o.X, o.Y, o.Z),
        r && this.K9n.Set(r.X, r.Y, r.Z),
        (this.ControllerPitch = t.ControllerPitch),
        (this.r5n = t.r5n),
        (this.Q9n = t.xgs),
        (this.Y9n = t.Y9n),
        (this.h4n = i),
        (this.X9n = e),
        (this.J9n = MathUtils_1.MathUtils.LongToNumber(t.J9n)),
        (this.z9n = t.Z9n),
        t.e7n);
    if (o) {
      (this.$9n = new RelativeMove()),
        (this.$9n.BaseMovementEntityId = MathUtils_1.MathUtils.LongToNumber(
          o.t7n,
        ));
      const h = o.i7n,
        s = o.r7n;
      (this.$9n.RelativeRotation = Rotator_1.Rotator.Create(
        h.Pitch,
        h.Yaw,
        h.Roll,
      )),
        (this.$9n.RelativeLocation = Vector_1.Vector.Create(s.X, s.Y, s.Z));
    }
  }
}
let CharacterMovementSyncComponent =
  (CharacterMovementSyncComponent_1 = class CharacterMovementSyncComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.OHr = void 0),
        (this.Gce = void 0),
        (this.Nce = void 0),
        (this.aYo = void 0),
        (this.cBe = void 0),
        (this.SIe = void 0),
        (this.kHr = void 0),
        (this.FHr = !1),
        (this.CacheLocation = Vector_1.Vector.Create()),
        (this.Fuo = Rotator_1.Rotator.Create()),
        (this.VHr = Vector_1.Vector.Create()),
        (this.ControllerPlayerId = 0),
        (this.HHr = 255),
        (this.jHr = 65535),
        (this.WHr = 1),
        (this.KHr = 0),
        (this.QHr = 1),
        (this.XHr = !1),
        (this.$Hr = void 0),
        (this.YHr = !1),
        (this.JHr = !1),
        (this.zHr = !1),
        (this.VVt = 0),
        (this.ZHr = 0),
        (this.ejr = Vector_1.Vector.Create()),
        (this.tjr = Rotator_1.Rotator.Create()),
        (this.LastLocation = Vector_1.Vector.Create()),
        (this.ijr = Rotator_1.Rotator.Create()),
        (this.ojr = !1),
        (this.rjr = 0),
        (this.PendingMoveInfos = []),
        (this.njr = void 0),
        (this.sjr = void 0),
        (this.ajr = void 0),
        (this.hjr = !1),
        (this.ljr = 0),
        (this._jr = 0),
        (this.ujr = 0),
        (this.cjr = (t) => {
          var e;
          this.Hte.IsMoveAutonomousProxy ||
            this.Entity.GetComponent(185).HasTag(-648310348) ||
            ((this.ojr = !1),
            (this.PendingMoveInfos.length = 0),
            this.TickReplaySamples(),
            this.YHr &&
              ((e = Vector_1.Vector.Dist(
                this.LastLocation,
                this.Hte.ActorLocationProxy,
              )),
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "MultiplayerCombat",
                  15,
                  "ChangeControl",
                  ["control", this.Hte.IsMoveAutonomousProxy],
                  ["diffDistance", e],
                ),
              this.ReportMoveDataDragDistance(e, !1)));
        }),
        (this.mjr = new FastMoveSample()),
        (this.djr = new ReadOnlyFastMoveSample()),
        (this.Cjr = this.djr),
        (this.$9r = (t) => {
          if ((this.gjr(t), this.fjr && this.Hte.IsMoveAutonomousProxy)) {
            if (!(0 < this.ujr && this.ujr === this.ljr)) {
              (this.ujr = this.ljr),
                (this.ControllerPlayerId =
                  ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
                this.ClearReplaySamples();
              var t = this.Cjr.MovementMode,
                e =
                  this.Entity.TimeDilation * (this.OHr?.CurrentTimeScale ?? 1),
                i =
                  this.KHr !== t ||
                  this.aYo?.DirectionState ===
                    CharacterUnifiedStateTypes_1.ECharDirectionState
                      .AimDirection ||
                  this.XHr ||
                  !this.Cjr.LinearVelocity.IsZero() ||
                  !this.LastLocation.Equals(this.Cjr.Location) ||
                  !this.ijr.Equals(this.Cjr.Rotation) ||
                  this.QHr !== e,
                t =
                  this.KHr !== t ||
                  this.XHr !== this.Gce.HasBaseMovement ||
                  this.QHr !== e;
              if (
                ((t ||= !i && this.zHr),
                (this.QHr = e),
                ModelManager_1.ModelManager.GameModeModel.IsMulti)
              ) {
                this.YHr ||
                  ((e = Vector_1.Vector.Dist(
                    this.LastLocation,
                    this.Cjr.Location,
                  )),
                  this.ReportMoveDataDragDistance(e, !0),
                  CombatDebugController_1.CombatDebugController.CombatInfo(
                    "Move",
                    this.Entity,
                    "移动来源切换自身",
                    ["上个控制者", this.ControllerPlayerId],
                    [
                      "当前控制者",
                      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
                    ],
                    ["位移距离", e.toFixed()],
                  ));
                e = this.Entity.GetComponent(0);
                if (
                  (CombatDebugDrawController_1.CombatDebugDrawController
                    .DebugMonsterMovePath &&
                    e.GetEntityType() ===
                      Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
                    UE.KismetSystemLibrary.DrawDebugLine(
                      GlobalData_1.GlobalData.World,
                      this.LastLocation.ToUeVector(),
                      this.Cjr.Location.ToUeVector(),
                      new UE.LinearColor(0, 1, 0, 1),
                      15,
                    ),
                  ModelManager_1.ModelManager.CombatMessageModel
                    .MoveSyncUdpMode)
                )
                  t
                    ? this.CollectSampleAndSend(!0)
                    : i && this.CollectSampleAndSendUdp();
                else {
                  if (!this.ojr) {
                    if (!i) return void this.pjr(i);
                    (this.ojr = !0),
                      (this.rjr = Time_1.Time.NowSeconds),
                      (this.PendingMoveInfos.length = 0);
                  }
                  const h = this.GetCurrentMoveSample();
                  (new ReplaySample(
                    h,
                    ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
                    Time_1.Time.NowSeconds,
                  ).h4n = Time_1.Time.NowSeconds),
                    this.PendingMoveInfos.push(h),
                    (Time_1.Time.NowSeconds >=
                      this.rjr +
                        CharacterMovementSyncComponent_1.PendingMoveCacheTime ||
                      !i) &&
                      (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
                        !0);
                }
              } else {
                var e =
                    Time_1.Time.NowSeconds - this.VVt >=
                    CharacterMovementSyncComponent_1.SingleModeSendInterval,
                  t =
                    !this.ejr.Equals(
                      this.Cjr.Location,
                      CharacterMovementSyncComponent_1.SingleModeSendLocationTolerance,
                    ) ||
                    !this.tjr.Equals(
                      this.Cjr.Rotation,
                      CharacterMovementSyncComponent_1.SingleModeSendRotationTolerance,
                    ),
                  s = this.cBe?.CurrentSkill?.SkillId ?? 0,
                  s = this.ajr && s !== this.ajr.vkn;
                if (!i && this.zHr) {
                  const h = this.GetCurrentMoveSample();
                  this.PendingMoveInfos.push(h),
                    (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
                      !0);
                } else if (i && t)
                  if (e) {
                    const h = this.GetCurrentMoveSample();
                    this.PendingMoveInfos.push(h),
                      (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
                        !0);
                  } else if (s || this.ajr?.F9n !== this.aYo.MoveState) {
                    const h = this.GetCurrentMoveSample();
                    this.PendingMoveInfos.push(h);
                  }
              }
              this.pjr(i);
            }
          } else this.pjr();
        }),
        (this.vjr = new Deque_1.Deque()),
        (this.TmpLocation = Vector_1.Vector.Create()),
        (this.TmpLocation2 = Vector_1.Vector.Create()),
        (this.TmpRotation = Rotator_1.Rotator.Create());
    }
    static get Dependencies() {
      return [3];
    }
    get fjr() {
      return this.FHr;
    }
    set fjr(t) {
      this.FHr !== t &&
        (t
          ? (CombatMessageController_1.CombatMessageController.RegisterPreTick(
              this,
              this.cjr,
            ),
            CombatMessageController_1.CombatMessageController.RegisterAfterTick(
              this,
              this.$9r,
            ))
          : (CombatMessageController_1.CombatMessageController.UnregisterPreTick(
              this,
            ),
            CombatMessageController_1.CombatMessageController.UnregisterAfterTick(
              this,
            )),
        (this.FHr = t));
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.OHr = this.Entity.GetComponent(162)),
        (this.Gce = this.Entity.GetComponent(36)),
        (this.Nce = this.Entity.GetComponent(52)),
        (this.aYo = this.Entity.GetComponent(89)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.SIe = this.Entity.GetComponent(0)),
        (this.kHr = this.Entity.GetComponent(32)),
        (this.fjr = !0),
        ModelManager_1.ModelManager.CombatMessageModel.AddMoveSync(this) ||
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Move",
            this.Entity,
            "重复添加移动同步",
          ),
        !0
      );
    }
    OnEnd() {
      return (
        ModelManager_1.ModelManager.CombatMessageModel.DeleteMoveSync(this) ||
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Move",
            this.Entity,
            "移除移动同步失败",
          ),
        !(this.fjr = !1)
      );
    }
    Mjr(t, e) {
      var i, s;
      this.Nce &&
        (t !== this.jHr
          ? ((i = t & this.HHr),
            (t = this.Sjr(t >> 8)),
            (s = this.Sjr(i)),
            this.Nce.SetMoveVectorCache(t, s),
            this.Hte.SetInputRotatorByNumber(0, (i / this.HHr) * 360, 0))
          : (this.Nce.SetMoveVectorCache(
              Vector2D_1.Vector2D.ZeroVector,
              Vector2D_1.Vector2D.ZeroVector,
            ),
            this.Hte.SetInputRotator(e)));
    }
    Sjr(t) {
      var e;
      return t === this.HHr
        ? Vector2D_1.Vector2D.ZeroVector
        : ((t = MathUtils_1.MathUtils.RangeClamp(
            t,
            0,
            this.HHr,
            0,
            2 * Math.PI,
          )),
          ((e = new UE.Vector2D()).X = Math.cos(t)),
          (e.Y = Math.sin(t)),
          e);
    }
    OnActivate() {
      return (
        this.njr && Time_1.Time.NowSeconds >= this.njr.h4n
          ? (this.Hte.SetActorLocationAndRotation(
              this.njr.$kn.ToUeVector(),
              this.njr.D3n.ToUeRotator(),
              "角色移动同步.处理出生位置刷新",
              !1,
            ),
            this.LastLocation.DeepCopy(this.njr.$kn),
            this.ijr.DeepCopy(this.njr.D3n))
          : (this.LastLocation.DeepCopy(this.Hte.Actor.K2_GetActorLocation()),
            this.ijr.DeepCopy(this.Hte.Actor.K2_GetActorRotation())),
        this.Hte.IsMoveAutonomousProxy && this.CollectSampleAndSend(),
        (this.YHr = this.Hte.IsMoveAutonomousProxy),
        !0
      );
    }
    GetCurrentMoveSample() {
      var t = Protocol_1.Aki.Protocol.JBs.create(),
        e =
          ((t.$kn = { X: 0, Y: 0, Z: 0 }),
          (t.A3n = { X: 0, Y: 0, Z: 0 }),
          (t.D3n = { Pitch: 0, Roll: 0, Yaw: 0 }),
          this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0),
        i = this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
      return (
        Cpp.FFastMoveReplaySample.UpdateFastMoveSampleInput(
          t,
          t.$kn,
          t.D3n,
          t.A3n,
          this.Hte.Actor,
          this.Gce.CharacterMovement,
          e,
          i,
          this.HHr,
          CameraController_1.CameraController.CameraRotator.Yaw,
        ),
        0 === t.r5n &&
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Move",
            this.Entity,
            "获取当前的MovementMode为0",
          ),
        (t.F9n = this.aYo?.MoveState ?? 0),
        (t.J9n = Time_1.Time.CombatServerTime),
        (t.h4n = Time_1.Time.NowSeconds),
        1 < this.Entity.GetTickInterval() &&
          0 < this._jr &&
          0 < this.ljr &&
          (t.o7n = 1e3 * (this.ljr - this._jr)),
        (t.Z9n = Net_1.Net.RttMs),
        (t.Y9n = this.Entity.TimeDilation * (this.OHr?.CurrentTimeScale ?? 1)),
        this.kHr &&
          ((e = this.kHr.SlideForward), (t.K9n = { X: e.X, Y: e.Y, Z: e.Z })),
        this.Gce?.HasBaseMovement && this.Gce?.BasePlatform
          ? (t.e7n = this.Ejr(this.Gce.BasePlatform))
          : this.XHr &&
            (this.$Hr?.IsValid()
              ? (t.e7n = this.Ejr(this.$Hr, !0))
              : (this.XHr = !1)),
        (t.vkn = this.cBe?.CurrentSkill?.SkillId ?? 0),
        (this.ajr = t)
      );
    }
    Ejr(s, h = !1) {
      if (s?.IsValid()) {
        var o = s.RootComponent.AttachParent?.GetOwner();
        if (o?.IsValid()) {
          let t = !1;
          if (!(o instanceof TsBaseCharacter_1.default)) {
            if (!(o instanceof TsBaseItem_1.default)) return;
            t = !0;
          }
          let e = void 0,
            i = new UE.Transform();
          if (t) {
            var r = o,
              r = ActorUtils_1.ActorUtils.GetEntityByActor(r);
            if (!r?.Valid) return;
            (e = r.Entity.GetComponent(0).GetCreatureDataId()),
              (i = r.Entity.GetComponent(182).ActorTransform);
          } else {
            r = o;
            if (
              0 ===
              (e = r
                .GetEntityNoBlueprint()
                ?.GetComponent(0)
                ?.GetCreatureDataId())
            )
              return;
            i = r.Mesh.GetSocketTransform(s.RootComponent.AttachSocketName);
          }
          if (h) {
            (o = UE.KismetMathLibrary.TransformLocation(
              i,
              s.LeaveSphereCenter,
            )),
              (r =
                (this.CacheLocation.DeepCopy(o),
                Vector_1.Vector.DistSquared(
                  this.Cjr.Location,
                  this.CacheLocation,
                )));
            if (r > s.LeaveSphereRadius * s.LeaveSphereRadius)
              return (this.XHr = !1), void (this.$Hr = void 0);
          }
          (h = this.Hte.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
            (o = this.Hte.Actor.K2_GetActorLocation()),
            (r =
              ((o.Z -= h),
              UE.KismetMathLibrary.InverseTransformLocation(i, o))),
            (s = this.Hte.Actor.K2_GetActorRotation()),
            (h = UE.KismetMathLibrary.InverseTransformRotation(i, s)),
            (o = Protocol_1.Aki.Protocol.e7n.create());
          return (
            (o.t7n = MathUtils_1.MathUtils.NumberToLong(e)),
            (o.r7n = { X: r.X, Y: r.Y, Z: r.Z }),
            (o.i7n = { Pitch: h.Pitch, Roll: h.Roll, Yaw: h.Yaw }),
            o
          );
        }
      }
    }
    pjr(t = !1) {
      (this.KHr = this.Cjr.MovementMode),
        this.Gce?.HasBaseMovement &&
          this.Gce?.BasePlatform &&
          ((this.XHr = this.Gce.HasBaseMovement),
          (this.$Hr = this.Gce.BasePlatform)),
        this.LastLocation.DeepCopy(this.Cjr.Location),
        this.ijr.DeepCopy(this.Cjr.Rotation),
        (this.YHr = this.Hte.IsMoveAutonomousProxy),
        (this.zHr = t);
    }
    OnTick(t) {
      (this._jr = this.ljr), (this.ljr = Time_1.Time.NowSeconds);
    }
    gjr(t) {
      this.Hte?.IsActorMoveInfoCache
        ? (this.djr.IsInit ||
            ((this.djr.IsInit = !0),
            (this.djr.Location = this.Hte?.ActorLocationProxy),
            (this.djr.Rotation = this.Hte?.ActorRotationProxy),
            (this.djr.LinearVelocity = this.Hte?.ActorVelocityProxy)),
          (this.djr.MovementMode = this.Gce.CharacterMovement.MovementMode),
          (this.Cjr = this.djr))
        : (Cpp.FFastMoveReplaySample.UpdateFastMoveSampleBase(
            this.mjr,
            this.mjr.Location,
            this.mjr.Rotation,
            this.mjr.LinearVelocity,
            this.Hte.Actor,
            this.Gce.CharacterMovement,
          ),
          (this.Cjr = this.mjr));
    }
    CollectSampleAndSend(t = !1) {
      var e = this.GetCurrentMoveSample();
      this.PendingMoveInfos.push(e),
        t
          ? ((e = Protocol_1.Aki.Protocol.Xhs.create()).Mys.push(
              this.CollectPendingMoveInfos(),
            ),
            Net_1.Net.Send(29494, e),
            (this.VVt = Time_1.Time.NowSeconds))
          : (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !0);
    }
    CollectSampleAndSendUdp() {
      if (
        Time_1.Time.NowSeconds - this.VVt <
        ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpSendInterval
      ) {
        if (
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpFullSampling
        ) {
          const e = this.GetCurrentMoveSample();
          this.PendingMoveInfos.push(e);
        }
      } else {
        const e = this.GetCurrentMoveSample();
        this.PendingMoveInfos.push(e);
        var t = Protocol_1.Aki.Protocol.Jhs.create();
        t.Mys.push(this.CollectPendingMoveInfos()),
          Net_1.Net.Send(17208, t),
          (this.VVt = Time_1.Time.NowSeconds);
      }
    }
    CollectPendingMoveInfos() {
      let t = 0;
      for (const s of this.PendingMoveInfos) {
        if (
          Time_1.Time.NowSeconds <
          s.h4n + CharacterMovementSyncComponent_1.MaxPendingMoveCacheTime
        )
          break;
        t++;
      }
      var e, i;
      if (
        (0 < t &&
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "MultiplayerCombat",
              15,
              "移动包过期",
              ["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].h4n],
              ["NowSeconds", Time_1.Time.NowSeconds],
              ["TimeStamp", this.PendingMoveInfos[0].h4n],
            ),
          this.PendingMoveInfos.splice(0, t)),
        0 !== this.PendingMoveInfos.length)
      )
        return (
          ((e = Protocol_1.Aki.Protocol.aOs.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(
              this.Hte.CreatureData.GetCreatureDataId(),
            )),
          (e.a4n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          (e.m4n = this.PendingMoveInfos),
          CombatDebugController_1.CombatDebugController.CombatDebugEx(
            "Move",
            this.Entity,
            "发移动包" + this.MoveInfosToString(this.PendingMoveInfos),
          ),
          (i = this.PendingMoveInfos[this.PendingMoveInfos.length - 1]),
          (this.ejr.X = i.$kn.X),
          (this.ejr.Y = i.$kn.Y),
          (this.ejr.Z = i.$kn.Z),
          (this.tjr.Roll = i.D3n.Roll),
          (this.tjr.Pitch = i.D3n.Pitch),
          (this.tjr.Yaw = i.D3n.Yaw),
          (this.ojr = !1),
          (this.VVt = Time_1.Time.NowSeconds),
          (this.PendingMoveInfos = []),
          e
        );
    }
    ReceiveMoveInfos(t, e, i) {
      if (0 === t.length)
        CombatDebugController_1.CombatDebugController.CombatWarn(
          "Move",
          this.Entity,
          "收移动包失败，移动包长度为0",
        );
      else {
        var s =
          ModelManager_1.ModelManager.CombatMessageModel.GetMessageBufferByEntityId(
            this.Entity.Id,
          );
        if (s) {
          CombatDebugController_1.CombatDebugController.CombatDebugEx(
            "Move",
            this.Entity,
            "收移动包" + this.MoveInfosToString(t),
          );
          var h = i + s.TimelineOffset,
            o =
              (Time_1.Time.NowSeconds > h &&
                ((h = Time_1.Time.NowSeconds - h),
                CombatDebugController_1.CombatDebugController.CombatWarn(
                  "Move",
                  this.Entity,
                  "移动缓冲不足",
                  ["missTime", h],
                  ["TimeStamp", i],
                ),
                this.ReportMoveDataBufferMissTime(1e3 * h)),
              MathUtils_1.MathUtils.LongToNumber(e));
          this.ZHr !== o &&
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Move",
              this.Entity,
              "移动协议包切换",
              ["上个控制者", this.ZHr],
              ["当前控制者", o],
              ["TimeStamp", i],
            );
          for (const a of t) {
            (!a.h4n || a.h4n <= 0) &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                15,
                "[CharacterMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0",
                ["TimeStamp", a.h4n ?? void 0],
              );
            let t = 0 < a.o7n ? 0.001 * a.o7n : 0;
            0 < t &&
              ((t = MathUtils_1.MathUtils.Clamp(t, 0, this.WHr)),
              CombatDebugController_1.CombatDebugController.CombatInfo(
                "Move",
                this.Entity,
                "额外移动缓冲",
                ["extraOffset", t],
              ));
            var r = new ReplaySample(a, o, a.h4n + s.TimelineOffset + t);
            this.AddReplaySample(r);
          }
          this.ZHr = o;
        } else
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Move",
            this.Entity,
            "收移动包失败，缓冲器查询失败",
          );
      }
    }
    ReceiveServerMovementData(t, e = 0) {}
    GetEnableMovementSync() {
      return this.fjr;
    }
    SetEnableMovementSync(t) {
      this.fjr = t;
    }
    AddReplaySample(t) {
      for (
        0 === t.r5n &&
        CombatDebugController_1.CombatDebugController.CombatWarn(
          "Move",
          this.Entity,
          "收到移动包的MovementMode为0",
        );
        !this.vjr.Empty && this.vjr.Rear.h4n > t.h4n;

      )
        this.vjr.RemoveRear();
      this.vjr.AddRear(t), (this.njr = t);
    }
    ClearReplaySamples() {
      this.vjr.Clear(), (this.sjr = void 0);
    }
    CloneMoveSampleInfos(t) {
      this.vjr.Clone(t.vjr);
    }
    yjr(t, e, i, s, h, o) {
      if (((0, puerts_1.$set)(o, !1), !t.$9n || !e.$9n)) return !1;
      let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        t.$9n.BaseMovementEntityId,
      );
      if (
        !(r =
          r ||
          ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
            t.$9n.BaseMovementEntityId,
          ))
      )
        return !1;
      let a = !1,
        n = void 0;
      if (r.Entity.GetComponent(182)) {
        a = !0;
        var _ = r.Entity.GetComponent(182),
          l =
            ((0, puerts_1.$set)(o, _.IsMoveAutonomousProxy),
            _.GetInteractionMainActor());
        if (!(n = l.BasePlatform)?.IsValid()) return !1;
        this.TmpLocation.DeepCopy(n.K2_GetActorLocation()),
          this.TmpRotation.DeepCopy(n.K2_GetActorRotation()),
          this.Gce?.CharacterMovement.AddTickPrerequisiteComponent(
            _.GetPrimitiveComponent(),
          );
      } else {
        (l = r.Entity.GetComponent(3)), (_ = l.Actor);
        (0, puerts_1.$set)(o, l.IsMoveAutonomousProxy);
        const n = _.BasePlatform;
        if (!n?.IsValid()) return !1;
        r.Entity.GetComponent(99)?.SetTakeOverTick(!0),
          this.TmpLocation.DeepCopy(n.K2_GetActorLocation()),
          this.TmpRotation.DeepCopy(n.K2_GetActorRotation()),
          this.Gce?.CharacterMovement.AddTickPrerequisiteComponent(_.Mesh);
      }
      Vector_1.Vector.Lerp(
        t.$9n.RelativeLocation,
        e.$9n.RelativeLocation,
        i,
        s,
      ),
        Rotator_1.Rotator.Lerp(
          t.$9n.RelativeRotation,
          e.$9n.RelativeRotation,
          i,
          h,
        );
      let m = new UE.Transform();
      m = a
        ? r.Entity.GetComponent(182).ActorTransform
        : r.Entity.GetComponent(3).Actor.Mesh.GetSocketTransform(
            n.RootComponent.AttachSocketName,
          );
      (o = UE.KismetMathLibrary.TransformLocation(m, s.ToUeVector())),
        s.DeepCopy(o),
        (l = this.Hte.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
        (s.Z += l),
        (_ = UE.KismetMathLibrary.TransformRotation(m, h.ToUeRotator()));
      return h.DeepCopy(_), !0;
    }
    TickReplaySamples() {
      var t = Time_1.Time.NowSeconds;
      for (
        this.sjr &&
        1 < t - this.sjr.h4n &&
        (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Move",
          this.Entity,
          "不连贯的样条点丢弃",
          ["diff", t - this.sjr.h4n],
        ),
        (this.sjr = void 0));
        !this.vjr.Empty;

      ) {
        var e = this.sjr,
          i = this.vjr.Front;
        if (!(t >= i.h4n)) {
          if (!e) break;
          var s = MathUtils_1.MathUtils.RangeClamp(t, e.h4n, i.h4n, 0, 1),
            h = (0, puerts_1.$ref)(void 0),
            h =
              (this.yjr(e, i, s, this.CacheLocation, this.Fuo, h)
                ? (this.JHr, (this.JHr = !0))
                : (Vector_1.Vector.Lerp(e.$kn, i.$kn, s, this.CacheLocation),
                  Rotator_1.Rotator.Lerp(e.D3n, i.D3n, s, this.Fuo),
                  this.JHr,
                  (this.JHr = !1)),
              Vector_1.Vector.Lerp(e.A3n, i.A3n, s, this.VHr),
              CombatDebugController_1.CombatDebugController.CombatDebugEx(
                "Move",
                this.Entity,
                `执行移动包 {${this.MoveInfoToString(e)}} {${this.MoveInfoToString(i)}}`,
              ),
              MathUtils_1.MathUtils.Lerp(
                MathCommon_1.MathCommon.WrapAngle(e.ControllerPitch),
                MathCommon_1.MathCommon.WrapAngle(i.ControllerPitch),
                s,
              ));
          this.Ijr(
            e.r5n,
            this.CacheLocation,
            this.Fuo,
            e.A3n,
            e.K9n,
            i.X9n,
            e.Q9n,
            h,
            e.Y9n,
            e.J9n,
            e.z9n,
          ),
            (this.hjr = !0);
          break;
        }
        (this.sjr = i), (this.hjr = !1), this.vjr.RemoveFront();
      }
      this.vjr.Empty &&
        !this.hjr &&
        this.sjr &&
        (CombatDebugController_1.CombatDebugController.CombatDebugEx(
          "Move",
          this.Entity,
          "执行最后一个移动包" + this.MoveInfoToString(this.sjr),
        ),
        this.Ijr(
          this.sjr.r5n,
          this.sjr.$kn,
          this.sjr.D3n,
          this.sjr.A3n,
          this.sjr.K9n,
          this.sjr.X9n,
          this.sjr.Q9n,
          this.sjr.ControllerPitch,
          this.sjr.Y9n,
          this.sjr.J9n,
          this.sjr.z9n,
        ),
        (this.hjr = !0));
    }
    Ijr(t, e, i, s, h, o, r, a, n, _, l) {
      (!this.YHr && this.ControllerPlayerId === o) ||
        ((m = Vector_1.Vector.Dist(this.LastLocation, this.CacheLocation)),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Move",
          this.Entity,
          "移动来源切换",
          ["上个控制者", this.ControllerPlayerId],
          ["当前控制者", o],
          ["位移距离", m.toFixed()],
        ));
      var m = this.Entity.GetComponent(0);
      CombatDebugDrawController_1.CombatDebugDrawController
        .DebugMonsterMovePath &&
        m.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.LastLocation.ToUeVector(),
          this.CacheLocation.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          15,
        ),
        this.Gce?.SetForceSpeed(s),
        (this.ControllerPlayerId = o),
        this.Hte.SetActorLocationAndRotation(
          e.ToUeVector(),
          i.ToUeRotator(),
          "角色移动同步.添加简单位移",
          !1,
        ),
        this.kHr?.SlideForward.DeepCopy(h),
        this.Gce.CharacterMovement.SetMovementMode(t),
        this.Mjr(r, i),
        this.Fuo.Reset(),
        (this.Fuo.Pitch = a),
        this.Hte.Actor.Controller?.SetControlRotation(this.Fuo.ToUeRotator()),
        this.OHr?.SetMoveSyncTimeScale(n);
      let c = 0;
      this.njr && (c = 1e3 * (this.njr.h4n - Time_1.Time.NowSeconds)),
        this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - _, c, l);
    }
    VectorToString(t) {
      return `[${t.X.toFixed()},${t.Y.toFixed()},${t.Z.toFixed()}]`;
    }
    MoveInfosToString(t) {
      var e = t[0],
        i = t[t.length - 1];
      return (
        `length:${t.length}, t:${e.h4n.toFixed(3)}-${i.h4n.toFixed(3)}, position:${this.VectorToString(e.$kn)}-${this.VectorToString(i.$kn)}, r:${e.D3n?.Yaw.toFixed()}-${i.D3n?.Yaw.toFixed()}, timeScale:` +
        i.Y9n
      );
    }
    MoveInfoToString(t) {
      return (
        `t:${t.h4n.toFixed(3)}, position:${this.VectorToString(t.$kn)}, timeScale:` +
        t.Y9n
      );
    }
    ReportMoveDataApplyInfo(t, e, i) {
      (i = {
        udp_mode:
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
        creature_id: this.SIe.GetCreatureDataId(),
        pb_data_id: this.SIe.GetPbDataId(),
        rtt: Net_1.Net.RttMs,
        rtt_total: Net_1.Net.RttMs + i,
        delay: t,
        buffer_time: e,
      }),
        (t = JSON.stringify(i));
      CombatDebugController_1.CombatDebugController.DataReport(
        "MOVE_SYNC_INFO",
        t,
      );
    }
    ReportMoveDataDragDistance(t, e) {
      (e = {
        udp_mode:
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
        creature_id: this.SIe.GetCreatureDataId(),
        pb_data_id: this.SIe.GetPbDataId(),
        rtt: Net_1.Net.RttMs,
        to_self: e,
        distance: t,
      }),
        (t = JSON.stringify(e));
      CombatDebugController_1.CombatDebugController.DataReport(
        "MOVE_SYNC_DRAG_DISTANCE",
        t,
      );
    }
    ReportMoveDataBufferMissTime(t) {
      (t = {
        udp_mode:
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
        creature_id: this.SIe.GetCreatureDataId(),
        pb_data_id: this.SIe.GetPbDataId(),
        rtt: Net_1.Net.RttMs,
        miss_time: t,
      }),
        (t = JSON.stringify(t));
      CombatDebugController_1.CombatDebugController.DataReport(
        "MOVE_SYNC_BUFFER_MISS_TIME",
        t,
      );
    }
    ReportMoveDataInnerBufferMissTime(t) {
      (t = {
        udp_mode:
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
        creature_id: this.SIe.GetCreatureDataId(),
        pb_data_id: this.SIe.GetPbDataId(),
        rtt: Net_1.Net.RttMs,
        miss_time: t,
      }),
        (t = JSON.stringify(t));
      CombatDebugController_1.CombatDebugController.DataReport(
        "MOVE_SYNC_INNER_BUFFER_MISS_TIME",
        t,
      );
    }
  });
(CharacterMovementSyncComponent.PendingMoveCacheTime = 0.08),
  (CharacterMovementSyncComponent.MaxPendingMoveCacheTime = 1),
  (CharacterMovementSyncComponent.SingleModeSendInterval = 1),
  (CharacterMovementSyncComponent.SingleModeSendLocationTolerance = 10),
  (CharacterMovementSyncComponent.SingleModeSendRotationTolerance = 5),
  (CharacterMovementSyncComponent = CharacterMovementSyncComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(57)],
      CharacterMovementSyncComponent,
    )),
  (exports.CharacterMovementSyncComponent = CharacterMovementSyncComponent);
//# sourceMappingURL=CharacterMovementSyncComponent.js.map
