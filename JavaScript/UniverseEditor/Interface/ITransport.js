"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RpcServer = exports.Stcp = void 0);
const MAX_MESSAGE_LENGTH = 1024;
let EPackage, EConnectStatus;
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
  constructor(t, e, i, s) {
    (this.Name = t),
      (this.uOn = e),
      (this.x5 = i),
      (this.IsServer = s),
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
      s || (this.M5 = Stcp.F5());
  }
  static F5() {
    return Stcp.P5++, Stcp.P5;
  }
  A5(t) {
    this.Verbose && this.x5.Log(t);
  }
  O5() {
    const t = { Type: EPackage.Message, Ack: this.R5, Msgs: [] };
    for (const e of this.S5)
      if ((t.Msgs.push(e), JSON.stringify(t).length >= MAX_MESSAGE_LENGTH)) {
        t.Msgs.pop();
        break;
      }
    return t;
  }
  D5() {
    let t;
    this.IsServer ||
      (this.S5.length !== 0 &&
        ((t = { Type: EPackage.Connect, ConnectId: this.M5 }),
        this.uOn.Send(t),
        (this.w5 = EConnectStatus.Connecting)));
  }
  k5() {
    let t;
    this.IsServer ||
      ((t = { Type: EPackage.Connect, ConnectId: this.M5 }), this.uOn.Send(t));
  }
  b5() {
    let t;
    (this.S5.length === 0 && !this.L5) ||
      ((t = this.O5()),
      this.uOn.Send(t),
      this.S5.length === 0 && (this.L5 = !1),
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
    this.uOn.Send(t);
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
      if ((t.Msgs.length > 0 && (this.L5 = !0), t.Ack > this.I5))
        for (this.I5 = t.Ack; this.S5.length > 0 && this.S5[0].Seq < this.I5; )
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
    const t = this.uOn.Recv();
    if (!t) return !1;
    if (this.N5 > 0) this.N5--;
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
      let i = void 0;
      const s = setInterval(() => {
        const t = this.W3.shift();
        t?.Payload && (i && clearTimeout(i), clearInterval(s), e(t.Payload));
      }, 1);
      n >= 0 &&
        (i = setTimeout(() => {
          clearInterval(s), e(void 0);
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
  constructor(t, e, i) {
    (this.G3 = t), (this.Y5 = e), (this.x5 = i);
  }
  Update() {
    let e = this.G3.Recv();
    if (e) {
      const s = e;
      e = this.Y5[s.Name];
      if (e) {
        let t;
        var i = void 0;
        try {
          (i = e(...s.Args)) instanceof Promise
            ? i
                .then((t) => {
                  t = { Id: s.Id, Result: t };
                  this.G3.Send(t);
                })
                .catch((t) => {
                  t = {
                    Id: s.Id,
                    Result: void 0,
                    Error: t.message + " " + t.stack,
                  };
                  this.G3.Send(t);
                })
            : ((t = { Id: s.Id, Result: i }), this.G3.Send(t));
        } catch (t) {
          e = { Id: s.Id, Result: void 0, Error: t.message + " " + t.stack };
          this.G3.Send(e);
        }
      } else
        this.x5.Error(`RpcServer: function ${s.Name} not found`),
          (i = {
            Id: s.Id,
            Result: void 0,
            Error: `RpcServer: function ${s.Name} not found`,
          }),
          this.G3.Send(i);
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
  FaceTo: async (t, e, i) => {},
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
};
const unitTestRpcServiceConfig = {
  Add: (t, e) => 0,
  Sub: (t, e) => 0,
  Mul: (t, e) => 0,
  Div: (t, e) => 0,
};
// # sourceMappingURL=ITransport.js.map
