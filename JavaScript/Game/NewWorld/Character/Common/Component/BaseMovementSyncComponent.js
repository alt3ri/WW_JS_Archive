"use strict";
var BaseMovementSyncComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        h = arguments.length,
        r =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (o = t[a]) &&
            (r = (h < 3 ? o(r) : 3 < h ? o(e, i, r) : o(e, i)) || r);
      return 3 < h && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMovementSyncComponent = exports.ReplaySample = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../../../Core/Common/LogAnalyzer"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Deque_1 = require("../../../../../Core/Container/Deque"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  CombatDebugDrawController_1 = require("../../../../Utils/CombatDebugDrawController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  IS_WITH_EDITOR = cpp_1.FKuroUtilityForPuerts.IsWithEditor() ? 1 : void 0;
class RelativeMove {
  constructor() {
    (this.BaseMovementEntityId = 0),
      (this.RelativeLocation = void 0),
      (this.RelativeRotation = void 0);
  }
}
class ReplaySample {
  constructor(t, e, i) {
    (this.P5n = Vector_1.Vector.Create()),
      (this.g8n = Rotator_1.Rotator.Create()),
      (this.f8n = Vector_1.Vector.Create()),
      (this.PWn = Vector_1.Vector.Create()),
      (this.ControllerPitch = 0),
      (this.KVn = 0),
      (this.BWn = 0),
      (this.J8n = 0),
      (this.wWn = void 0),
      (this.bWn = 0),
      (this.qWn = 1),
      (this.GWn = 0),
      (this.OWn = 0);
    const s = t.P5n,
      o = t.g8n;
    var h = t.f8n,
      r = t.PWn,
      h =
        (this.P5n.Set(s.X, s.Y, s.Z),
        this.g8n.Set(o.Pitch, o.Yaw, o.Roll),
        h && this.f8n.Set(h.X, h.Y, h.Z),
        r && this.PWn.Set(r.X, r.Y, r.Z),
        (this.ControllerPitch = t.ControllerPitch),
        (this.KVn = t.KVn),
        (this.BWn = t.rSs),
        (this.qWn = t.qWn),
        (this.J8n = i),
        (this.bWn = e),
        (this.GWn = MathUtils_1.MathUtils.LongToNumber(t.GWn)),
        (this.OWn = t.NWn),
        t.kWn);
    if (h) {
      (this.wWn = new RelativeMove()),
        (this.wWn.BaseMovementEntityId = MathUtils_1.MathUtils.LongToNumber(
          h.FWn,
        ));
      const o = h.VWn,
        s = h.HWn;
      (this.wWn.RelativeRotation = Rotator_1.Rotator.Create(
        o.Pitch,
        o.Yaw,
        o.Roll,
      )),
        (this.wWn.RelativeLocation = Vector_1.Vector.Create(s.X, s.Y, s.Z));
    }
  }
}
exports.ReplaySample = ReplaySample;
let BaseMovementSyncComponent =
  (BaseMovementSyncComponent_1 = class BaseMovementSyncComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ActorComp = void 0),
        (this.TimeScaleComp = void 0),
        (this.MoveComp = void 0),
        (this.CreatureDataComp = void 0),
        (this.EnableMovementSyncInternal = !1),
        (this.CacheLocation = Vector_1.Vector.Create()),
        (this.CacheRotator = Rotator_1.Rotator.Create()),
        (this.CacheVelocity = Vector_1.Vector.Create()),
        (this.ControllerPlayerId = 0),
        (this.THr = 1),
        (this.TmpVector = Vector_1.Vector.Create()),
        (this.TmpVector2 = Vector_1.Vector.Create()),
        (this.LastHasBaseMovement = !1),
        (this.LastBasePlatform = void 0),
        (this.LastMoveAutonomousProxy = !1),
        (this.LastRelativeMove = !1),
        (this.LastMove = !1),
        (this.LastSendTime = 0),
        (this.LastReceiveControllerPlayerId = 0),
        (this.LastSendLocation = Vector_1.Vector.Create()),
        (this.LastSendRotation = Rotator_1.Rotator.Create()),
        (this.LastLocation = Vector_1.Vector.Create()),
        (this.LastRotation = Rotator_1.Rotator.Create()),
        (this.IsPending = !1),
        (this.PendingTime = 0),
        (this.PendingMoveInfos = []),
        (this.LastReceiveMoveSample = void 0),
        (this.LastApplyMoveSample = void 0),
        (this.LastMoveSample = void 0),
        (this.LastApplyMoveSampleUsed = !1),
        (this.NowLogicTickTime = 0),
        (this.LastLogicTickTime = 0),
        (this.LastApplyLogicTickTime = 0),
        (this.SSa = !1),
        (this.KHr = (t) => {
          var e;
          this.ActorComp.IsMoveAutonomousProxy ||
            this.Entity.GetComponent(190).HasTag(-648310348) ||
            ((this.IsPending = !1),
            (this.PendingMoveInfos.length = 0),
            this.TickReplaySamples(),
            this.LastMoveAutonomousProxy &&
              ((e = Vector_1.Vector.Dist(
                this.LastLocation,
                this.ActorComp.ActorLocationProxy,
              )),
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "MultiplayerCombat",
                  15,
                  "ChangeControl",
                  ["control", this.ActorComp.IsMoveAutonomousProxy],
                  ["diffDistance", e],
                ),
              this.ReportMoveDataDragDistance(e, !1)));
        }),
        (this.ForceAfterTickInternal = (t) => {
          var e;
          this.CustomAfterTick(t),
            this.EnableMovementSync && this.ActorComp.IsMoveAutonomousProxy
              ? (0 < this.LastApplyLogicTickTime &&
                  this.LastApplyLogicTickTime === this.NowLogicTickTime) ||
                ((this.LastApplyLogicTickTime = this.NowLogicTickTime),
                (this.ControllerPlayerId =
                  ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
                this.ClearReplaySamples(),
                (t = this.GetIsMoving()),
                (e = this.GetImportantMove(t)),
                ModelManager_1.ModelManager.GameModeModel.IsMulti
                  ? this.TryPushMoveMulti(
                      t,
                      e,
                      this.ActorComp.ActorLocationProxy,
                    )
                  : this.TryPushMoveSingle(
                      t,
                      this.ActorComp.ActorLocationProxy,
                      this.ActorComp.ActorRotationProxy,
                    ),
                this.RecordLastData(t))
              : this.RecordLastData();
        }),
        (this.ZHr = new Deque_1.Deque()),
        (this.TmpLocation = Vector_1.Vector.Create()),
        (this.TmpLocation2 = Vector_1.Vector.Create()),
        (this.TmpRotation = Rotator_1.Rotator.Create());
    }
    DefaultEnableMovementSync() {
      return !1;
    }
    get EnableMovementSync() {
      return this.EnableMovementSyncInternal;
    }
    set EnableMovementSync(t) {
      this.EnableMovementSyncInternal !== t &&
        ((this.EnableMovementSyncInternal = t), this.SSa) &&
        (t
          ? (CombatMessageController_1.CombatMessageController.RegisterPreTick(
              this,
              this.KHr,
            ),
            CombatMessageController_1.CombatMessageController.RegisterAfterTick(
              this,
              this.ForceAfterTickInternal,
            ))
          : (CombatMessageController_1.CombatMessageController.UnregisterPreTick(
              this,
            ),
            CombatMessageController_1.CombatMessageController.UnregisterAfterTick(
              this,
            )));
    }
    OnInit() {
      return (this.EnableMovementSync = this.DefaultEnableMovementSync()), !0;
    }
    OnStart() {
      return (
        (this.ActorComp = this.Entity.GetComponent(1)),
        (this.TimeScaleComp = this.Entity.GetComponent(165)),
        (this.MoveComp = this.Entity.GetComponent(38)),
        (this.CreatureDataComp = this.Entity.GetComponent(0)),
        ModelManager_1.ModelManager.CombatMessageModel.AddMoveSync(this) ||
          CombatLog_1.CombatLog.Warn("Move", this.Entity, "重复添加移动同步"),
        !0
      );
    }
    OnEnd() {
      return (
        ModelManager_1.ModelManager.CombatMessageModel.DeleteMoveSync(this) ||
          CombatLog_1.CombatLog.Warn("Move", this.Entity, "移除移动同步失败"),
        !(this.EnableMovementSync = !1)
      );
    }
    ApplyInput(t, e) {}
    OnActivate() {
      return (
        this.LastReceiveMoveSample &&
        Time_1.Time.NowSeconds >= this.LastReceiveMoveSample.J8n
          ? (this.ActorComp.SetActorLocationAndRotation(
              this.LastReceiveMoveSample.P5n.ToUeVector(),
              this.LastReceiveMoveSample.g8n.ToUeRotator(),
              "角色移动同步.处理出生位置刷新",
              !1,
            ),
            this.LastLocation.DeepCopy(this.LastReceiveMoveSample.P5n),
            this.LastRotation.DeepCopy(this.LastReceiveMoveSample.g8n))
          : (this.LastLocation.DeepCopy(
              this.ActorComp.Owner.K2_GetActorLocation(),
            ),
            this.LastRotation.DeepCopy(
              this.ActorComp.Owner.K2_GetActorRotation(),
            )),
        this.ActorComp.IsMoveAutonomousProxy && this.CollectSampleAndSend(),
        (this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy),
        this.EnableMovementSyncInternal &&
          (CombatMessageController_1.CombatMessageController.RegisterPreTick(
            this,
            this.KHr,
          ),
          CombatMessageController_1.CombatMessageController.RegisterAfterTick(
            this,
            this.ForceAfterTickInternal,
          )),
        (this.SSa = !0)
      );
    }
    GetCurrentMoveSample() {
      var t = Protocol_1.Aki.Protocol.Wks.create();
      return (
        (t.P5n = {
          X: this.ActorComp.ActorLocationProxy.X,
          Y: this.ActorComp.ActorLocationProxy.Y,
          Z: this.ActorComp.ActorLocationProxy.Z,
        }),
        (t.g8n = {
          Pitch: this.ActorComp.ActorRotationProxy.Pitch,
          Roll: this.ActorComp.ActorRotationProxy.Roll,
          Yaw: this.ActorComp.ActorRotationProxy.Yaw,
        }),
        (t.GWn = Time_1.Time.CombatServerTime),
        (t.J8n = Time_1.Time.NowSeconds),
        1 < this.Entity.GetTickInterval() &&
          0 < this.LastLogicTickTime &&
          0 < this.NowLogicTickTime &&
          (t.jWn = 1e3 * (this.NowLogicTickTime - this.LastLogicTickTime)),
        (t.NWn = Net_1.Net.RttMs),
        (t.qWn =
          this.Entity.TimeDilation *
          (this.TimeScaleComp?.CurrentTimeScale ?? 1)),
        (this.LastMoveSample = t),
        this.CompressData(t),
        t
      );
    }
    CompressData(t) {
      ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? Info_1.Info.IsBuildDevelopmentOrDebug && ((t.GWn = 0), (t.NWn = 0))
        : ((t.f8n = void 0),
          (t.KVn = 0),
          (t.rSs = 0),
          (t.kWn = void 0),
          (t.ControllerPitch = 0),
          (t.qWn = 0),
          (t.GWn = 0),
          (t.NWn = 0),
          (t.PWn = void 0),
          (t.jWn = 0));
    }
    RecordLastData(t = !1) {
      this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
        this.LastRotation.DeepCopy(this.ActorComp.ActorRotationProxy),
        (this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy),
        (this.LastMove = t);
    }
    OnTick(t) {
      (this.LastLogicTickTime = this.NowLogicTickTime),
        (this.NowLogicTickTime = Time_1.Time.NowSeconds);
    }
    CustomAfterTick(t) {}
    GetIsMoving() {
      return (
        !this.LastLocation.Equals(this.ActorComp.ActorLocationProxy) ||
        !this.LastRotation.Equals(this.ActorComp.ActorRotationProxy)
      );
    }
    GetImportantMove(t) {
      return !t && this.LastMove;
    }
    GetSecondaryImportantMove() {
      return !1;
    }
    TryPushMoveSingle(t, e, i) {
      var s,
        o =
          Time_1.Time.NowSeconds - this.LastSendTime >=
          BaseMovementSyncComponent_1.SingleModeSendInterval,
        i =
          !this.LastSendLocation.Equals(
            e,
            BaseMovementSyncComponent_1.SingleModeSendLocationTolerance,
          ) ||
          !this.LastSendRotation.Equals(
            i,
            BaseMovementSyncComponent_1.SingleModeSendRotationTolerance,
          ),
        e =
          Global_1.Global.BaseCharacter?.EntityId === this.Entity.Id &&
          !this.LastSendLocation.Equals(
            e,
            BaseMovementSyncComponent_1.SingleModeSendLocationToleranceMax,
          );
      !t && this.LastMove
        ? ((s = this.GetCurrentMoveSample()),
          this.PendingMoveInfos.push(s),
          (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !0))
        : ((t && i) || e) &&
          (o || e
            ? ((s = this.GetCurrentMoveSample()),
              this.PendingMoveInfos.push(s),
              (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove =
                !0))
            : this.GetSecondaryImportantMove() &&
              ((t = this.GetCurrentMoveSample()),
              this.PendingMoveInfos.push(t)));
    }
    TryPushMoveMulti(t, e, i) {
      this.LastMoveAutonomousProxy ||
        ((s = Vector_1.Vector.Dist(this.LastLocation, i)),
        this.ReportMoveDataDragDistance(s, !0),
        CombatLog_1.CombatLog.Info(
          "Move",
          this.Entity,
          "移动来源切换自身",
          ["上个控制者", this.ControllerPlayerId],
          [
            "当前控制者",
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          ],
          ["位移距离", s.toFixed()],
        ));
      var s = this.Entity.GetComponent(0);
      if (
        (CombatDebugDrawController_1.CombatDebugDrawController
          .DebugMonsterMovePath &&
          s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster &&
          UE.KismetSystemLibrary.DrawDebugLine(
            GlobalData_1.GlobalData.World,
            this.LastLocation.ToUeVector(),
            i.ToUeVector(),
            new UE.LinearColor(0, 1, 0, 1),
            15,
          ),
        ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode)
      )
        e ? this.CollectSampleAndSend(!0) : t && this.CollectSampleAndSendUdp();
      else {
        if (!this.IsPending) {
          if (!t) return;
          (this.IsPending = !0),
            (this.PendingTime = Time_1.Time.NowSeconds),
            (this.PendingMoveInfos.length = 0);
        }
        s = this.GetCurrentMoveSample();
        (new ReplaySample(
          s,
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          Time_1.Time.NowSeconds,
        ).J8n = Time_1.Time.NowSeconds),
          this.PendingMoveInfos.push(s),
          (Time_1.Time.NowSeconds >=
            this.PendingTime +
              BaseMovementSyncComponent_1.PendingMoveCacheTime ||
            !t) &&
            (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !0);
      }
    }
    CollectSampleAndSend(t = !1) {
      var e = this.GetCurrentMoveSample();
      this.PendingMoveInfos.push(e),
        t
          ? (((e = Protocol_1.Aki.Protocol.Yus.create()).qZa = ModelManager_1
              .ModelManager.GameModeModel.IsMulti
              ? ModelManager_1.ModelManager.OnlineModel.OwnerId
              : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
            e.WRs.push(this.CollectPendingMoveInfos()),
            Net_1.Net.Send(28450, e),
            Info_1.Info.IsBuildDevelopmentOrDebug &&
              ((t = {
                scene_id:
                  ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
                instance_id:
                  ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
                msg_id: 28450,
                immediately: !0,
                sub_count: e.WRs.length,
                is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
                ed: IS_WITH_EDITOR,
                br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
              }),
              (e = JSON.stringify(t)),
              CombatDebugController_1.CombatDebugController.DataReport(
                "COMBAT_MESSAGE_COUNT",
                e,
              )),
            (this.LastSendTime = Time_1.Time.NowSeconds))
          : (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !0);
    }
    CollectSampleAndSendUdp() {
      if (
        Time_1.Time.NowSeconds - this.LastSendTime <
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
        var t = Protocol_1.Aki.Protocol.zus.create();
        (t.qZa = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.OnlineModel.OwnerId
          : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          t.WRs.push(this.CollectPendingMoveInfos()),
          Net_1.Net.Send(17865, t),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((t = {
              scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              instance_id:
                ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              msg_id: 17865,
              immediately: !0,
              is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
              ed: IS_WITH_EDITOR,
              br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
            }),
            (t = JSON.stringify(t)),
            CombatDebugController_1.CombatDebugController.DataReport(
              "COMBAT_MESSAGE_COUNT",
              t,
            )),
          (this.LastSendTime = Time_1.Time.NowSeconds);
      }
    }
    CollectPendingMoveInfos() {
      let t = 0;
      for (const r of this.PendingMoveInfos) {
        if (
          Time_1.Time.NowSeconds <
          r.J8n + BaseMovementSyncComponent_1.MaxPendingMoveCacheTime
        )
          break;
        t++;
      }
      var e, i, s, o, h;
      if (
        (50 < this.PendingMoveInfos.length &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "移动包过多",
            ["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].J8n],
            ["NowSeconds", Time_1.Time.NowSeconds],
            ["TimeStamp", this.PendingMoveInfos[0].J8n],
            ["length", this.PendingMoveInfos.length],
          ),
        0 < t &&
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "MultiplayerCombat",
              15,
              "移动包过期",
              ["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].J8n],
              ["NowSeconds", Time_1.Time.NowSeconds],
              ["TimeStamp", this.PendingMoveInfos[0].J8n],
            ),
          this.PendingMoveInfos.splice(0, t)),
        0 !== this.PendingMoveInfos.length)
      )
        return (
          ((e = Protocol_1.Aki.Protocol.r4s.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(
              this.ActorComp.CreatureData.GetCreatureDataId(),
            )),
          (e.Y8n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          (e.iVn = this.PendingMoveInfos),
          (i = this.PendingMoveInfos[this.PendingMoveInfos.length - 1]),
          (this.LastSendLocation.X = i.P5n.X),
          (this.LastSendLocation.Y = i.P5n.Y),
          (this.LastSendLocation.Z = i.P5n.Z),
          (this.LastSendRotation.Roll = i.g8n.Roll),
          (this.LastSendRotation.Pitch = i.g8n.Pitch),
          (this.LastSendRotation.Yaw = i.g8n.Yaw),
          (this.IsPending = !1),
          (this.LastSendTime = Time_1.Time.NowSeconds),
          (this.PendingMoveInfos = []),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((i = Protocol_1.Aki.Protocol.r4s.encode(e).finish()),
            (h = this.CreatureDataComp?.GetPbDataId()),
            (s = this.CreatureDataComp?.GetEntityType()),
            (o = this.CreatureDataComp?.GetCreatureDataId()),
            0 < i.length) &&
            ((o = {
              scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              instance_id:
                ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              creature_id: o,
              pb_data_id: h,
              entity_type: s,
              msg_id: -1,
              length: i.length,
              is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
              is_send: !0,
              ed: IS_WITH_EDITOR,
              br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
            }),
            (h = JSON.stringify(o)),
            CombatDebugController_1.CombatDebugController.DataReport(
              "COMBAT_MESSAGE_INFO",
              h,
            )),
          e
        );
    }
    ReceiveMoveInfos(t, e, i) {
      if (0 === t.length)
        CombatLog_1.CombatLog.Warn(
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
          var o = i + s.TimelineOffset,
            h =
              (Time_1.Time.NowSeconds > o &&
                ((o = Time_1.Time.NowSeconds - o),
                CombatLog_1.CombatLog.Warn(
                  "Move",
                  this.Entity,
                  "移动缓冲不足",
                  ["missTime", o],
                  ["TimeStamp", i],
                ),
                this.ReportMoveDataBufferMissTime(1e3 * o)),
              MathUtils_1.MathUtils.LongToNumber(e));
          this.LastReceiveControllerPlayerId !== h &&
            CombatLog_1.CombatLog.Info(
              "Move",
              this.Entity,
              "移动协议包切换",
              ["上个控制者", this.LastReceiveControllerPlayerId],
              ["当前控制者", h],
              ["TimeStamp", i],
            );
          for (const a of t) {
            (!a.J8n || a.J8n <= 0) &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                15,
                "[BaseMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0",
                ["TimeStamp", a.J8n ?? void 0],
              );
            let t = 0 < a.jWn ? 0.001 * a.jWn : 0;
            0 < t &&
              ((t = MathUtils_1.MathUtils.Clamp(t, 0, this.THr)),
              CombatLog_1.CombatLog.Info("Move", this.Entity, "额外移动缓冲", [
                "extraOffset",
                t,
              ]));
            var r = new ReplaySample(a, h, a.J8n + s.TimelineOffset + t);
            this.AddReplaySample(r);
          }
          this.LastReceiveControllerPlayerId = h;
        } else
          CombatLog_1.CombatLog.Warn(
            "Move",
            this.Entity,
            "收移动包失败，缓冲器查询失败",
          );
      }
    }
    GetEnableMovementSync() {
      return this.EnableMovementSync;
    }
    SetEnableMovementSync(t, e = "") {
      CombatLog_1.CombatLog.Info(
        "Move",
        this.Entity,
        "SetEnableMovementSync",
        ["enable", t],
        ["reason", e],
      ),
        (this.EnableMovementSync = t);
    }
    AddReplaySample(t) {
      for (; !this.ZHr.Empty && this.ZHr.Rear.J8n > t.J8n; )
        this.ZHr.RemoveRear();
      this.ZHr.AddRear(t), (this.LastReceiveMoveSample = t);
    }
    ClearReplaySamples() {
      this.ZHr.Clear(), (this.LastApplyMoveSample = void 0);
    }
    CloneMoveSampleInfos(t) {
      this.ZHr.Clone(t.ZHr);
    }
    CalcRelativeMove(t, e, i, s, o, h) {
      return !1;
    }
    TickReplaySamples() {
      var t = Time_1.Time.NowSeconds;
      for (
        this.LastApplyMoveSample &&
        1 < t - this.LastApplyMoveSample.J8n &&
        (CombatLog_1.CombatLog.Info("Move", this.Entity, "不连贯的样条点丢弃", [
          "diff",
          t - this.LastApplyMoveSample.J8n,
        ]),
        (this.LastApplyMoveSample = void 0));
        !this.ZHr.Empty;

      ) {
        var e = this.LastApplyMoveSample,
          i = this.ZHr.Front;
        if (!(t >= i.J8n)) {
          if (!e) break;
          var s = MathUtils_1.MathUtils.RangeClamp(t, e.J8n, i.J8n, 0, 1),
            o = (0, puerts_1.$ref)(void 0),
            o =
              (this.CalcRelativeMove(
                e,
                i,
                s,
                this.CacheLocation,
                this.CacheRotator,
                o,
              )
                ? (this.LastRelativeMove, (this.LastRelativeMove = !0))
                : (Vector_1.Vector.Lerp(e.P5n, i.P5n, s, this.CacheLocation),
                  Rotator_1.Rotator.Lerp(e.g8n, i.g8n, s, this.CacheRotator),
                  this.LastRelativeMove,
                  (this.LastRelativeMove = !1)),
              Vector_1.Vector.Lerp(e.f8n, i.f8n, s, this.CacheVelocity),
              MathUtils_1.MathUtils.Lerp(
                MathCommon_1.MathCommon.WrapAngle(e.ControllerPitch),
                MathCommon_1.MathCommon.WrapAngle(i.ControllerPitch),
                s,
              ));
          this.ApplyMoveSample(
            e.KVn,
            this.CacheLocation,
            this.CacheRotator,
            e.f8n,
            e.PWn,
            i.bWn,
            e.BWn,
            o,
            e.qWn,
            e.GWn,
            e.OWn,
          ),
            (this.LastApplyMoveSampleUsed = !0);
          break;
        }
        (this.LastApplyMoveSample = i),
          (this.LastApplyMoveSampleUsed = !1),
          this.ZHr.RemoveFront();
      }
      this.ZHr.Empty &&
        !this.LastApplyMoveSampleUsed &&
        this.LastApplyMoveSample &&
        (this.ApplyMoveSample(
          this.LastApplyMoveSample.KVn,
          this.LastApplyMoveSample.P5n,
          this.LastApplyMoveSample.g8n,
          this.LastApplyMoveSample.f8n,
          this.LastApplyMoveSample.PWn,
          this.LastApplyMoveSample.bWn,
          this.LastApplyMoveSample.BWn,
          this.LastApplyMoveSample.ControllerPitch,
          this.LastApplyMoveSample.qWn,
          this.LastApplyMoveSample.GWn,
          this.LastApplyMoveSample.OWn,
        ),
        (this.LastApplyMoveSampleUsed = !0));
    }
    ApplyMoveSample(t, e, i, s, o, h, r, a, n, _, l) {
      (!this.LastMoveAutonomousProxy && this.ControllerPlayerId === h) ||
        ((m = Vector_1.Vector.Dist(this.LastLocation, this.CacheLocation)),
        CombatLog_1.CombatLog.Info(
          "Move",
          this.Entity,
          "移动来源切换",
          ["上个控制者", this.ControllerPlayerId],
          ["当前控制者", h],
          ["位移距离", m.toFixed()],
        ));
      var m = this.Entity.GetComponent(0);
      CombatDebugDrawController_1.CombatDebugDrawController
        .DebugMonsterMovePath &&
        m.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster &&
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          this.LastLocation.ToUeVector(),
          this.CacheLocation.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          15,
        ),
        (this.ControllerPlayerId = h),
        this.ActorComp.SetActorLocationAndRotation(
          e.ToUeVector(),
          i.ToUeRotator(),
          "角色移动同步.添加简单位移",
          !1,
        );
      let M = 0;
      this.LastReceiveMoveSample &&
        (M = 1e3 * (this.LastReceiveMoveSample.J8n - Time_1.Time.NowSeconds)),
        this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - _, M, l);
    }
    VectorToString(t) {
      return `[${t.X.toFixed()},${t.Y.toFixed()},${t.Z.toFixed()}]`;
    }
    MoveInfosToString(t) {
      var e = t[0],
        i = t[t.length - 1];
      return (
        `length:${t.length}, t:${e.J8n.toFixed(3)}-${i.J8n.toFixed(3)}, position:${this.VectorToString(e.P5n)}-${this.VectorToString(i.P5n)}, r:${e.g8n?.Yaw.toFixed()}-${i.g8n?.Yaw.toFixed()}, timeScale:` +
        i.qWn
      );
    }
    MoveInfoToString(t) {
      return (
        `t:${t.J8n.toFixed(3)}, position:${this.VectorToString(t.P5n)}, timeScale:` +
        t.qWn
      );
    }
    ReportMoveDataApplyInfo(t, e, i) {
      (i = {
        udp_mode:
          ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
        creature_id: this.CreatureDataComp.GetCreatureDataId(),
        pb_data_id: this.CreatureDataComp.GetPbDataId(),
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
        creature_id: this.CreatureDataComp.GetCreatureDataId(),
        pb_data_id: this.CreatureDataComp.GetPbDataId(),
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
        creature_id: this.CreatureDataComp.GetCreatureDataId(),
        pb_data_id: this.CreatureDataComp.GetPbDataId(),
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
        creature_id: this.CreatureDataComp.GetCreatureDataId(),
        pb_data_id: this.CreatureDataComp.GetPbDataId(),
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
(BaseMovementSyncComponent.PendingMoveCacheTime = 0.08),
  (BaseMovementSyncComponent.MaxPendingMoveCacheTime = 1),
  (BaseMovementSyncComponent.SingleModeSendInterval = 1),
  (BaseMovementSyncComponent.SingleModeSendLocationTolerance = 10),
  (BaseMovementSyncComponent.SingleModeSendRotationTolerance = 5),
  (BaseMovementSyncComponent.SingleModeSendLocationToleranceMax = 600),
  (BaseMovementSyncComponent = BaseMovementSyncComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(59)],
      BaseMovementSyncComponent,
    )),
  (exports.BaseMovementSyncComponent = BaseMovementSyncComponent);
//# sourceMappingURL=BaseMovementSyncComponent.js.map
