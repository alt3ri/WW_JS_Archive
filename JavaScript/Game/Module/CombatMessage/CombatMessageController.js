"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (e, o, t, a) {
      var r,
        s = arguments.length,
        l =
          s < 3
            ? o
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(o, t))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        l = Reflect.decorate(e, o, t, a);
      else
        for (var i = e.length - 1; 0 <= i; i--)
          (r = e[i]) &&
            (l = (s < 3 ? r(l) : 3 < s ? r(o, t, l) : r(o, t)) || l);
      return 3 < s && l && Object.defineProperty(o, t, l), l;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StatDefine_1 = require("../../Common/StatDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  CombatMessage_1 = require("./CombatMessage"),
  cpp_1 = require("cpp"),
  notifyMessageCacheSet = new Set([
    NetDefine_1.ECombatNotifyDataMessage.pFn,
    NetDefine_1.ECombatNotifyDataMessage.fFn,
    NetDefine_1.ECombatNotifyDataMessage.vFn,
    NetDefine_1.ECombatNotifyDataMessage.TFn,
    NetDefine_1.ECombatNotifyDataMessage.yFn,
    NetDefine_1.ECombatNotifyDataMessage.IFn,
  ]),
  MAX_AI_INFO_COUNT = 100,
  IS_WITH_EDITOR = cpp_1.FKuroUtilityForPuerts.IsWithEditor() ? 1 : void 0;
class CombatMessageController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CombatMessageModel;
  }
  static OnInit() {
    Net_1.Net.Register(10106, CombatMessageController.Zyt),
      Net_1.Net.Register(4850, CombatMessageController.eIt),
      Net_1.Net.Register(24476, CombatMessageController.tIt),
      Net_1.Net.Register(27816, CombatMessageController.X0a),
      Net_1.Net.Register(27544, CombatMessageController.oIt),
      Net_1.Net.Register(
        29647,
        CombatMessageController.PreAiControlSwitchNotify,
      ),
      Net_1.Net.Register(11926, this.rIt);
    for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
      this.Register(e, this.nIt(e, CombatMessage_1.CombatNet.SyncNotifyMap));
    return !0;
  }
  static OnClear() {
    Net_1.Net.UnRegister(10106),
      Net_1.Net.UnRegister(4850),
      Net_1.Net.UnRegister(24476),
      Net_1.Net.UnRegister(27816),
      Net_1.Net.UnRegister(27544),
      Net_1.Net.UnRegister(29647),
      Net_1.Net.UnRegister(11926);
    for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
      this.UnRegister(e);
    return !0;
  }
  static nIt(t, a) {
    return (e, o) => {
      a.get(t)?.(e, o);
    };
  }
  static sIt(e) {
    let o = this.aIt.get(e);
    return o || ((o = void 0), this.aIt.set(e, o)), o;
  }
  static hIt(e, o) {
    const t = MathUtils_1.MathUtils.LongToNumber(e.P4n);
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      r = NetDefine_1.ECombatNotifyDataMessage[o.wFs];
    if (!a || a.IsInit || notifyMessageCacheSet.has(r)) {
      CombatDebugController_1.CombatDebugController.CombatInfoMessage(
        "Notify",
        o.wFs,
        e,
      );
      var s = a?.Entity;
      if (CombatMessage_1.CombatNet.SyncNotifyMap.has(r)) {
        const t = MathUtils_1.MathUtils.LongToNumber(e.F8n);
        var l,
          i = CombatMessageController.Model?.GetMessageBuffer(t);
        i && ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ((l = CombatMessage_1.CombatNet.PreNotifyMap.get(r)) &&
              !l(s, o[o.wFs], e)) ||
            i.Push(r, s, o.G8n, o[o.wFs])
          : CombatMessage_1.CombatNet.SyncNotifyMap.get(r)?.(s, o[o.wFs], e);
      } else
        CombatMessage_1.CombatNet.NotifyMap.has(r)
          ? CombatMessage_1.CombatNet.NotifyMap.get(r)?.(s, o[o.wFs], e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              20,
              "Unexpected combat notify message type",
              ["MessageKey", o.wFs],
              ["MessageId", r],
            );
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((l = NetDefine_1.messageDefine[r].encode(o).finish()),
        (s = (i = a?.Entity?.GetComponent(0))?.GetPbDataId()),
        (a = i?.GetEntityType()),
        (i = i?.GetCreatureDataId()),
        0 < l.length) &&
        ((i = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id:
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          creature_id: i,
          pb_data_id: s,
          entity_type: a,
          msg_id: r,
          length: l.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          is_notify: !0,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
        }),
        (s = JSON.stringify(i)),
        CombatDebugController_1.CombatDebugController.DataReport(
          "COMBAT_MESSAGE_INFO",
          s,
        ));
    } else
      CombatLog_1.CombatLog.Warn(
        "Notify",
        t,
        "协议丢弃，实体未加载完成",
        ["Message", o.wFs],
        ["CombatCommon", e],
      );
  }
  static lIt(e, o) {
    var t = CombatMessage_1.CombatNet.RequestMap,
      a = o.q8n;
    if (t.has(a)) {
      var r = t.get(a),
        s = o[o.wFs];
      if ((t.delete(a), s))
        try {
          r?.(s);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                15,
                "战斗协议执行response异常",
                e,
                ["response", o.wFs],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                15,
                "战斗协议执行response异常",
                ["response", o.wFs],
                ["stack", e],
              );
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "MultiplayerCombat",
            20,
            "unexpected null combat response",
            ["messageType", o.wFs],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          20,
          "unexpected response RPC id from server",
          ["messageType", o.wFs],
        );
  }
  static Register(r, s) {
    return (
      Net_1.Net.Register(r, (e) => {
        var o,
          t,
          a = e;
        a
          ? a.CombatCommon
            ? ((o = MathUtils_1.MathUtils.LongToNumber(a.CombatCommon.P4n)),
              (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity),
              ModelManager_1.ModelManager.GameModeModel.IsMulti
                ? (this.IsDebugMessageLog &&
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "MultiplayerCombat",
                      15,
                      "[CombatMessageController.ReceiveNotify]",
                      ["id", r],
                      ["MessageId", a.CombatCommon.k8n],
                      ["Originator", a.CombatCommon.F8n],
                      ["TimeStamp", a.CombatCommon.V8n],
                    ),
                  CombatMessageController.Model.GetMessageBuffer(o)?.Push(
                    r,
                    t,
                    a.CombatCommon,
                    e,
                  ))
                : s(t, e))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                15,
                "[CombatMessageController.ReceiveNotify]协议字段CombatCommon为空",
                ["id", r],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              15,
              "[CombatMessageController.ReceiveNotify]战斗消息必须包含CombatCommon属性",
              ["id", r],
            );
      }),
      this.sX.has(r)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              15,
              "[CombatMessageController.Register]战斗网络消息重复注册",
              ["id", r],
            ),
          !1)
        : (this.sX.set(r, (e, o) => {
            s(e, o);
          }),
          !0)
    );
  }
  static UnRegister(e) {
    return (
      Net_1.Net.UnRegister(e),
      this.sX.delete(e) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("MultiplayerCombat", 15, "战斗网络消息未注册", [
            "id",
            e,
          ])),
      !0
    );
  }
  static Process(e, o, t, a) {
    var r = CombatMessage_1.CombatNet.SyncNotifyMap.get(e);
    r ? r(o, t, a) : this.sX.get(e)?.(o, t);
  }
  static RegisterPreTick(e, o) {
    this.Y7.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          15,
          "[CombatMessageController.RegisterPreTick] 当前Comp已经注册过PreTick",
          ["Comp", e.toString()],
        )
      : this.Y7.set(e, o);
  }
  static UnregisterPreTick(e) {
    this.Y7.has(e)
      ? this.Y7.delete(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          15,
          "[CombatMessageController.RegisterPreTick] 当前Comp未注册过PreTick",
          ["Comp", e.toString()],
        );
  }
  static RegisterAfterTick(e, o) {
    this._It.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          15,
          "[CombatMessageController.RegisterAfterTick] 当前Comp已经注册过AfterTick",
          ["Comp", e.toString()],
        )
      : this._It.set(e, o);
  }
  static UnregisterAfterTick(e) {
    this._It.has(e)
      ? this._It.delete(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          15,
          "[CombatMessageController.UnregisterAfterTick] 当前Comp未注册过AfterTick",
          ["Comp", e.toString()],
        );
  }
  static PreTick(e) {
    if (
      Net_1.Net.IsServerConnected() &&
      ModelManager_1.ModelManager.GameModeModel.MapDone
    ) {
      var o,
        t,
        a = e * MathUtils_1.MathUtils.MillisecondToSecond;
      for (const r of this.Model.CombatMessageBufferMap.values()) r.OnTick(a);
      for ([o, t] of this.Y7)
        try {
          o.Entity?.Valid && t(e);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                15,
                "处理方法执行异常",
                e,
                ["comp", o.toString()],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                15,
                "处理方法执行异常",
                ["comp", o.toString()],
                ["error", e],
              );
        }
    }
  }
  static AfterTick(e) {
    if (
      Net_1.Net.IsServerConnected() &&
      ModelManager_1.ModelManager.GameModeModel.MapDone
    ) {
      for (var [o, t] of this._It)
        try {
          o.Entity?.Valid &&
            ((o.Entity.Active || this.cIt.has(o.Entity)) &&
            (t(e), o.Entity.Active)
              ? this.cIt.add(o.Entity)
              : this.cIt.delete(o.Entity));
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                15,
                "处理方法执行异常",
                e,
                ["comp", o.toString()],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                15,
                "处理方法执行异常",
                ["comp", o.toString()],
                ["error", e],
              );
        }
      if (
        Time_1.Time.NowSeconds > this.mIt + this.dIt ||
        0 <
          BlackboardController_1.BlackboardController.PendingBlackboardParams
            .size ||
        this.Model.AnyHateChange
      ) {
        let e = !1;
        for (const b of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
          [])
          if (b.IsInit) {
            e || ((a = b.Entity.GetComponent(160)), (e = a?.IsInFightState()));
            var a = Protocol_1.Aki.Protocol.Ai.V3n.create(),
              r = b.Entity.GetComponent(1);
            if (
              r &&
              r.CreatureData.GetEntityType() ===
                Protocol_1.Aki.Protocol.wks.Proto_Monster
            ) {
              var s,
                l,
                i = Protocol_1.Aki.Protocol.Ai.Yks.create(),
                r = r.CreatureData.GetCreatureDataId(),
                n =
                  BlackboardController_1.BlackboardController.PendingBlackboardParams.get(
                    r,
                  ),
                n =
                  (n &&
                    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    (i.W8n = [...n.values()]),
                  ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                    this.Model.AnyHateChange ||
                    0 < i.W8n.length);
              if (n)
                for ([s, l] of b.Entity.GetComponent(
                  39,
                ).AiController.AiHateList.GetHatredMap()) {
                  var _ = Protocol_1.Aki.Protocol.Ai.Kks.create();
                  (_.P4n = MathUtils_1.MathUtils.NumberToLong(
                    ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                      s,
                    ),
                  )),
                    (_.j8n = l.HatredValue),
                    i.fSs.push(_);
                }
              i.W8n.length > MAX_AI_INFO_COUNT &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "MultiplayerCombat",
                  20,
                  "黑板数据过大",
                  ["CreatureData", r],
                  ["AiBlackboards", i.W8n.length],
                ),
                i.fSs.length > MAX_AI_INFO_COUNT &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "MultiplayerCombat",
                    20,
                    "仇恨数据过大",
                    ["CreatureData", r],
                    ["HateList", i.fSs.length],
                  ),
                (a.K8n = i),
                n && CombatMessage_1.CombatNet.Call(20191, r, a, () => {});
            }
          }
        (this.Model.AnyEntityInFight = e),
          BlackboardController_1.BlackboardController.PendingBlackboardParams.clear(),
          (this.mIt = Time_1.Time.NowSeconds);
      }
      if (
        ((this.Model.AnyHateChange = !1),
        (!ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode ||
          !ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
          ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove)
      ) {
        var C = Protocol_1.Aki.Protocol.$us.create();
        for (const c of ModelManager_1.ModelManager.CombatMessageModel
          .MoveSyncSet) {
          var g = c.CollectPendingMoveInfos();
          g && C.kRs.push(g);
        }
        0 < C.kRs.length && Net_1.Net.Send(28674, C),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((m = {
              scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              instance_id:
                ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              msg_id: 28674,
              sub_count: C.kRs.length,
              is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
              ed: IS_WITH_EDITOR,
              br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
            }),
            (m = JSON.stringify(m)),
            CombatDebugController_1.CombatDebugController.DataReport(
              "COMBAT_MESSAGE_COUNT",
              m,
            )),
          (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !1);
      }
      var M = [],
        m = this.Model.MessagePack;
      if (0 < m.S5n.length)
        if (
          ModelManager_1.ModelManager.CombatMessageModel
            .CombatMessageSendPendingTime
        ) {
          if (
            Time_1.Time.NowSeconds >=
            ModelManager_1.ModelManager.CombatMessageModel
              .CombatMessageSendPendingTime +
              ModelManager_1.ModelManager.CombatMessageModel
                .CombatMessageSendInterval
          ) {
            for (const f of m.S5n)
              f.E5n &&
                (CombatDebugController_1.CombatDebugController.CombatContextInfoMessage(
                  "Request",
                  f.E5n.wFs,
                  f.E5n,
                ),
                M.push(f.E5n.wFs));
            Net_1.Net.Call(25867, m, (e) => {
              e.VLs && this.rIt(e.VLs);
            }),
              Info_1.Info.IsBuildDevelopmentOrDebug &&
                ((m = {
                  scene_id:
                    ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
                  instance_id:
                    ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
                  msg_id: 25867,
                  sub_count: m.S5n.length,
                  is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
                  sub_msg: M,
                  frame: Time_1.Time.Frame,
                  ed: IS_WITH_EDITOR,
                  br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
                }),
                (m = JSON.stringify(m)),
                CombatDebugController_1.CombatDebugController.DataReport(
                  "COMBAT_MESSAGE_COUNT",
                  m,
                )),
              (this.Model.MessagePack =
                Protocol_1.Aki.Protocol.CombatMessage.Zzn.create()),
              (ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime = 0);
          }
        } else
          ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime =
            Time_1.Time.NowSeconds;
    }
  }
  static Oda(e) {
    var o,
      t = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      a = WorldGlobal_1.WorldGlobal.ToUeVector(e.EDs),
      r = CharacterController_1.CharacterController.GetActorComponent(t),
      r =
        (r.SetActorLocation(a, "CombatMessageController.位置重置", !1),
        e.yDs &&
          ((o = WorldGlobal_1.WorldGlobal.ToUeRotator(e.a8n)),
          r.SetActorRotation(o, "CombatMessageController.位置重置")),
        t.Entity.GetComponent(163)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        t.Entity.GetComponent(59));
    r
      ? r.ClearReplaySamples()
      : (o = t.Entity.GetComponent(59)) && o?.ClearReplaySamples(),
      e.IDs &&
        ((r = t.Entity.GetComponent(0)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "ResetLocationForZRangeNotify 重置出生点",
            ["CreatureDataId", r.GetCreatureDataId()],
            ["PbDataId", r.GetPbDataId()],
            ["EntityId", t.Entity.Id],
          ),
        r.SetInitLocation(a),
        (o = t.Entity.GetComponent(3))?.SetInitLocation(a),
        o?.FixBornLocation("重置出生点.修正角色地面位置", !0, void 0, !1));
  }
  static gIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
      a = MathUtils_1.MathUtils.LongToNumber(e.F8n);
    if (
      (CombatMessageController.IsDebugMessageLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MultiplayerCombat",
          15,
          "[CombatMessageController.ReceiveNotify]",
          ["Originator", a],
        ),
      t)
    )
      if (e.Q8n.length <= 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
            ["Originator", a],
          );
      else {
        var r = e.Q8n[0].V8n;
        if (t.Entity.Active) {
          var s,
            l = CombatMessageController.Model.GetMessageBuffer(a);
          l &&
            ((s = t.Entity.GetComponent(0)),
            CombatMessageController.Model.SetEntityMap(t.Id, a),
            l.RecordMessageTime(r, s.GetPbDataId(), !0));
          const i = t.Entity.GetComponent(58);
          i
            ? i.ReceiveMoveInfos(e.Q8n, Number(a), r)
            : CombatLog_1.CombatLog.Warn(
                "Move",
                t.Entity,
                "entity不存在组件CharacterMovementSyncComponent",
                ["creatureDataId", o],
              );
        } else {
          if (!t.IsInit) return;
          const i = t.Entity.GetComponent(58);
          l = e.Q8n[e.Q8n.length - 1];
          CombatMessageController.fIt(l.y5n, CombatMessageController.pIt),
            CombatMessageController.vIt(l.a8n, CombatMessageController.MIt),
            t.Entity.GetComponent(3)?.SetActorLocationAndRotation(
              CombatMessageController.pIt,
              CombatMessageController.MIt,
              "MoveInfosHandle",
              !1,
            ),
            void i?.ClearReplaySamples();
        }
      }
  }
  static EntityIsVisibleNotify(e, o) {
    e &&
      (e.IsInit
        ? (CombatLog_1.CombatLog.Info("Actor", e, "Entity通知设置显隐", [
            "v",
            o.X8n,
          ]),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            e,
            o.X8n,
            "CombatMessageController.EntityIsVisibleNotify",
          ))
        : e.GetComponent(0)?.SetVisible(o.X8n));
  }
  static ActorIsVisibleNotify(e, o) {
    e &&
      (CombatLog_1.CombatLog.Info("Actor", e, "Actor通知设置显隐", [
        "v",
        o.$8n,
      ]),
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        e,
        o.$8n,
        o.$8n,
        o.$8n,
        "ActorIsVisibleNotify",
      ));
  }
  static EIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.P4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    t
      ? (t = t.Entity.GetComponent(39))
        ? t.OnSyncAiInformation(e)
        : CombatLog_1.CombatLog.Warn(
            "Ai",
            o,
            "OnSyncAiInformation 不存在CharacterAiComponent",
          )
      : CombatLog_1.CombatLog.Warn("Ai", o, "OnSyncAiInformation 不存在实体");
  }
  static EntityLoadCompleteNotify(e, o) {
    var t = o.q5n;
    for (const r of o.ySs) {
      var a = MathUtils_1.MathUtils.LongToNumber(r),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      a && a.Entity.GetComponent(39)?.SetLoadCompletePlayer(t);
    }
  }
  static PlayerRebackSceneNotify(e, o) {
    (o = MathUtils_1.MathUtils.LongToNumber(o.xDs)),
      (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o));
    o && o.Entity.GetComponent(59).ClearReplaySamples();
  }
  static MaterialNotify(e, o) {
    if (o.J8n.Y8n.length <= 0 || "None" === o.J8n.Y8n)
      CombatLog_1.CombatLog.Warn("Material", e, "材质同步失败，参数非法");
    else {
      const t = e?.GetComponent(2)?.Actor;
      t
        ? o.J8n.z8n
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              o.J8n.Y8n,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerDataGroup(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
                      "data.MaterialInfo.AssetName",
                      o.J8n.Y8n,
                    ]);
              },
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              o.J8n.Y8n,
              UE.PD_CharacterControllerData_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerData(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
                      "data!.MaterialInfo.AssetName",
                      o.J8n.Y8n,
                    ]);
              },
            )
        : CombatLog_1.CombatLog.Warn("Material", e, "材质同步失败，Actor为空");
    }
  }
  static fIt(e, o) {
    (o.X = e.X), (o.Y = e.Y), (o.Z = e.Z);
  }
  static vIt(e, o) {
    (o.Pitch = e.Pitch), (o.Roll = e.Roll), (o.Yaw = e.Yaw);
  }
}
((_a = CombatMessageController).IsTickEvenPausedInternal = !0),
  (CombatMessageController.IsDebugMessageLog = !1),
  (CombatMessageController.IsDebugMoveMessage = !1),
  (CombatMessageController.StartTime = 0),
  (CombatMessageController.MoveData = 0),
  (CombatMessageController.MoveDataCount = 0),
  (CombatMessageController.StateData = 0),
  (CombatMessageController.StateDataCount = 0),
  (CombatMessageController.sX = new Map()),
  (CombatMessageController.SIt = void 0),
  (CombatMessageController.aIt = new Map()),
  (CombatMessageController.rIt = (e) => {
    for (const a of e.S5n) {
      var o,
        t = a.wFs,
        t = a[t];
      a.NLs
        ? ((o = a.NLs), _a.sIt(o.wFs), _a.hIt(t.G8n, o))
        : a.FLs && ((o = a.FLs), _a.sIt(o.wFs), _a.lIt(t.G8n, o));
    }
  }),
  (CombatMessageController.mIt = 0),
  (CombatMessageController.dIt = 1),
  (CombatMessageController.uIt = void 0),
  (CombatMessageController.CIt = void 0),
  (CombatMessageController.Y7 = new Map()),
  (CombatMessageController._It = new Map()),
  (CombatMessageController.cIt = new Set()),
  (CombatMessageController.Zyt = (o) => {
    const t = MathUtils_1.MathUtils.LongToNumber(o.P4n);
    WaitEntityTask_1.WaitEntityTask.Create(
      t,
      (e) => {
        e
          ? CombatMessageController.Oda(o)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Level",
              32,
              "[ResetLocationForZRangeNotify] 等待之后还是找不到对应的Entity",
              ["id", t],
            );
      },
      !1,
      -1,
    );
  }),
  (CombatMessageController.eIt = (e) => {
    for (const o of e.kRs) _a.gIt(o);
  }),
  (CombatMessageController.tIt = (e) => {
    for (const o of e.kRs) _a.gIt(o);
  }),
  (CombatMessageController.X0a = (e) => {
    var o = MathUtils_1.MathUtils.LongToNumber(e.dda.P4n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    o && (o = o.Entity.GetComponent(115)) && o.HandleMoveToTarget(e);
  }),
  (CombatMessageController.oIt = (e) => {
    for (const o of e.ESs) CombatMessageController.EIt(o);
  }),
  (CombatMessageController.PreAiControlSwitchNotify = (e) => {
    for (const a of e.ySs) {
      var o = MathUtils_1.MathUtils.LongToNumber(a),
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      t
        ? (t = t.Entity.GetComponent(39)) && t.AiController.PreSwitchControl()
        : CombatLog_1.CombatLog.Warn(
            "Ai",
            o,
            "PreAiControlSwitchNotify 不存在实体",
            ["id", o],
          );
    }
  }),
  (CombatMessageController.pIt = new UE.Vector()),
  (CombatMessageController.MIt = new UE.Rotator()),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("IFn")],
    CombatMessageController,
    "EntityIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("l3n")],
    CombatMessageController,
    "ActorIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("MFn")],
    CombatMessageController,
    "EntityLoadCompleteNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("LFn")],
    CombatMessageController,
    "PlayerRebackSceneNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("yFn")],
    CombatMessageController,
    "MaterialNotify",
    null,
  ),
  (exports.CombatMessageController = CombatMessageController);
//# sourceMappingURL=CombatMessageController.js.map
