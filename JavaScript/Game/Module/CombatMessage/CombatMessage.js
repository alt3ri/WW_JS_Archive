"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatNet = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Time_1 = require("../../../Core/Common/Time"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController");
var CombatCommon = Protocol_1.Aki.Protocol.K8n,
  PushData = Protocol_1.Aki.Protocol.CombatMessage.OFs,
  RequestData = Protocol_1.Aki.Protocol.CombatMessage.FFs,
  SendData = Protocol_1.Aki.Protocol.CombatMessage.VFs;
const Stats_1 = require("../../../Core/Common/Stats"),
  IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : void 0;
class CombatNet {
  static CheckHandle(e, t, o, a) {
    return (
      "function" == typeof e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          19,
          "CombatMessage notify callback should be static function",
          ["MessageKey", t],
          ["MessageId", o],
          ["FunctionName", a],
        ),
      !1)
    );
  }
  static Listen(o, s) {
    const i = NetDefine_1.ECombatNotifyDataMessage[o];
    return (a, t, r) => {
      if (this.CheckHandle(a, o, i, t)) {
        let e = this.NotifyMap.get(i);
        e ||
          ((e = { Type: 0, IsSync: s, Listener: void 0, Preprocessor: void 0 }),
          this.NotifyMap.set(i, e)),
          1 === e.Type || e.Listener
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                19,
                "重复注册函数监听",
                ["MessageKey", o],
                ["MessageId", i],
                ["FunctionName", t],
              )
            : ((e.IsSync = e.IsSync ?? s),
              this.CheckHandle(a, o, i, t) &&
                (e.Listener = (e, t, o) => {
                  r.value?.call(a, e, t, o);
                }));
      }
    };
  }
  static Preprocess(o) {
    const s = NetDefine_1.ECombatNotifyDataMessage[o];
    return (a, t, r) => {
      if (this.CheckHandle(a, o, s, t)) {
        let e = this.NotifyMap.get(s);
        e ||
          ((e = {
            Type: 0,
            IsSync: void 0,
            Listener: void 0,
            Preprocessor: void 0,
          }),
          this.NotifyMap.set(s, e)),
          1 === e.Type || e.Preprocessor
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                19,
                "不能为组件listener注册预处理函数或重复注册预处理函数",
                ["MessageKey", o],
                ["MessageId", s],
                ["FunctionName", t],
              )
            : (e.Preprocessor = (e, t, o) => r.value?.call(a, e, t, o));
      }
    };
  }
  static GenerateRpcId() {
    return CombatNet.zyt < 32767 ? ++CombatNet.zyt : (CombatNet.zyt = 0);
  }
  static RemovePendingCall(e) {
    this.R5l.delete(e);
  }
  static Call(e, t, o, a, r, s, i, n) {
    if ((CombatNet.Tc_.Start(), r && this.R5l.has(r))) {
      const [m, l, _] = this.R5l.get(r);
      CombatNet.RequestMap.set(m, l),
        ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(_),
        this.R5l.delete(r);
    }
    (t =
      (t instanceof Entity_1.Entity
        ? t
        : ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity
      )
        ?.GetComponent(0)
        ?.GetCreatureDataId() ?? 0),
      (e = NetDefine_1.ECombatRequestDataMessage[e]);
    const m = CombatNet.GenerateRpcId();
    var s = s ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
      C = RequestData.create();
    (C.W8n = m), (C.K8n = CombatNet.CreateCombatCommon(t, i, r, s)), (C[e] = o);
    const _ = SendData.create();
    return (
      (_.x5n = C),
      n
        ? this.R5l.set(s, [m, a, _])
        : (CombatNet.RequestMap.set(m, a),
          ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(
            _,
          )),
      CombatNet.Tc_.Stop(),
      s
    );
  }
  static Send(e, t, o, a, r, s) {
    if ((CombatNet.bc_.Start(), a && this.R5l.has(a))) {
      const [m, C, n] = this.R5l.get(a);
      CombatNet.RequestMap.set(m, C),
        ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(n),
        this.R5l.delete(a);
    }
    var e = NetDefine_1.ECombatPushDataMessage[e],
      i = PushData.create(),
      t = t?.GetComponent(0)?.GetCreatureDataId() ?? 0;
    (r = r ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      (i.K8n = CombatNet.CreateCombatCommon(t, s, a, r)),
      (i[e] = o);
    const n = SendData.create();
    return (
      (n.Q8n = i),
      ModelManager_1.ModelManager.CombatMessageModel.MessagePack.R5n.push(n),
      CombatNet.bc_.Stop(),
      r
    );
  }
  static CreateCombatCommon(e, t, o, a) {
    return CombatCommon.create({
      F4n: e,
      X8n: o ? MathUtils_1.MathUtils.BigIntToLong(o) : 0,
      $8n: MathUtils_1.MathUtils.BigIntToLong(
        a ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(),
      ),
      Y8n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      J8n: Time_1.Time.NowSeconds,
      z8n: t ?? !1,
    });
  }
}
((exports.CombatNet = CombatNet).NotifyMap = new Map()),
  (CombatNet.zyt = 0),
  (CombatNet.RequestMap = new Map()),
  (CombatNet.R5l = new Map()),
  (CombatNet.Tc_ = Stats_1.Stat.Create("CombatNet.Call")),
  (CombatNet.bc_ = Stats_1.Stat.Create("CombatNet.Send"));
//# sourceMappingURL=CombatMessage.js.map
