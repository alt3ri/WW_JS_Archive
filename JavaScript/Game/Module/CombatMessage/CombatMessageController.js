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
        for (var n = e.length - 1; 0 <= n; n--)
          (r = e[n]) &&
            (l = (s < 3 ? r(l) : 3 < s ? r(o, t, l) : r(o, t)) || l);
      return 3 < s && l && Object.defineProperty(o, t, l), l;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  CombatMessage_1 = require("./CombatMessage"),
  notifyMessageCacheSet = new Set([
    NetDefine_1.ECombatNotifyDataMessage.DFn,
    NetDefine_1.ECombatNotifyDataMessage.LFn,
    NetDefine_1.ECombatNotifyDataMessage.AFn,
    NetDefine_1.ECombatNotifyDataMessage.wFn,
    NetDefine_1.ECombatNotifyDataMessage.PFn,
    NetDefine_1.ECombatNotifyDataMessage.BFn,
  ]),
  MAX_AI_INFO_COUNT = 100,
  IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : void 0;
class CombatMessageController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CombatMessageModel;
  }
  static OnInit() {
    return (
      Net_1.Net.Register(24656, CombatMessageController.Zyt),
      Net_1.Net.Register(18749, CombatMessageController.eIt),
      Net_1.Net.Register(27334, CombatMessageController.tIt),
      Net_1.Net.Register(28356, CombatMessageController.sMa),
      Net_1.Net.Register(15293, CombatMessageController.oIt),
      Net_1.Net.Register(
        27989,
        CombatMessageController.PreAiControlSwitchNotify,
      ),
      Net_1.Net.Register(23872, this.rIt),
      Net_1.Net.Register(29858, CombatMessageController.Ei_),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.RegisterAiHateEntity,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(24656),
      Net_1.Net.UnRegister(18749),
      Net_1.Net.UnRegister(27334),
      Net_1.Net.UnRegister(28356),
      Net_1.Net.UnRegister(15293),
      Net_1.Net.UnRegister(27989),
      Net_1.Net.UnRegister(23872),
      Net_1.Net.UnRegister(29858),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.RegisterAiHateEntity,
      ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      !0
    );
  }
  static sIt(e) {
    let o = this.aIt.get(e);
    return (
      o ||
        ((o = Stats_1.Stat.CreateNoFlameGraph(
          e,
          "",
          StatDefine_1.BATTLESTAT_GROUP,
        )),
        this.aIt.set(e, o)),
      o
    );
  }
  static hIt(e, o) {
    var t = [
      ["Message", o.kFs],
      ["CombatCommon", e],
    ];
    if (o.kFs) {
      var a = o[o.kFs],
        r = NetDefine_1.ECombatNotifyDataMessage[o.kFs];
      if (a && r) {
        const C = MathUtils_1.MathUtils.LongToNumber(e.F4n);
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntity(C);
        if (!s || s.IsInit || notifyMessageCacheSet.has(r)) {
          CombatDebugController_1.CombatDebugController.CombatInfoMessage(
            "Notify",
            o.kFs,
            e,
          );
          var l = s?.Entity;
          if (l) {
            var n = CombatMessage_1.CombatNet.NotifyMap.get(r);
            if (n)
              switch (n.Type) {
                case 0: {
                  const C = MathUtils_1.MathUtils.LongToNumber(e.Y8n);
                  var i = CombatMessageController.Model?.GetMessageBuffer(C),
                    _ = n.Preprocessor;
                  if (_ && !_(l, a, e)) break;
                  n.IsSync &&
                  i &&
                  ModelManager_1.ModelManager.GameModeModel.IsMulti
                    ? i.AddToQueue(r, l, e, a)
                    : n?.Listener?.(l, a, e);
                  break;
                }
              }
            else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "MultiplayerCombat",
                  19,
                  "协议找不到对应的监听器",
                  ...t,
                );
          } else
            CombatLog_1.CombatLog.Warn(
              "Notify",
              C,
              "服务器下发打包协议找不到实体",
              ...t,
              ["msg", o],
            );
        } else
          CombatLog_1.CombatLog.Warn(
            "Notify",
            C,
            "协议丢弃，实体未加载完成",
            ...t,
          );
      } else
        CombatLog_1.CombatLog.Error(
          "Message",
          void 0,
          "无法解析协议数据",
          ...t,
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("MultiplayerCombat", 19, "无法解析协议类型", ...t);
  }
  static lIt(e, o) {
    var t = CombatMessage_1.CombatNet.RequestMap,
      a = o.W8n;
    if (t.has(a)) {
      var r = t.get(a),
        s = o[o.kFs];
      if ((t.delete(a), s))
        try {
          r?.(s);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                14,
                "战斗协议执行response异常",
                e,
                ["response", o.kFs],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                14,
                "战斗协议执行response异常",
                ["response", o.kFs],
                ["stack", e],
              );
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "MultiplayerCombat",
            19,
            "unexpected null combat response",
            ["messageType", o.kFs],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          19,
          "unexpected response RPC id from server",
          ["messageType", o.kFs],
        );
  }
  static Process(e, o, t, a) {
    var r = CombatMessage_1.CombatNet.NotifyMap.get(e);
    r && 0 === r.Type ? r.Listener?.(o, t, a) : this.sX.get(e)?.(o, t);
  }
  static RegisterPreTick(e, o) {
    this.Y7.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          14,
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
          14,
          "[CombatMessageController.RegisterPreTick] 当前Comp未注册过PreTick",
          ["Comp", e.toString()],
        );
  }
  static RegisterAfterTick(e, o) {
    this._It.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          14,
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
          14,
          "[CombatMessageController.UnregisterAfterTick] 当前Comp未注册过AfterTick",
          ["Comp", e.toString()],
        );
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
                14,
                "处理方法执行异常",
                e,
                ["comp", o.toString()],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                14,
                "处理方法执行异常",
                ["comp", o.toString()],
                ["error", e],
              );
        }
      if (
        Time_1.Time.NowSeconds > this.mIt + this.dIt ||
        this.Model.AnyHateChange
      ) {
        this.CIt.Start();
        let e = !1;
        for (const m of this.Wd1)
          if (m.IsInit) {
            e || ((l = m.Entity.GetComponent(173)), (e = l?.IsInFightState()));
            var a,
              r,
              s = Protocol_1.Aki.Protocol.Ai.Te_.create(),
              l =
                ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                this.Model.AnyHateChange;
            if (l)
              for ([a, r] of m.Entity.GetComponent(
                46,
              ).AiController.AiHateList.GetHatredMap()) {
                var n = Protocol_1.Aki.Protocol.Ai.eNs.create();
                (n.F4n = MathUtils_1.MathUtils.NumberToLong(
                  ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                    a,
                  ),
                )),
                  (n.Z8n = r.HatredValue),
                  s.ISs.push(n);
              }
            s.ISs.length > MAX_AI_INFO_COUNT &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                19,
                "仇恨数据过大",
                ["CreatureData", m.CreatureDataId],
                ["HateList", s.ISs.length],
              ),
              l && CombatMessage_1.CombatNet.Send(19855, m.Entity, s);
          }
        (this.mIt = Time_1.Time.NowSeconds), this.CIt.Stop();
      }
      if (
        ((this.Model.AnyHateChange = !1),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          0 <
            BlackboardController_1.BlackboardController.PendingBlackboardParams
              .size)
      ) {
        for (const b of this.Wd1) {
          var i, _;
          b.IsInit &&
            ((i = Protocol_1.Aki.Protocol.Ai.Ee_.create()),
            (_ =
              BlackboardController_1.BlackboardController.PendingBlackboardParams.get(
                b.CreatureDataId,
              )) &&
              ((i.eVn = [..._.values()]),
              CombatMessage_1.CombatNet.Send(16898, b.Entity, i)),
            i.eVn.length > MAX_AI_INFO_COUNT) &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              19,
              "黑板数据过大",
              ["CreatureData", b.CreatureDataId],
              ["AiBlackboards", i.eVn.length],
            );
        }
        BlackboardController_1.BlackboardController.PendingBlackboardParams.clear();
      }
      if (
        (!ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode ||
          !ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
        ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove
      ) {
        var C,
          g = Protocol_1.Aki.Protocol.Yus.create();
        g.uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.OnlineModel.OwnerId
          : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        for (const c of ModelManager_1.ModelManager.CombatMessageModel
          .MoveSyncSet) {
          var M = c.CollectPendingMoveInfos();
          M && g.WRs.push(M);
        }
        0 < g.WRs.length && Net_1.Net.Send(16361, g),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((C = {
              scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              instance_id:
                ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              msg_id: 16361,
              sub_count: g.WRs.length,
              is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
              ed: IS_WITH_EDITOR,
              br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
            }),
            (C = JSON.stringify(C)),
            CombatDebugController_1.CombatDebugController.DataReport(
              "COMBAT_MESSAGE_COUNT",
              C,
            )),
          (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !1);
      }
      if (
        (this.FlushMessagePack(),
        0 < ModelManager_1.ModelManager.CombatMessageModel.SkillDirtySet.size)
      ) {
        for (const f of ModelManager_1.ModelManager.CombatMessageModel
          .SkillDirtySet)
          ModelManager_1.ModelManager.CombatMessageModel?.TryClearSkillCount(f);
        ModelManager_1.ModelManager.CombatMessageModel.SkillDirtySet.clear();
      }
    }
  }
  static FlushMessagePack() {
    var e = [],
      o = this.Model.MessagePack;
    if (
      ((o.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()),
      0 < o.R5n.length)
    )
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
          for (const a of o.R5n) {
            var t = a.x5n;
            t &&
              (CombatDebugController_1.CombatDebugController.CombatContextInfoMessage(
                "Request",
                t.kFs,
                t,
              ),
              e.push(t.kFs));
          }
          Net_1.Net.Call(19097, o, (e) => {
            e.XLs && this.rIt(e.XLs);
          }),
            Info_1.Info.IsBuildDevelopmentOrDebug &&
              ((o = {
                scene_id:
                  ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
                instance_id:
                  ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
                msg_id: 19097,
                sub_count: o.R5n.length,
                is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
                sub_msg: e,
                frame: Time_1.Time.Frame,
                ed: IS_WITH_EDITOR,
                br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
              }),
              (o = JSON.stringify(o)),
              CombatDebugController_1.CombatDebugController.DataReport(
                "COMBAT_MESSAGE_COUNT",
                o,
              )),
            (this.Model.MessagePack =
              Protocol_1.Aki.Protocol.CombatMessage.sZn.create()),
            (ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime = 0);
        }
      } else
        ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime =
          Time_1.Time.NowSeconds;
  }
  static pga(e, o) {
    var t,
      a,
      r = Vector_1.Vector.Create(o.ADs),
      s =
        ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
          e,
        ),
      l = e.Entity.GetComponent(3);
    e.IsInit
      ? (l
          ? l.FixBornLocation("ResetLocationForZRangeNotify", !0, r, !1, !0)
          : s.SetActorLocation(
              r.ToUeVector(),
              "ResetLocationForZRangeNotify",
              !1,
            ),
        o.PDs &&
          ((t = WorldGlobal_1.WorldGlobal.ToUeRotator(o.g8n)),
          s.SetActorRotation(t, "ResetLocationForZRangeNotify")),
        e.Entity.GetComponent(176)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        e.Entity.GetComponent(66)?.ClearReplaySamples(),
        e.Entity.GetComponent(154)?.ResetManipulatableState())
      : ((t = e.Entity.GetComponent(0))?.SetLocation(r),
        o.PDs &&
          ((a = WorldGlobal_1.WorldGlobal.ToUeRotator(o.g8n)),
          t?.SetRotation(a))),
      o.UDs &&
        (e.Entity.GetComponent(0).SetInitLocation(r), l?.SetInitLocation(r)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          14,
          "ResetLocationForZRangeNotify 重置实体位置",
          ["CreatureDataId", e.CreatureDataId],
          ["PbDataId", e.PbDataId],
          ["EntityId", e.Entity.Id],
          ["ChangeInitPos", o.UDs],
          ["IsInit", e.IsInit],
          ["Location", r.ToString()],
          ["FinalLocation", s?.ActorLocationProxy],
        );
  }
  static gIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
      a = MathUtils_1.MathUtils.LongToNumber(e.Y8n);
    if (
      (CombatMessageController.IsDebugMessageLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MultiplayerCombat",
          14,
          "[CombatMessageController.ReceiveNotify]",
          ["Originator", a],
        ),
      t)
    )
      if (e.iVn.length <= 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            14,
            "[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
            ["Originator", a],
          );
      else {
        var r = e.iVn[0].J8n;
        if (t.Entity.Active) {
          var s,
            l = CombatMessageController.Model.GetMessageBuffer(a);
          l &&
            ((s = t.Entity.GetComponent(0)),
            CombatMessageController.Model.SetEntityMap(t.Id, a),
            l.RecordMessageTime(r, s.GetPbDataId(), !0));
          const n = t.Entity.GetComponent(66);
          n
            ? n.ReceiveMoveInfos(e.iVn, Number(a), r)
            : CombatLog_1.CombatLog.Warn(
                "Move",
                t.Entity,
                "entity不存在组件CharacterMovementSyncComponent",
                ["creatureDataId", o],
              );
        } else {
          if (!t.IsInit) return;
          const n = t.Entity.GetComponent(66);
          l = e.iVn[e.iVn.length - 1];
          CombatMessageController.fIt(l.P5n, CombatMessageController.pIt),
            CombatMessageController.vIt(l.g8n, CombatMessageController.MIt),
            t.Entity.GetComponent(3)?.SetActorLocationAndRotation(
              CombatMessageController.pIt,
              CombatMessageController.MIt,
              "MoveInfosHandle",
              !1,
            ),
            void n?.ClearReplaySamples();
        }
      }
  }
  static EntityIsVisibleNotify(e, o) {
    e &&
      (e.IsInit
        ? (CombatLog_1.CombatLog.Info("Actor", e, "Entity通知设置显隐", [
            "v",
            o.rVn,
          ]),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            e,
            o.rVn,
            "CombatMessageController.EntityIsVisibleNotify",
          ))
        : e.GetComponent(0)?.SetVisible(o.rVn));
  }
  static ActorIsVisibleNotify(e, o) {
    e &&
      (CombatLog_1.CombatLog.Info("Actor", e, "Actor通知设置显隐", [
        "v",
        o.oVn,
      ]),
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        e,
        o.oVn,
        o.oVn,
        o.oVn,
        "ActorIsVisibleNotify",
      ),
      (e = e.GetComponent(0))) &&
      (e.ActorVisible = o.oVn);
  }
  static EIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    t
      ? (t = t.Entity.GetComponent(46))
        ? t.OnSyncAiInformation(e)
        : CombatLog_1.CombatLog.Warn(
            "Ai",
            o,
            "OnSyncAiInformation 不存在CharacterAiComponent",
          )
      : CombatLog_1.CombatLog.Warn("Ai", o, "OnSyncAiInformation 不存在实体");
  }
  static EntityLoadCompleteNotify(e, o) {
    var t = o.W5n;
    for (const r of o.PSs) {
      var a = MathUtils_1.MathUtils.LongToNumber(r),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      a && a.Entity.GetComponent(46)?.SetLoadCompletePlayer(t);
    }
  }
  static PlayerRebackSceneNotify(e, o) {
    (o = MathUtils_1.MathUtils.LongToNumber(o.NDs)),
      (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o));
    o && o.Entity.GetComponent(67).ClearReplaySamples();
  }
  static MaterialNotify(e, o) {
    if (o.sVn.nVn.length <= 0 || "None" === o.sVn.nVn)
      CombatLog_1.CombatLog.Warn("Material", e, "材质同步失败，参数非法");
    else {
      const t = e?.GetComponent(2)?.Actor;
      t
        ? o.sVn.aVn
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              o.sVn.nVn,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerDataGroup(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
                      "data.MaterialInfo.AssetName",
                      o.sVn.nVn,
                    ]);
              },
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              o.sVn.nVn,
              UE.PD_CharacterControllerData_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerData(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
                      "data!.MaterialInfo.AssetName",
                      o.sVn.nVn,
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
  (CombatMessageController.SIt = Stats_1.Stat.Create(
    "CombatPackNotify.CombatReceivePackNotifyStat",
    "",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (CombatMessageController.aIt = new Map()),
  (CombatMessageController.rIt = (e) => {
    _a.SIt.Start();
    for (const a of e.R5n) {
      var o, t;
      a.KLs
        ? ((o = a.KLs),
          (t = _a.sIt(o.kFs))?.Start(),
          _a.hIt(o.K8n, o),
          t?.Stop())
        : a.QLs &&
          ((o = a.QLs),
          (t = _a.sIt(o.kFs))?.Start(),
          _a.lIt(o.K8n, o),
          t?.Stop());
    }
    _a.SIt.Stop();
  }),
  (CombatMessageController.mIt = 0),
  (CombatMessageController.dIt = 1),
  (CombatMessageController.uIt = Stats_1.Stat.Create("CombatMessageBuffer")),
  (CombatMessageController.CIt = Stats_1.Stat.Create("CombatMessageHatred")),
  (CombatMessageController.Y7 = new Map()),
  (CombatMessageController._It = new Map()),
  (CombatMessageController.Wd1 = new Set()),
  (CombatMessageController.RegisterAiHateEntity = (e, o) => {
    (o.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
      o.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Vision) ||
      (_a.Wd1.has(o)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CombatInfo",
            14,
            "[CombatMessageController.RegisterAiHateEntity] 当前已经注册过Monster",
          )
        : (_a.Wd1.add(o),
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            _a,
            o,
            EventDefine_1.EEventName.RemoveEntity,
            _a.UnregisterMonster,
          )));
  }),
  (CombatMessageController.UnregisterMonster = (e, o) => {
    (o.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
      o.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Vision) ||
      (_a.Wd1.delete(o)
        ? EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            _a,
            o,
            EventDefine_1.EEventName.RemoveEntity,
            _a.UnregisterMonster,
          )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CombatInfo",
            14,
            "[CombatMessageController.RegisterAiHateEntity] 当前Monster未被注册",
          ));
  }),
  (CombatMessageController.cIt = new Set()),
  (CombatMessageController.TickPriority1 = (e) => {
    if (
      Net_1.Net.IsServerConnected() &&
      ModelManager_1.ModelManager.GameModeModel.MapDone
    ) {
      var o,
        t,
        a = e * MathUtils_1.MathUtils.MillisecondToSecond;
      _a.uIt.Start();
      for (const r of _a.Model.CombatMessageBufferMap.values()) r.OnTick(a);
      _a.uIt.Stop();
      for ([o, t] of _a.Y7)
        try {
          o.Entity?.Valid && t(e);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                14,
                "处理方法执行异常",
                e,
                ["comp", o.toString()],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                14,
                "处理方法执行异常",
                ["comp", o.toString()],
                ["error", e],
              );
        }
    }
  }),
  (CombatMessageController.Zyt = (e) => {
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    t?.Valid
      ? CombatMessageController.pga(t, e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          31,
          "[ResetLocationForZRangeNotify] 找不到对应的Entity",
          ["id", o],
        );
  }),
  (CombatMessageController.eIt = (e) => {
    for (const o of e.WRs) _a.gIt(o);
  }),
  (CombatMessageController.tIt = (e) => {
    for (const o of e.WRs) _a.gIt(o);
  }),
  (CombatMessageController.sMa = (e) => {
    var o = MathUtils_1.MathUtils.LongToNumber(e.M0a.F4n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    o && (o = o.Entity.GetComponent(126)) && o.HandleMoveToTarget(e);
  }),
  (CombatMessageController.oIt = (e) => {
    for (const o of e.ASs) CombatMessageController.EIt(o);
  }),
  (CombatMessageController.PreAiControlSwitchNotify = (e) => {
    for (const a of e.PSs) {
      var o = MathUtils_1.MathUtils.LongToNumber(a),
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      t
        ? (t = t.Entity.GetComponent(46)) && t.AiController.PreSwitchControl()
        : CombatLog_1.CombatLog.Warn(
            "Ai",
            o,
            "PreAiControlSwitchNotify 不存在实体",
            ["id", o],
          );
    }
  }),
  (CombatMessageController.Ei_ = (e) => {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    o?.IsInit
      ? (o = o.Entity.GetComponent(240)) &&
        o.HandleSplineMoveNotify(e.Ii_, e.Ti_)
      : CombatLog_1.CombatLog.Warn(
          "Notify",
          void 0,
          "SplineMoveNotify实体不存在",
          ["id", e.F4n],
        );
  }),
  (CombatMessageController.pIt = new UE.VectorDouble()),
  (CombatMessageController.MIt = new UE.Rotator()),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("BFn", !0)],
    CombatMessageController,
    "EntityIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("p3n", !0)],
    CombatMessageController,
    "ActorIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("UFn", !1)],
    CombatMessageController,
    "EntityLoadCompleteNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("bFn", !1)],
    CombatMessageController,
    "PlayerRebackSceneNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("PFn", !0)],
    CombatMessageController,
    "MaterialNotify",
    null,
  ),
  (exports.CombatMessageController = CombatMessageController);
//# sourceMappingURL=CombatMessageController.js.map
