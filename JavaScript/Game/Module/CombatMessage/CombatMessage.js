"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatNet = void 0);
const cpp_1 = require("cpp"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Time_1 = require("../../../Core/Common/Time"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  IS_WITH_EDITOR = cpp_1.FKuroUtilityForPuerts.IsWithEditor() ? 1 : void 0;
class CombatNet {
  static Jyt(e, t, o, a) {
    return "function" != typeof e
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
      this.Jyt(a, t, o, e) &&
        this.NotifyMap.set(o, (e, t, o) => {
          r.value?.call(a, e, t, o);
        });
    };
  }
  static SyncHandle(t) {
    const o = NetDefine_1.ECombatNotifyDataMessage[t];
    return (a, e, r) => {
      this.Jyt(a, t, o, e) &&
        this.SyncNotifyMap.set(o, (e, t, o) => {
          r.value?.call(a, e, t, o);
        });
    };
  }
  static PreHandle(t) {
    const o = NetDefine_1.ECombatNotifyDataMessage[t];
    return (a, e, r) => {
      this.Jyt(a, t, o, e) &&
        this.PreNotifyMap.set(o, (e, t, o) => r.value?.call(a, e, t, o));
    };
  }
  static GenerateRpcId() {
    return CombatNet.zyt < 32767 ? ++CombatNet.zyt : (CombatNet.zyt = 0);
  }
  static RemovePendingCall(e) {
    this.H2n.delete(e);
  }
  static Call(t, o, a, r, i, e, n, s) {
    i &&
      this.H2n.has(i) &&
      ((_ = this.H2n.get(i)),
      CombatNet.RequestMap.set(_[0], _[1]),
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.S5n.push(_[2]),
      this.H2n.delete(i));
    var _ = NetDefine_1.ECombatRequestDataMessage[t],
      l = CombatNet.GenerateRpcId(),
      e = e ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
      m = Protocol_1.Aki.Protocol.CombatMessage.bFs.create(),
      n =
        ((m.q8n = l),
        (m.G8n = CombatNet.CreateCombatCommon(o, n, i, e)),
        (m[_] = a),
        Protocol_1.Aki.Protocol.CombatMessage.BFs.create());
    if (
      ((n.E5n = m),
      s
        ? this.H2n.set(e, [l, r, n])
        : (CombatNet.RequestMap.set(l, r),
          ModelManager_1.ModelManager.CombatMessageModel.MessagePack.S5n.push(
            n,
          )),
      Info_1.Info.IsBuildDevelopmentOrDebug)
    ) {
      i = NetDefine_1.messageDefine[t].encode(a).finish();
      let e = void 0;
      o instanceof Entity_1.Entity
        ? (e = o?.GetComponent(0))
        : "number" == typeof o &&
          ((_ = EntitySystem_1.EntitySystem.Get(o)), (e = _?.GetComponent(0)));
      (m = e?.GetPbDataId()),
        (s = e?.GetEntityType()),
        (l = e?.GetCreatureDataId());
      0 < i.length &&
        ((r = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id:
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          creature_id: l,
          pb_data_id: m,
          entity_type: s,
          msg_id: t,
          length: i.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          is_request: !0,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
        }),
        (n = JSON.stringify(r)),
        CombatDebugController_1.CombatDebugController.DataReport(
          "COMBAT_MESSAGE_INFO",
          n,
        ));
    }
    return e;
  }
  static Send(e, t, o, a, r, i) {
    var e = NetDefine_1.ECombatPushDataMessage[e],
      n = Protocol_1.Aki.Protocol.CombatMessage.UFs.create(),
      t =
        ((n.G8n = CombatNet.CreateCombatCommon(t, i, a, r)),
        (n[e] = o),
        Protocol_1.Aki.Protocol.CombatMessage.BFs.create());
    (t.O8n = n),
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.S5n.push(t);
  }
  static CreateCombatCommon(e, t, o, a) {
    e =
      e instanceof Entity_1.Entity
        ? MathUtils_1.MathUtils.NumberToLong(
            e?.GetComponent(0)?.GetCreatureDataId() ?? 0,
          )
        : MathUtils_1.MathUtils.NumberToLong(e ?? 0);
    return Protocol_1.Aki.Protocol.G8n.create({
      P4n: e,
      N8n: o ? MathUtils_1.MathUtils.BigIntToLong(o) : 0,
      k8n: MathUtils_1.MathUtils.BigIntToLong(
        a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
      ),
      F8n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      V8n: Time_1.Time.NowSeconds,
      H8n: t ?? !1,
    });
  }
}
((exports.CombatNet = CombatNet).NotifyMap = new Map()),
  (CombatNet.SyncNotifyMap = new Map()),
  (CombatNet.PreNotifyMap = new Map()),
  (CombatNet.zyt = 0),
  (CombatNet.RequestMap = new Map()),
  (CombatNet.H2n = new Map());
//# sourceMappingURL=CombatMessage.js.map
