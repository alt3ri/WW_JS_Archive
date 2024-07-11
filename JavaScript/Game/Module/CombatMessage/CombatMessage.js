"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatNet = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
class CombatNet {
  static kEt(e, t, o, a) {
    return typeof e !== "function"
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            20,
            "CombatMessage notify callback should be static function",
            ["MessageKey", t],
            ["MessageId", o],
            ["FunctionName", a],
          ),
        !1)
      : (!this.NotifyMap.has(o) && !this.SyncNotifyMap.has(o)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              20,
              "Trying to register duplicate handle in combat message system",
              ["MessageKey", t],
              ["MessageId", o],
              ["FunctionName", a],
            ),
          !1);
  }
  static Listen(e, t) {
    return t ? this.SyncHandle(e) : this.Handle(e);
  }
  static Handle(t) {
    const o = NetDefine_1.ECombatNotifyDataMessage[t];
    return (a, e, r) => {
      this.kEt(a, t, o, e) &&
        this.NotifyMap.set(o, (e, t, o) => {
          r.value?.call(a, e, t, o);
        });
    };
  }
  static SyncHandle(t) {
    const o = NetDefine_1.ECombatNotifyDataMessage[t];
    return (a, e, r) => {
      this.kEt(a, t, o, e) &&
        this.SyncNotifyMap.set(o, (e, t, o) => {
          r.value?.call(a, e, t, o);
        });
    };
  }
  static PreHandle(t) {
    const o = NetDefine_1.ECombatNotifyDataMessage[t];
    return (a, e, r) => {
      this.kEt(a, t, o, e) &&
        this.PreNotifyMap.set(o, (e, t, o) => r.value?.call(a, e, t, o));
    };
  }
  static GenerateRpcId() {
    return CombatNet.FEt < 32767 ? ++CombatNet.FEt : (CombatNet.FEt = 0);
  }
  static RemovePendingCall(e) {
    this.Nqn.delete(e);
  }
  static Call(e, t, o, a, r, i, s, n) {
    r &&
      this.Nqn.has(r) &&
      ((_ = this.Nqn.get(r)),
      CombatNet.RequestMap.set(_[0], _[1]),
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(_[2]),
      this.Nqn.delete(r));
    var _ = NetDefine_1.ECombatRequestDataMessage[e];
    var e = CombatNet.GenerateRpcId();
    var i = i ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    const l = Protocol_1.Aki.Protocol.CombatMessage.jGs.create();
    var t =
      ((l.i4n = e),
      (l.r4n = CombatNet.CreateCombatCommon(t, s, r, i)),
      (l[_] = o),
      Protocol_1.Aki.Protocol.CombatMessage.WGs.create());
    return (
      (t.Qkn = l),
      n
        ? this.Nqn.set(i, [e, a, t])
        : (CombatNet.RequestMap.set(e, a),
          ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(
            t,
          )),
      i
    );
  }
  static Send(e, t, o, a, r, i) {
    var e = NetDefine_1.ECombatPushDataMessage[e];
    const s = Protocol_1.Aki.Protocol.CombatMessage.VGs.create();
    var t =
      ((s.r4n = CombatNet.CreateCombatCommon(t, i, a, r)),
      (s[e] = o),
      Protocol_1.Aki.Protocol.CombatMessage.WGs.create());
    (t.o4n = s),
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.Kkn.push(t);
  }
  static CreateCombatCommon(e, t, o, a) {
    e =
      e instanceof Entity_1.Entity
        ? MathUtils_1.MathUtils.NumberToLong(
            e?.GetComponent(0)?.GetCreatureDataId() ?? 0,
          )
        : MathUtils_1.MathUtils.NumberToLong(e ?? 0);
    return Protocol_1.Aki.Protocol.r4n.create({
      rkn: e,
      n4n: o ? MathUtils_1.MathUtils.BigIntToLong(o) : 0,
      s4n: MathUtils_1.MathUtils.BigIntToLong(
        a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
      ),
      a4n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      h4n: Time_1.Time.NowSeconds,
      l4n: t ?? !1,
    });
  }
}
((exports.CombatNet = CombatNet).NotifyMap = new Map()),
  (CombatNet.SyncNotifyMap = new Map()),
  (CombatNet.PreNotifyMap = new Map()),
  (CombatNet.FEt = 0),
  (CombatNet.RequestMap = new Map()),
  (CombatNet.Nqn = new Map());
// # sourceMappingURL=CombatMessage.js.map
