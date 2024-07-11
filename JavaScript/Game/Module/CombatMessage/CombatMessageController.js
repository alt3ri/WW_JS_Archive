"use strict";
let _a;
const __decorate =
  (this && this.__decorate) ||
  function (e, o, t, r) {
    let a;
    const s = arguments.length;
    let l =
      s < 3 ? o : r === null ? (r = Object.getOwnPropertyDescriptor(o, t)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      l = Reflect.decorate(e, o, t, r);
    else
      for (let i = e.length - 1; i >= 0; i--)
        (a = e[i]) && (l = (s < 3 ? a(l) : s > 3 ? a(o, t, l) : a(o, t)) || l);
    return s > 3 && l && Object.defineProperty(o, t, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageController = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StatDefine_1 = require("../../Common/StatDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const CombatMessage_1 = require("./CombatMessage");
const notifyMessageCacheSet = new Set([
  NetDefine_1.ECombatNotifyDataMessage.HOn,
  NetDefine_1.ECombatNotifyDataMessage.VOn,
  NetDefine_1.ECombatNotifyDataMessage.jOn,
  NetDefine_1.ECombatNotifyDataMessage.YOn,
  NetDefine_1.ECombatNotifyDataMessage.$On,
  NetDefine_1.ECombatNotifyDataMessage.XOn,
]);
const MAX_AI_INFO_COUNT = 100;
class CombatMessageController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CombatMessageModel;
  }
  static OnInit() {
    Net_1.Net.Register(28028, CombatMessageController.VEt),
      Net_1.Net.Register(3991, CombatMessageController.HEt),
      Net_1.Net.Register(6482, CombatMessageController.jEt),
      Net_1.Net.Register(4976, CombatMessageController.WEt),
      Net_1.Net.Register(19531, CombatMessageController.KEt),
      Net_1.Net.Register(
        17300,
        CombatMessageController.PreAiControlSwitchNotify,
      ),
      Net_1.Net.Register(14957, this.QEt);
    for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
      this.Register(e, this.XEt(e, CombatMessage_1.CombatNet.SyncNotifyMap));
    return !0;
  }
  static OnClear() {
    Net_1.Net.UnRegister(28028),
      Net_1.Net.UnRegister(3991),
      Net_1.Net.UnRegister(6482),
      Net_1.Net.UnRegister(4976),
      Net_1.Net.UnRegister(19531),
      Net_1.Net.UnRegister(17300),
      Net_1.Net.UnRegister(14957);
    for (const e of CombatMessage_1.CombatNet.SyncNotifyMap.keys())
      this.UnRegister(e);
    return !0;
  }
  static XEt(t, r) {
    return (e, o) => {
      r.get(t)?.(e, o);
    };
  }
  static $Et(e) {
    let o = this.YEt.get(e);
    return o || ((o = void 0), this.YEt.set(e, o)), o;
  }
  static JEt(e, o) {
    const t = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    const a = NetDefine_1.ECombatNotifyDataMessage[o.$Gs];
    if (!r || r.IsInit || notifyMessageCacheSet.has(a)) {
      CombatDebugController_1.CombatDebugController.CombatInfoMessage(
        "Notify",
        o.$Gs,
        e,
      );
      r = r?.Entity;
      if (CombatMessage_1.CombatNet.SyncNotifyMap.has(a)) {
        const t = MathUtils_1.MathUtils.LongToNumber(e.a4n);
        let s;
        const l = CombatMessageController.Model?.GetMessageBuffer(t);
        l && ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ((s = CombatMessage_1.CombatNet.PreNotifyMap.get(a)) &&
              !s(r, o[o.$Gs], e)) ||
            l.Push(a, r, o.r4n, o[o.$Gs])
          : CombatMessage_1.CombatNet.SyncNotifyMap.get(a)?.(r, o[o.$Gs], e);
      } else
        CombatMessage_1.CombatNet.NotifyMap.has(a)
          ? CombatMessage_1.CombatNet.NotifyMap.get(a)?.(r, o[o.$Gs], e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              20,
              "Unexpected combat notify message type",
              ["MessageKey", o.$Gs],
              ["MessageId", a],
            );
    } else
      CombatDebugController_1.CombatDebugController.CombatWarn(
        "Notify",
        t,
        "协议丢弃，实体未加载完成",
        ["Message", o.$Gs],
        ["CombatCommon", e],
      );
  }
  static zEt(e, o) {
    const t = CombatMessage_1.CombatNet.RequestMap;
    const r = o.i4n;
    if (t.has(r)) {
      const a = t.get(r);
      const s = o[o.$Gs];
      if ((t.delete(r), s))
        try {
          a?.(s);
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "CombatInfo",
                15,
                "战斗协议执行response异常",
                e,
                ["response", o.$Gs],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CombatInfo",
                15,
                "战斗协议执行response异常",
                ["response", o.$Gs],
                ["stack", e],
              );
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "MultiplayerCombat",
            20,
            "unexpected null combat response",
            ["messageType", o.$Gs],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          20,
          "unexpected response RPC id from server",
          ["messageType", o.$Gs],
        );
  }
  static Register(a, s) {
    return (
      Net_1.Net.Register(a, (e) => {
        let o;
        let t;
        const r = e;
        r
          ? r.CombatCommon
            ? ((o = MathUtils_1.MathUtils.LongToNumber(r.CombatCommon.rkn)),
              (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity),
              ModelManager_1.ModelManager.GameModeModel.IsMulti
                ? (this.IsDebugMessageLog &&
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "MultiplayerCombat",
                      15,
                      "[CombatMessageController.ReceiveNotify]",
                      ["id", a],
                      ["MessageId", r.CombatCommon.s4n],
                      ["Originator", r.CombatCommon.a4n],
                      ["TimeStamp", r.CombatCommon.h4n],
                    ),
                  CombatMessageController.Model.GetMessageBuffer(o)?.Push(
                    a,
                    t,
                    r.CombatCommon,
                    e,
                  ))
                : s(t, e))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "MultiplayerCombat",
                15,
                "[CombatMessageController.ReceiveNotify]协议字段CombatCommon为空",
                ["id", a],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              15,
              "[CombatMessageController.ReceiveNotify]战斗消息必须包含CombatCommon属性",
              ["id", a],
            );
      }),
      this.sX.has(a)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiplayerCombat",
              15,
              "[CombatMessageController.Register]战斗网络消息重复注册",
              ["id", a],
            ),
          !1)
        : (this.sX.set(a, (e, o) => {
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
  static Process(e, o, t, r) {
    const a = CombatMessage_1.CombatNet.SyncNotifyMap.get(e);
    a ? a(o, t, r) : this.sX.get(e)?.(o, t);
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
    this.ZEt.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "CombatInfo",
          15,
          "[CombatMessageController.RegisterAfterTick] 当前Comp已经注册过AfterTick",
          ["Comp", e.toString()],
        )
      : this.ZEt.set(e, o);
  }
  static UnregisterAfterTick(e) {
    this.ZEt.has(e)
      ? this.ZEt.delete(e)
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
      let o;
      let t;
      const r = e * MathUtils_1.MathUtils.MillisecondToSecond;
      for (const a of this.Model.CombatMessageBufferMap.values()) a.OnTick(r);
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
      for (const [o, t] of this.ZEt)
        try {
          o.Entity?.Valid &&
            ((o.Entity.Active || this.tyt.has(o.Entity)) &&
            (t(e), o.Entity.Active)
              ? this.tyt.add(o.Entity)
              : this.tyt.delete(o.Entity));
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
        Time_1.Time.NowSeconds > this.iyt + this.oyt ||
        BlackboardController_1.BlackboardController.PendingBlackboardParams
          .size > 0
      ) {
        let e = !1;
        for (const m of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
          [])
          if (m.IsInit) {
            e || ((r = m.Entity.GetComponent(158)), (e = r?.IsInFightState()));
            var r = Protocol_1.Aki.Protocol.Ai.mNn.create();
            var a = m.Entity.GetComponent(1);
            if (
              a &&
              a.CreatureData.GetEntityType() ===
                Protocol_1.Aki.Protocol.HBs.Proto_Monster
            ) {
              var s;
              var l;
              const i = Protocol_1.Aki.Protocol.Ai.h2s.create();
              var a = a.CreatureData.GetCreatureDataId();
              for ([s, l] of m.Entity.GetComponent(
                38,
              ).AiController.AiHateList.GetHatredMap()) {
                const C = Protocol_1.Aki.Protocol.Ai.n2s.create();
                (C.rkn = MathUtils_1.MathUtils.NumberToLong(
                  ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
                    s,
                  ),
                )),
                  (C._4n = l.HatredValue),
                  i.efs.push(C);
              }
              const n =
                BlackboardController_1.BlackboardController.PendingBlackboardParams.get(
                  a,
                );
              n && (i.u4n = [...n.values()]),
                i.u4n.length > MAX_AI_INFO_COUNT &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "MultiplayerCombat",
                    20,
                    "黑板数据过大",
                    ["CreatureData", a],
                    ["AiBlackboards", i.u4n.length],
                  ),
                i.tfs.length > MAX_AI_INFO_COUNT &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "MultiplayerCombat",
                    20,
                    "黑板CD数据过大",
                    ["CreatureData", a],
                    ["AiBlackboardCd", i.tfs.length],
                  ),
                i.efs.length > MAX_AI_INFO_COUNT &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "MultiplayerCombat",
                    20,
                    "仇恨数据过大",
                    ["CreatureData", a],
                    ["HateList", i.efs.length],
                  ),
                (r.c4n = i),
                CombatMessage_1.CombatNet.Call(12325, a, r, () => {});
            }
          }
        (this.Model.AnyEntityInFight = e),
          BlackboardController_1.BlackboardController.PendingBlackboardParams.clear(),
          (this.iyt = Time_1.Time.NowSeconds);
      }
      if (
        (!ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode ||
          !ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
        ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove
      ) {
        const _ = Protocol_1.Aki.Protocol.Xhs.create();
        for (const b of ModelManager_1.ModelManager.CombatMessageModel
          .MoveSyncSet) {
          const g = b.CollectPendingMoveInfos();
          g && _.Mys.push(g);
        }
        _.Mys.length > 0 && Net_1.Net.Send(29494, _),
          (ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = !1);
      }
      const M = this.Model.MessagePack;
      if (M.Kkn.length > 0) {
        for (const c of M.Kkn)
          c.Qkn &&
            CombatDebugController_1.CombatDebugController.CombatContextInfoMessage(
              "Request",
              c.Qkn.$Gs,
              c.Qkn,
            );
        Net_1.Net.Call(27030, M, (e) => {
          e.yEs && this.QEt(e.yEs);
        }),
          (this.Model.MessagePack =
            Protocol_1.Aki.Protocol.CombatMessage.nXn.create());
      }
    }
  }
  static nyt(e) {
    const o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    const r = MathUtils_1.MathUtils.LongToNumber(e.a4n);
    if (
      (CombatMessageController.IsDebugMessageLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MultiplayerCombat",
          15,
          "[CombatMessageController.ReceiveNotify]",
          ["Originator", r],
        ),
      t)
    )
      if (e.m4n.length <= 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
            ["Originator", r],
          );
      else {
        const a = e.m4n[0].h4n;
        if (t.Entity.Active) {
          let s;
          var l = CombatMessageController.Model.GetMessageBuffer(r);
          l &&
            ((s = t.Entity.GetComponent(0)),
            CombatMessageController.Model.SetEntityMap(t.Id, r),
            l.RecordMessageTime(a, s.GetPbDataId(), !0));
          const i = t.Entity.GetComponent(57);
          i
            ? i.ReceiveMoveInfos(e.m4n, Number(r), a)
            : CombatDebugController_1.CombatDebugController.CombatWarn(
                "Move",
                t.Entity,
                "entity不存在组件CharacterMovementSyncComponent",
                ["creatureDataId", o],
              );
        } else {
          if (!t.IsInit) return;
          const i = t.Entity.GetComponent(57);
          l = e.m4n[e.m4n.length - 1];
          CombatMessageController.syt(l.$kn, CombatMessageController.ayt),
            CombatMessageController.hyt(l.D3n, CombatMessageController.lyt),
            t.Entity.GetComponent(3)?.SetActorLocationAndRotation(
              CombatMessageController.ayt,
              CombatMessageController.lyt,
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
        ? (CombatDebugController_1.CombatDebugController.CombatInfo(
            "Actor",
            e,
            "Entity通知设置显隐",
            ["v", o.d4n],
          ),
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
            e,
            o.d4n,
            "CombatMessageController.EntityIsVisibleNotify",
          ))
        : e.GetComponent(0)?.SetVisible(o.d4n));
  }
  static ActorIsVisibleNotify(e, o) {
    e &&
      (CombatDebugController_1.CombatDebugController.CombatInfo(
        "Actor",
        e,
        "Actor通知设置显隐",
        ["v", o.C4n],
      ),
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        e,
        o.C4n,
        o.C4n,
        o.C4n,
        "ActorIsVisibleNotify",
      ));
  }
  static _yt(e) {
    const o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    let t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    t
      ? (t = t.Entity.GetComponent(38))
        ? t.OnSyncAiInformation(e)
        : CombatDebugController_1.CombatDebugController.CombatWarn(
            "Ai",
            o,
            "OnSyncAiInformation 不存在CharacterAiComponent",
          )
      : CombatDebugController_1.CombatDebugController.CombatWarn(
          "Ai",
          o,
          "OnSyncAiInformation 不存在实体",
        );
  }
  static EntityLoadCompleteNotify(e, o) {
    const t = o.aFn;
    for (const a of o.sfs) {
      var r = MathUtils_1.MathUtils.LongToNumber(a);
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
      r && r.Entity.GetComponent(38)?.SetLoadCompletePlayer(t);
    }
  }
  static PlayerRebackSceneNotify(e, o) {
    (o = MathUtils_1.MathUtils.LongToNumber(o.mIs)),
      (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o));
    o && o.Entity.GetComponent(57).ClearReplaySamples();
  }
  static MaterialNotify(e, o) {
    if (o.f4n.g4n.length <= 0 || o.f4n.g4n === "None")
      CombatDebugController_1.CombatDebugController.CombatWarn(
        "Material",
        e,
        "材质同步失败，参数非法",
      );
    else {
      const t = e?.GetComponent(2)?.Actor;
      t
        ? o.f4n.p4n
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              o.f4n.g4n,
              UE.PD_CharacterControllerDataGroup_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerDataGroup(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
                      "data.MaterialInfo.AssetName",
                      o.f4n.g4n,
                    ]);
              },
            )
          : ResourceSystem_1.ResourceSystem.LoadAsync(
              o.f4n.g4n,
              UE.PD_CharacterControllerData_C,
              (e) => {
                e
                  ? t.CharRenderingComponent.AddMaterialControllerData(e)
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
                      "data!.MaterialInfo.AssetName",
                      o.f4n.g4n,
                    ]);
              },
            )
        : CombatDebugController_1.CombatDebugController.CombatWarn(
            "Material",
            e,
            "材质同步失败，Actor为空",
          );
    }
  }
  static syt(e, o) {
    (o.X = e.X), (o.Y = e.Y), (o.Z = e.Z);
  }
  static hyt(e, o) {
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
  (CombatMessageController.uyt = void 0),
  (CombatMessageController.YEt = new Map()),
  (CombatMessageController.QEt = (e) => {
    for (const r of e.Kkn) {
      var o;
      var t = r.$Gs;
      var t = r[t];
      r.SEs
        ? ((o = r.SEs), _a.$Et(o.$Gs), _a.JEt(t.r4n, o))
        : r.EEs && ((o = r.EEs), _a.$Et(o.$Gs), _a.zEt(t.r4n, o));
    }
  }),
  (CombatMessageController.iyt = 0),
  (CombatMessageController.oyt = 1),
  (CombatMessageController.eyt = void 0),
  (CombatMessageController.ryt = void 0),
  (CombatMessageController.Y7 = new Map()),
  (CombatMessageController.ZEt = new Map()),
  (CombatMessageController.tyt = new Set()),
  (CombatMessageController.VEt = (e) => {
    let o;
    let t;
    let r;
    const a = MathUtils_1.MathUtils.LongToNumber(e.rkn);
    const s = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
    s
      ? s.IsInit &&
        ((o = WorldGlobal_1.WorldGlobal.ToUeVector(e.rIs)),
        (t =
          CharacterController_1.CharacterController.GetActorComponent(
            s,
          )).SetActorLocation(o, "CombatMessageController.位置重置", !1),
        e.oIs &&
          ((r = WorldGlobal_1.WorldGlobal.ToUeRotator(e.D3n)),
          t.SetActorRotation(r, "CombatMessageController.位置重置")),
        s.Entity.GetComponent(161)?.SetForceSpeed(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        (t = s.Entity.GetComponent(57))
          ? t.ClearReplaySamples()
          : (r = s.Entity.GetComponent(57)) && r?.ClearReplaySamples(),
        e.nIs) &&
        ((t = s.Entity.GetComponent(0)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "ResetLocationForZRangeNotify 重置出生点",
            ["CreatureDataId", t.GetCreatureDataId()],
            ["PbDataId", t.GetPbDataId()],
            ["EntityId", s.Entity.Id],
          ),
        t.SetInitLocation(o),
        (r = s.Entity.GetComponent(3))?.SetInitLocation(o),
        r?.FixBornLocation("重置出生点.修正角色地面位置", !0, void 0, !1))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          15,
          "[CombatMessageController.ResetLocationForZRangeNotify] 不存在实体。",
          ["CreatureData", a],
        );
  }),
  (CombatMessageController.HEt = (e) => {
    for (const o of e.Mys) _a.nyt(o);
  }),
  (CombatMessageController.jEt = (e) => {
    for (const o of e.Mys) _a.nyt(o);
  }),
  (CombatMessageController.WEt = (e) => {
    var o = MathUtils_1.MathUtils.LongToNumber(e.r4n.rkn);
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    if (o)
      if (e.m4n.length <= 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "[CombatMessageController.MoveInfosHandle], MoveInfos 是空的",
            ["MessageId", e.r4n.s4n],
            ["Originator", e.r4n.a4n],
            ["TimeStamp", e.r4n.h4n],
          );
      else if (o.Entity.Active) {
        let t = MathUtils_1.MathUtils.LongToNumber(e.r4n.a4n);
        var r = CombatMessageController.Model.GetMessageBuffer(t);
        r &&
          ((a = o.Entity.GetComponent(0)),
          CombatMessageController.Model.SetEntityMap(o.Id, t),
          r.RecordMessageTime(e.r4n.h4n, a.GetPbDataId(), !0));
        const s =
          CharacterController_1.CharacterController.GetActorComponent(o);
        s.CreatureData.GetEntityType() ===
          Protocol_1.Aki.Protocol.HBs.Proto_SceneItem &&
          (t = o.Entity.GetComponent(142)) &&
          t.ReceiveMoveInfos(e.m4n, e.r4n);
      } else {
        if (!o.IsInit) return;
        var r = o.Entity.GetComponent(57);
        var a = e.m4n[e.m4n.length - 1];
        CombatMessageController.syt(a.$kn, CombatMessageController.ayt),
          CombatMessageController.hyt(a.D3n, CombatMessageController.lyt);
        const s = o.Entity.GetComponent(3);
        s?.SetActorLocationAndRotation(
          CombatMessageController.ayt,
          CombatMessageController.lyt,
          "MoveSceneItemNotify",
          !1,
        ),
          void r?.ClearReplaySamples();
      }
  }),
  (CombatMessageController.KEt = (e) => {
    for (const o of e.nfs) CombatMessageController._yt(o);
  }),
  (CombatMessageController.PreAiControlSwitchNotify = (e) => {
    for (const r of e.sfs) {
      const o = MathUtils_1.MathUtils.LongToNumber(r);
      let t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
      t
        ? (t = t.Entity.GetComponent(38)) && t.AiController.PreSwitchControl()
        : CombatDebugController_1.CombatDebugController.CombatWarn(
            "Ai",
            o,
            "PreAiControlSwitchNotify 不存在实体",
            ["id", o],
          );
    }
  }),
  (CombatMessageController.ayt = new UE.Vector()),
  (CombatMessageController.lyt = new UE.Rotator()),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("XOn")],
    CombatMessageController,
    "EntityIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("w2n")],
    CombatMessageController,
    "ActorIsVisibleNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("WOn")],
    CombatMessageController,
    "EntityLoadCompleteNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Handle("JOn")],
    CombatMessageController,
    "PlayerRebackSceneNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("$On")],
    CombatMessageController,
    "MaterialNotify",
    null,
  ),
  (exports.CombatMessageController = CombatMessageController);
// # sourceMappingURL=CombatMessageController.js.map
