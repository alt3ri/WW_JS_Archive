"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RpcServer = exports.Stcp = void 0);
const MAX_MESSAGE_LENGTH = 1024;
var EPackage, EConnectStatus;
function packageToString(t) {
  switch (t.Type) {
    case EPackage.Connect:
      return "con " + t.ConnectId;
    case EPackage.ConnectAck:
      return "con ack " + t.ConnectId;
    case EPackage.Message:
      return `msg ack ${t.Ack} [${t.Msgs.map((t) => t.Seq + " " + JSON.stringify(t.Payload)).join(", ")}]`;
    default:
      return "unknown";
  }
}
!(function (t) {
  (t.Message = "M"), (t.Connect = "C"), (t.ConnectAck = "CA");
})((EPackage = EPackage || {})),
  (function (t) {
    (t[(t.Disconnected = 0)] = "Disconnected"),
      (t[(t.Connecting = 1)] = "Connecting"),
      (t[(t.Connected = 2)] = "Connected");
  })((EConnectStatus = EConnectStatus || {}));
class Stcp {
  constructor(t, e, s, i) {
    (this.Name = t),
      (this.sFn = e),
      (this.x5 = s),
      (this.IsServer = i),
      (this.S5 = []),
      (this.W3 = []),
      (this.E5 = 0),
      (this.R5 = 0),
      (this.I5 = 0),
      (this.N5 = 0),
      (this.L5 = !1),
      (this.w5 = EConnectStatus.Disconnected),
      (this.M5 = 0),
      (this.Verbose = !1),
      i || (this.M5 = Stcp.F5());
  }
  static F5() {
    return Stcp.P5++, Stcp.P5;
  }
  A5(t) {
    this.Verbose && this.x5.Log(t);
  }
  O5() {
    var t = { Type: EPackage.Message, Ack: this.R5, Msgs: [] };
    for (const e of this.S5)
      if ((t.Msgs.push(e), JSON.stringify(t).length >= MAX_MESSAGE_LENGTH)) {
        t.Msgs.pop();
        break;
      }
    return t;
  }
  D5() {
    var t;
    this.IsServer ||
      (0 !== this.S5.length &&
        ((t = { Type: EPackage.Connect, ConnectId: this.M5 }),
        this.sFn.Send(t),
        (this.w5 = EConnectStatus.Connecting)));
  }
  k5() {
    var t;
    this.IsServer ||
      ((t = { Type: EPackage.Connect, ConnectId: this.M5 }), this.sFn.Send(t));
  }
  b5() {
    var t;
    (0 === this.S5.length && !this.L5) ||
      ((t = this.O5()),
      this.sFn.Send(t),
      0 === this.S5.length && (this.L5 = !1),
      this.A5(this.Name + " send " + packageToString(t)));
  }
  q5() {
    switch (this.w5) {
      case EConnectStatus.Disconnected:
        this.D5();
        break;
      case EConnectStatus.Connecting:
        this.k5();
        break;
      case EConnectStatus.Connected:
        this.b5();
    }
  }
  SimDropPackage(t) {
    this.N5 = t;
  }
  Send(t) {
    if (this.S5.length >= Stcp.MaxSeqId)
      throw new Error("SendQueue.length >= Stcp.MaxSeqId");
    this.S5.push({ Seq: this.E5, Payload: t }), this.E5++, this.q5();
  }
  U5(t) {
    t = { Type: EPackage.ConnectAck, ConnectId: t };
    this.sFn.Send(t);
  }
  B5(t) {
    if (t.Type !== EPackage.Message)
      t.Type === EPackage.Connect
        ? this.IsServer
          ? t.ConnectId > this.M5
            ? this.G5(t)
            : t.ConnectId === this.M5 && this.U5(t.ConnectId)
          : this.x5.Error("client recv connect")
        : this.IsServer && this.x5.Error("sv recv connect ack");
    else {
      if ((0 < t.Msgs.length && (this.L5 = !0), t.Ack > this.I5))
        for (this.I5 = t.Ack; 0 < this.S5.length && this.S5[0].Seq < this.I5; )
          this.S5.shift();
      t.Msgs.forEach((t) => {
        t.Seq === this.R5 && (this.W3.push(t), this.R5++);
      });
    }
  }
  V5(t) {
    this.IsServer ||
      (t.Type === EPackage.ConnectAck && t.ConnectId === this.M5 && this.j5());
  }
  Reset() {
    this.IsServer ? this.x5.Error("sv can not reset") : this.H5();
  }
  H5() {
    (this.S5 = []),
      (this.W3 = []),
      (this.E5 = 0),
      (this.R5 = 0),
      (this.I5 = 0),
      (this.N5 = 0),
      (this.L5 = !1),
      (this.w5 = EConnectStatus.Disconnected),
      (this.M5 = Stcp.F5());
  }
  Q5() {
    (this.S5 = []),
      (this.W3 = []),
      (this.E5 = 0),
      (this.R5 = 0),
      (this.I5 = 0),
      (this.N5 = 0),
      (this.L5 = !1),
      (this.w5 = EConnectStatus.Disconnected);
  }
  j5() {
    this.w5 = EConnectStatus.Connected;
  }
  G5(t) {
    this.Q5(),
      (this.w5 = EConnectStatus.Connected),
      (this.M5 = t.ConnectId),
      this.U5(t.ConnectId);
  }
  W5(t) {
    !this.IsServer ||
      t.Type !== EPackage.Connect ||
      t.ConnectId <= this.M5 ||
      this.G5(t);
  }
  X5() {
    if (this.W3.length >= Stcp.MaxSeqId) return !1;
    var t = this.sFn.Recv();
    if (!t) return !1;
    if (0 < this.N5) this.N5--;
    else
      switch (this.w5) {
        case EConnectStatus.Disconnected:
          this.W5(t);
          break;
        case EConnectStatus.Connecting:
          this.V5(t);
          break;
        case EConnectStatus.Connected:
          this.B5(t);
      }
    return !0;
  }
  J5() {
    for (; this.X5(); );
  }
  Recv() {
    return this.J5(), this.W3.shift()?.Payload;
  }
  Update() {
    this.J5(), this.q5();
  }
  async RecvAsync(n = -1) {
    return new Promise((e, t) => {
      let s = void 0;
      const i = setInterval(() => {
        var t = this.W3.shift();
        t?.Payload && (s && clearTimeout(s), clearInterval(i), e(t.Payload));
      }, 1);
      0 <= n &&
        (s = setTimeout(() => {
          clearInterval(i), e(void 0);
        }, n));
    });
  }
  Start() {
    this.j3 ||
      (this.j3 = setInterval(() => {
        this.Update();
      }, Stcp.RefreshInterval));
  }
  Stop() {
    this.j3 && (clearInterval(this.j3), (this.j3 = void 0));
  }
}
((exports.Stcp = Stcp).RefreshInterval = 20),
  (Stcp.MaxSeqId = 256),
  (Stcp.P5 = 0);
