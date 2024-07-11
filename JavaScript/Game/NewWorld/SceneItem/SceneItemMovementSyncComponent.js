"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, o);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (r = (h < 3 ? s(r) : 3 < h ? s(e, i, r) : s(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemMovementSyncComponent = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  CharacterMovementSyncComponent_1 = require("../Character/Common/Component/CharacterMovementSyncComponent");
class ReplaySample {
  constructor(t, e, i) {
    (this.Location = void 0),
      (this.Rotation = void 0),
      (this.LinearVelocity = void 0),
      (this.Time = -0),
      (this.ControllerPlayerId = 0),
      (this.Location = Vector_1.Vector.Create(t.$kn.X, t.$kn.Y, t.$kn.Z)),
      (this.Rotation = Rotator_1.Rotator.Create(
        t.D3n.Pitch,
        t.D3n.Yaw,
        t.D3n.Roll,
      )),
      (this.Time = i),
      (this.ControllerPlayerId = e);
  }
}
let SceneItemMovementSyncComponent = class SceneItemMovementSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.fjr = void 0),
      (this.Hte = void 0),
      (this.SIe = void 0),
      (this.Info = void 0),
      (this.Svn = void 0),
      (this.LastSyncLocation = void 0),
      (this.LastSyncRotation = void 0),
      (this.Evn = !1),
      (this.ojr = !1),
      (this.LastMove = !1),
      (this.rjr = 0),
      (this.LastSendTime = 0),
      (this.LastMoveSample = void 0),
      (this.yvn = []),
      (this.Xrr = Vector_1.Vector.Create()),
      (this.ijr = Rotator_1.Rotator.Create()),
      (this.ejr = Vector_1.Vector.Create()),
      (this.tjr = Rotator_1.Rotator.Create()),
      (this.KCe = Vector_1.Vector.Create()),
      (this.Fuo = Rotator_1.Rotator.Create()),
      (this.Uxr = void 0),
      (this.DisableTick = !1),
      (this.$9r = () => {
        if (this.fjr && this.Hte.IsMoveAutonomousProxy) {
          var t =
            !this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
            !this.ijr.Equals(this.Hte.ActorRotationProxy);
          if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
            if (!this.ojr) {
              if (!t) return void this.pjr(t);
              (this.ojr = !0),
                (this.rjr = Time_1.Time.NowSeconds),
                (this.yvn.length = 0);
            }
            const o = this.Ivn();
            this.yvn.push(o);
            var e = new ReplaySample(
              o,
              ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
              Time_1.Time.NowSeconds,
            );
            (e.Time = Time_1.Time.NowSeconds),
              (this.LastMoveSample = e),
              (Time_1.Time.NowSeconds >=
                this.rjr +
                  CharacterMovementSyncComponent_1
                    .CharacterMovementSyncComponent.PendingMoveCacheTime ||
                !t) &&
                this.SendPendingMoveInfos(t);
          } else {
            var e =
                Time_1.Time.NowSeconds - this.LastSendTime >=
                CharacterMovementSyncComponent_1.CharacterMovementSyncComponent
                  .SingleModeSendInterval,
              i =
                !this.ejr.Equals(
                  this.Hte.ActorLocationProxy,
                  CharacterMovementSyncComponent_1
                    .CharacterMovementSyncComponent
                    .SingleModeSendLocationTolerance,
                ) ||
                !this.tjr.Equals(
                  this.Hte.ActorRotationProxy,
                  CharacterMovementSyncComponent_1
                    .CharacterMovementSyncComponent
                    .SingleModeSendRotationTolerance,
                );
            if ((t && e && i) || (!t && this.LastMove)) {
              const o = this.Ivn();
              this.yvn.push(o), this.SendPendingMoveInfos(t);
            }
          }
          this.pjr(t);
        } else this.pjr();
      }),
      (this.cjr = () => {
        this.Tvn(),
          this.Hte.IsMoveAutonomousProxy ||
            (this.fjr && ((this.ojr = !1), (this.yvn.length = 0), this.Lvn()));
      }),
      (this.Dvn = []);
  }
  Ivn() {
    var t = Protocol_1.Aki.Protocol.hOs.create();
    return (
      (t.$kn = Protocol_1.Aki.Protocol.VBs.create()),
      (t.D3n = Protocol_1.Aki.Protocol.iws.create()),
      this.Rvn(this.Hte.ActorLocationProxy, t.$kn),
      this.X4r(this.Hte.ActorRotationProxy, t.D3n),
      (t.h4n = Time_1.Time.NowSeconds),
      t
    );
  }
  pjr(t = !1) {
    this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
      this.ijr.DeepCopy(this.Hte.ActorRotationProxy),
      (this.LastMove = t);
  }
  SendPendingMoveInfos(t = !1) {
    let e = 0;
    for (const o of this.yvn) {
      if (
        Time_1.Time.NowSeconds <
        o.h4n +
          CharacterMovementSyncComponent_1.CharacterMovementSyncComponent
            .MaxPendingMoveCacheTime
      )
        break;
      e++;
    }
    var i;
    0 < e && this.yvn.splice(0, e),
      0 < this.yvn.length &&
        (((i = Protocol_1.Aki.Protocol.els.create()).m4n = this.yvn),
        (i.r4n = CombatMessage_1.CombatNet.CreateCombatCommon(this.Entity)),
        Net_1.Net.Send(26540, i),
        (i = this.yvn[this.yvn.length - 1]),
        (this.ejr.X = i.$kn.X),
        (this.ejr.Y = i.$kn.Y),
        (this.ejr.Z = i.$kn.Z),
        (this.tjr.Roll = i.D3n.Roll),
        (this.tjr.Pitch = i.D3n.Pitch),
        (this.tjr.Yaw = i.D3n.Yaw)),
      t ? (this.rjr = Time_1.Time.NowSeconds) : (this.ojr = !1),
      (this.LastSendTime = Time_1.Time.NowSeconds),
      (this.yvn.length = 0);
  }
  OnForceAfterTick() {
    this.$9r();
  }
  ForceSendPendingMoveInfos() {
    var t =
        !this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
        !this.ijr.Equals(this.Hte.ActorRotationProxy),
      e = this.Ivn(),
      e =
        (this.yvn.push(e),
        new ReplaySample(
          e,
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          Time_1.Time.NowSeconds,
        ));
    (e.Time = Time_1.Time.NowSeconds),
      (this.LastMoveSample = e),
      this.SendPendingMoveInfos(t);
  }
  OnInit() {
    return (
      (this.fjr = !0),
      (this.LastSyncLocation = Vector_1.Vector.Create()),
      (this.LastSyncRotation = Rotator_1.Rotator.Create()),
      !0
    );
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(1)),
      (this.SIe = this.Entity.GetComponent(0)),
      (this.Info = Protocol_1.Aki.Protocol.hOs.create()),
      (this.Info.$kn = Protocol_1.Aki.Protocol.VBs.create()),
      (this.Info.D3n = Protocol_1.Aki.Protocol.iws.create()),
      (this.Info.A3n = Protocol_1.Aki.Protocol.VBs.create()),
      !0
    );
  }
  OnActivate() {
    this.LastMoveSample && Time_1.Time.NowSeconds > this.LastMoveSample.Time
      ? (this.Hte.SetActorLocationAndRotation(
          this.LastMoveSample.Location.ToUeVector(),
          this.LastMoveSample.Rotation.ToUeRotator(),
        ),
        this.Xrr.DeepCopy(this.LastMoveSample.Location),
        this.ijr.DeepCopy(this.LastMoveSample.Rotation))
      : (this.Xrr.DeepCopy(this.Hte.Owner.K2_GetActorLocation()),
        this.ijr.DeepCopy(this.Hte.Owner.K2_GetActorRotation())),
      this.Hte.SetAutonomous(
        this.SIe.GetPlayerId() ===
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      ),
      Info_1.Info.EnableForceTick ||
        this.DisableTick ||
        (ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        ),
        ComponentForceTickController_1.ComponentForceTickController.RegisterAfterTick(
          this,
          this.$9r,
        ));
  }
  OnForceTick(t) {
    this.cjr();
  }
  OnEnable() {
    !Info_1.Info.EnableForceTick &&
      this.Entity?.IsInit &&
      (ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
        this,
        this.cjr,
      ),
      ComponentForceTickController_1.ComponentForceTickController.RegisterAfterTick(
        this,
        this.$9r,
      ));
  }
  OnDisable(t) {
    Info_1.Info.EnableForceTick ||
      (ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
        this,
      ),
      ComponentForceTickController_1.ComponentForceTickController.UnregisterAfterTick(
        this,
      ));
  }
  OnEnd() {
    return (
      Info_1.Info.EnableForceTick ||
        (ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        ),
        ComponentForceTickController_1.ComponentForceTickController.UnregisterAfterTick(
          this,
        )),
      !0
    );
  }
  GetEnableMovementSync() {
    return this.fjr;
  }
  SetEnableMovementSync(t) {
    this.fjr = t;
    t = this.Ivn();
    this.yvn.push(t), this.SendPendingMoveInfos();
  }
  ReceiveServerItemMoveData(t) {
    this.syt(t.$kn, this.Hte.ActorLocation),
      this.Avn(t.D3n, this.Hte.ActorRotation),
      this.Evn && this.syt(t.A3n, this.Svn);
  }
  ReceiveServerItemMoveSample(t) {
    this.syt(t.$kn, this.Hte.ActorLocation),
      this.Avn(t.D3n, this.Hte.ActorRotation),
      this.Evn && this.syt(t.A3n, this.Svn);
  }
  Rvn(t, e) {
    (e.X = t.X), (e.Y = t.Y), (e.Z = t.Z);
  }
  syt(t, e) {
    (e.X = t.X), (e.Y = t.Y), (e.Z = t.Z);
  }
  X4r(t, e) {
    (e.Pitch = t.Pitch), (e.Yaw = t.Yaw), (e.Roll = t.Roll);
  }
  Avn(t, e) {
    (e.Pitch = t.Pitch), (e.Yaw = t.Yaw), (e.Roll = t.Roll);
  }
  AddReplaySample(t) {
    this.Dvn.push(t);
  }
  ClearReplaySamples() {
    this.Dvn.length = 0;
    var t = this.Ivn(),
      t = new ReplaySample(
        t,
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        Time_1.Time.NowSeconds,
      );
    (t.Time = Time_1.Time.NowSeconds), this.AddReplaySample(t);
  }
  Tvn() {
    var t = Time_1.Time.NowSeconds;
    let e = 0;
    for (const i of this.Dvn) {
      if (i.Time > t - 1) break;
      e++;
    }
    0 < e && this.Dvn.splice(0, e);
  }
  Lvn() {
    var e = Time_1.Time.NowSeconds;
    if (this.LastMoveSample && e >= this.LastMoveSample.Time)
      CombatDebugController_1.CombatDebugController.CombatDebugEx(
        "Move",
        this.Entity,
        "执行移动包",
        ["t", this.LastMoveSample.Time],
      ),
        this.Hte.SetActorLocationAndRotation(
          this.LastMoveSample.Location.ToUeVector(),
          this.LastMoveSample.Rotation.ToUeRotator(),
        );
    else
      for (let t = 0; t < this.Dvn.length - 1; t++) {
        var i,
          o = this.Dvn[t],
          s = this.Dvn[t + 1];
        e >= o.Time &&
          e <= s.Time &&
          ((i =
            (i = s.Time - o.Time) > MathUtils_1.MathUtils.KindaSmallNumber
              ? MathUtils_1.MathUtils.Clamp((e - o.Time) / i, 0, 1)
              : 1),
          Vector_1.Vector.Lerp(o.Location, s.Location, i, this.KCe),
          Rotator_1.Rotator.Lerp(o.Rotation, s.Rotation, i, this.Fuo),
          this.Hte.SetActorLocationAndRotation(
            this.KCe.ToUeVector(),
            this.Fuo.ToUeRotator(),
          ));
      }
  }
  ReceiveMoveInfos(t, e) {
    if (0 !== t.length) {
      var i =
        ModelManager_1.ModelManager.CombatMessageModel.GetMessageBufferByEntityId(
          this.Entity.Id,
        );
      if (i) {
        Time_1.Time.NowSeconds > t[0].h4n + i.TimelineOffset &&
          ((o = Time_1.Time.NowSeconds - t[0].h4n - i.TimelineOffset),
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Move",
            this.Entity,
            "移动缓冲不足",
            ["missTime", o],
            ["combatCommon", e.h4n],
          ));
        var o,
          s = MathUtils_1.MathUtils.LongToNumber(e.a4n);
        for (const r of t) {
          r.h4n <= 0 &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              15,
              "[SceneItemMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0",
              ["TimeStamp", r.h4n],
            );
          var h = new ReplaySample(r, s, r.h4n + i.TimelineOffset);
          this.AddReplaySample(h), (this.LastMoveSample = h);
        }
      }
    }
  }
  TryEnable() {
    void 0 !== this.Uxr &&
      (this.Enable(this.Uxr, "SceneItemMovementSyncComponent.TryEnable"),
      (this.Uxr = void 0),
      (this.DisableTick = !1));
  }
  TryDisable(t) {
    void 0 === this.Uxr &&
      ((this.Uxr = this.Disable(t)),
      (this.DisableTick = !0),
      this.Hte &&
      !this.Hte?.IsMoveAutonomousProxy &&
      this.fjr &&
      this.LastMoveSample
        ? this.Hte.SetActorLocationAndRotation(
            this.LastMoveSample.Location.ToUeVector(),
            this.LastMoveSample.Rotation.ToUeRotator(),
          )
        : this.Hte &&
          this.Hte?.IsMoveAutonomousProxy &&
          this.fjr &&
          this.ForceSendPendingMoveInfos());
  }
};
(SceneItemMovementSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(142)],
  SceneItemMovementSyncComponent,
)),
  (exports.SceneItemMovementSyncComponent = SceneItemMovementSyncComponent);
//# sourceMappingURL=SceneItemMovementSyncComponent.js.map
