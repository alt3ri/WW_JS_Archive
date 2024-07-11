"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  CombatMessageController_1 = require("./CombatMessageController"),
  BUFFER_TIME_RATE = 1.05,
  TIME_BUFFER_SIZE = 20,
  TIME_OFFSET_LERP_RATE = 0.1,
  FIX_BUFFER_TIME = 0.08,
  TIME_BUFFER_CHECK_COUNT_MIN = 5,
  TIME_BUFFER_CHECK_TIME_MAX = 3,
  MAX_FLUCTUATE = 0.5,
  MESSAGE_ID_MASK = (1n << MathUtils_1.intBit) - 1n;
class CombatMessageBuffer {
  constructor(e) {
    (this.CreatureDataId = e),
      (this.TimelineOffsetBase = 0),
      (this.DesiredBuffer = 0),
      (this.Buffer = 0),
      (this.LastNotifyExecuteTime = 0),
      (this.yIt = new Queue_1.Queue());
  }
  get TimelineOffset() {
    return this.TimelineOffsetBase + this.Buffer;
  }
  get RemainBufferTime() {
    return this.LastNotifyExecuteTime - Time_1.Time.NowSeconds;
  }
  Push(e, t, o, s) {
    var i,
      r,
      a = t?.GetComponent(45);
    a
      ? e
        ? (i = o.V8n)
          ? ((r = t?.GetComponent(0)),
            this.RecordMessageTime(i, r.GetPbDataId()),
            (r = i + this.TimelineOffset),
            a.Push(e, o, s, r))
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "MultiplayerCombat",
                15,
                "[CombatMessageModel.Push]失败, messageTime非法",
                ["CreatureDataId", this.CreatureDataId],
                ["id", e],
                ["messageTime", i],
              ),
            CombatMessageController_1.CombatMessageController.Process(
              e,
              t,
              s,
              o,
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "[CombatMessageModel.Push]失败, id非法",
            ["CreatureDataId", this.CreatureDataId],
            ["id", e],
          )
      : CombatMessageController_1.CombatMessageController.Process(e, t, s, o);
  }
  RecordMessageTime(e, t, o = !1) {
    var s = Time_1.Time.NowSeconds,
      i =
        (o ||
          (this.yIt.Push([e, s]),
          this.yIt.Size >= TIME_BUFFER_SIZE && this.yIt.Pop()),
        this.IIt(),
        e + this.TimelineOffset);
    i > this.LastNotifyExecuteTime && (this.LastNotifyExecuteTime = i),
      this.ReportMoveDataReceiveInfo(s - e, t, o);
  }
  IIt() {
    if (0 !== this.yIt.Size) {
      let e = this.yIt.Size - 1;
      var i = this.yIt.Get(e);
      let t = i[1] - i[0],
        o = t;
      var r = i[0];
      let s = 0;
      for (; 0 < e; e--) {
        s++;
        var [a, _] = this.yIt.Get(e);
        if (
          s > TIME_BUFFER_CHECK_TIME_MAX &&
          r - a > TIME_BUFFER_CHECK_COUNT_MIN
        )
          break;
        _ = _ - a;
        t > _ ? (t = _) : o < _ && (o = _);
      }
      (i = o - t), (i = MathUtils_1.MathUtils.Clamp(i, i, MAX_FLUCTUATE));
      (this.TimelineOffsetBase = t),
        ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode
          ? (this.DesiredBuffer =
              i * BUFFER_TIME_RATE +
              ModelManager_1.ModelManager.CombatMessageModel
                .MoveSyncUdpSendInterval)
          : (this.DesiredBuffer = i * BUFFER_TIME_RATE + FIX_BUFFER_TIME),
        this.TIt(0);
    }
  }
  TIt(e = 0) {
    this.DesiredBuffer < this.Buffer
      ? (this.Buffer = Math.max(this.DesiredBuffer, this.Buffer - e))
      : this.RemainBufferTime > e
        ? (this.Buffer = Math.min(this.DesiredBuffer, this.Buffer + e))
        : (this.Buffer = this.DesiredBuffer);
  }
  OnTick(e) {
    this.TIt(e * TIME_OFFSET_LERP_RATE);
  }
  ReportMoveDataReceiveInfo(e, t, o) {
    (t = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataId,
      pb_data_id: t,
      offset: e,
      timeline_offset: this.TimelineOffsetBase,
      buffer: this.Buffer,
      desired_buffer: this.DesiredBuffer,
      remain_buffer: this.RemainBufferTime,
      udp_message: o,
    }),
      (e = JSON.stringify(t));
    CombatDebugController_1.CombatDebugController.DataReport(
      "MOVE_SYNC_RECEIVE_INFO",
      e,
    );
  }
}
class CombatMessageModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.MoveSyncUdpMode = !0),
      (this.MoveSyncUdpSendInterval = 0.03),
      (this.MoveSyncUdpFullSampling = !1),
      (this.CombatMessageSendPackMode = !0),
      (this.CombatMessageSendInterval = 0.04),
      (this.CombatMessageSendIntervalMulti = 0.03),
      (this.CombatMessageSendPendingTime = 0),
      (this.LIt = 0),
      (this.CombatMessageBufferMap = new Map()),
      (this.CombatMessageBufferMapByEntity = new Map()),
      (this.NeedPushMove = !1),
      (this.MoveSyncSet = new Set()),
      (this.AnyEntityInFight = !1),
      (this.AnyHateChange = !1),
      (this.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.Zzn.create()),
      (this.DIt = new Map());
  }
  OnLeaveLevel() {
    return !(this.AnyEntityInFight = !1);
  }
  OnChangeMode() {
    return !(this.AnyEntityInFight = !1);
  }
  AddMoveSync(e) {
    return !this.MoveSyncSet.has(e) && (this.MoveSyncSet.add(e), !0);
  }
  DeleteMoveSync(e) {
    return !!this.MoveSyncSet.delete(e);
  }
  GenMessageId() {
    var e = BigInt(ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
    return BigInt(++this.LIt) | (e << MathUtils_1.intBit);
  }
  SetLastMessageId(e) {
    var t = Number(e & MESSAGE_ID_MASK),
      o = Number((e & ~MESSAGE_ID_MASK) >> MathUtils_1.intBit);
    o !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CombatInfo",
            51,
            "服务器设置的ContextId与当前PlayerId不一致",
            ["value", e],
            ["playerIdFromValue", o],
            [
              "playerId",
              ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
            ],
          ),
        (this.LIt = 0))
      : (this.LIt = t);
  }
  GetMessageBuffer(t) {
    if (0 !== t) {
      let e = this.CombatMessageBufferMap.get(t);
      return (
        e ||
          ((e = new CombatMessageBuffer(t)),
          this.CombatMessageBufferMap.set(t, e)),
        e
      );
    }
  }
  GetMessageBufferByEntityId(e) {
    return this.CombatMessageBufferMapByEntity.get(e);
  }
  SetEntityMap(e, t) {
    t = this.CombatMessageBufferMap.get(t);
    this.CombatMessageBufferMapByEntity.set(e, t);
  }
  CreateMontageContext(e, t) {
    var o = this.GenMessageId(),
      s = Protocol_1.Aki.Protocol.CombatMessage.xFs.create();
    return (
      (s.Z8n = Protocol_1.Aki.Protocol.Z8n.create({
        X4n: e,
        eVn: t,
        tVn: MathUtils_1.MathUtils.BigIntToLong(o),
      })),
      this.SetCombatContext(o, s),
      o
    );
  }
  SetCombatContext(e, t) {
    e && this.DIt.set(e, t);
  }
  RemoveCombatContext(e) {
    this.DIt.delete(e);
  }
  GetCombatContext(e) {
    if (e) return this.DIt.get(e);
  }
  DebugCombatContext(e) {
    var t, o, s;
    e
      ? (t = this.DIt.get(e))
        ? t.OLs
          ? ((o = t.OLs.fTs),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                51,
                "Buff Context",
                ["BuffId", o],
                ["ContextId", t.OLs.tVn],
              ))
          : t.kLs
            ? ((o = t.kLs.iVn),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  51,
                  "Bullet Context",
                  ["BulletId", o?.rVn],
                  ["PlayerId", o?.q5n],
                  ["ContextId", t.kLs.tVn],
                ))
            : t.Z8n
              ? ((o = t.Z8n.X4n),
                (s = t.Z8n.eVn),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    51,
                    "Montage Context",
                    ["SkillId", o],
                    ["MontageId", s],
                    ["ContextId", t.Z8n.tVn],
                  ))
              : t.GLs
                ? ((o = t.GLs.X4n),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      51,
                      "Skill Context",
                      ["SkillId", o],
                      ["ContextId", t.GLs.tVn],
                    ))
                : t.qLs
                  ? ((s = t.qLs.k4n),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Battle",
                        51,
                        "FSM Context",
                        ["FsmId", s],
                        ["ContextId", void 0],
                      ))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Battle", 51, "Error Context Type")
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 51, "Cannot Find Corresponding Context", [
            "ContextId",
            e,
          ])
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 51, "Context Id Invalid!");
  }
}
exports.CombatMessageModel = CombatMessageModel;
//# sourceMappingURL=CombatMessageModel.js.map