class RpcServer {
  constructor(t, e, s) {
    (this.G3 = t), (this.Y5 = e), (this.x5 = s);
  }
  Update() {
    var e = this.G3.Recv();
    if (e) {
      const i = e;
      e = this.Y5[i.Name];
      if (e) {
        var t,
          s = void 0;
        try {
          (s = e(...i.Args)) instanceof Promise
            ? s
                .then((t) => {
                  t = { Id: i.Id, Result: t };
                  this.G3.Send(t);
                })
                .catch((t) => {
                  t = {
                    Id: i.Id,
                    Result: void 0,
                    Error: t.message + " " + t.stack,
                  };
                  this.G3.Send(t);
                })
            : ((t = { Id: i.Id, Result: s }), this.G3.Send(t));
        } catch (t) {
          e = { Id: i.Id, Result: void 0, Error: t.message + " " + t.stack };
          this.G3.Send(e);
        }
      } else
        this.x5.Error(`RpcServer: function ${i.Name} not found`),
          (s = {
            Id: i.Id,
            Result: void 0,
            Error: `RpcServer: function ${i.Name} not found`,
          }),
          this.G3.Send(s);
    }
  }
  Start() {
    this.j3 ||
      (this.G3.Start(), (this.j3 = setInterval(this.Update.bind(this), 1)));
  }
  Stop() {
    this.j3 && (this.G3.Stop(), clearInterval(this.j3), (this.j3 = void 0));
  }
}
exports.RpcServer = RpcServer;
const gameRpcServiceConfig = {
    ExecGmCommand: (t) => !1,
    IsWorldLoadDone: () => !1,
    GetMapId: () => 0,
    GetPlayerId: () => 0,
    TeleportToPos: async (t, e) => !1,
    IsInteractionHintViewOpen: () => !1,
    IsAllowFightInput: () => !1,
    GetPlayerPos: () => {},
    GetPlayerRotation: () => {},
    AddBuffToPlayer: (t) => {},
    RemoveBuffFromPlayer: (t) => {},
    PlayerHasBuff: (t) => !1,
    MoveTo: async (t, e) => {},
    FaceTo: async (t, e, s) => {},
    NormalAttack: () => {},
    UseRoleSkill: () => {},
    UsePhantomSkill: () => {},
    UseUltraSkill: () => {},
    UseExploreSkill: () => {},
    RequestExploreSkill: (t) => {},
    IsInExploreSkill: (t) => !1,
    StopAllSkills: () => {},
    CanUseSkill: (t) => !1,
    GetPlayerItemCount: (t) => 0,
    DisablePlayerClientComponent: (t) => !1,
    GetCameraTransform: () => ({}),
    PlayDaEffect: (t, e) => [!1, ""],
    GetTrackLevelPlayId: () => 0,
    IsEntityExist: (t) => !1,
    IsEntityInitDone: (t) => !1,
    IsSceneItemComponentInitDone: (t) => !1,
    TriggerInteractOption: () => {},
    ChangeInteractOption: () => {},
    RequestEntityInteractOption: async (t, e) => !1,
    AddBuffToEntity: (t, e) => {},
    RemoveBuffFromEntity: (t, e) => {},
    EntityHasBuff: (t, e) => !1,
    GetEntityCurrentMontageName: (t) => "",
    IsInEntityState: (t, e) => !1,
    IsEntityLocked: (t) => !1,
    GetElevatorFloor: (t) => 0,
    IsEntityActive: (t) => !1,
    GetEntityPos: (t) => {},
    GetEntityRotation: (t) => {},
    GetRuntimeActorName: (t) => "",
    IsRuntimeActorVisible: (t) => !1,
    CreateOrUpdateTipsActor: (t, e, s) => {},
    DestroyTipsActor: (t) => {},
    GetTipsActorTransform: (t) => {},
  },
  unitTestRpcServiceConfig = {
    Add: (t, e) => 0,
    Sub: (t, e) => 0,
    Mul: (t, e) => 0,
    Div: (t, e) => 0,
  };
//# sourceMappingURL=ITransport.js.map
