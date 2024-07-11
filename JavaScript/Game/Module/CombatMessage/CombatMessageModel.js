"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const CombatMessageController_1 = require("./CombatMessageController");
const BUFFER_TIME_RATE = 1.05;
const TIME_BUFFER_SIZE = 20;
const TIME_OFFSET_LERP_RATE = 0.1;
const FIX_BUFFER_TIME = 0.08;
const TIME_BUFFER_CHECK_COUNT_MIN = 5;
const TIME_BUFFER_CHECK_TIME_MAX = 3;
const MAX_FLUCTUATE = 0.5;
const MESSAGE_ID_MASK = (1n << MathUtils_1.intBit) - 1n;
class CombatMessageBuffer {
  constructor(e) {
    (this.CreatureDataId = e),
      (this.TimelineOffsetBase = 0),
      (this.DesiredBuffer = 0),
      (this.Buffer = 0),
      (this.LastNotifyExecuteTime = 0),
      (this.cyt = new Queue_1.Queue());
  }
  get TimelineOffset() {
    return this.TimelineOffsetBase + this.Buffer;
  }
  get RemainBufferTime() {
    return this.LastNotifyExecuteTime - Time_1.Time.NowSeconds;
  }
  Push(e, t, o, s) {
    let i;
    let r;
    const a = t?.GetComponent(44);
    a
      ? e
        ? (i = o.h4n)
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
    const s = Time_1.Time.NowSeconds;
    const i =
      (o ||
        (this.cyt.Push([e, s]),
        this.cyt.Size >= TIME_BUFFER_SIZE && this.cyt.Pop()),
      this.myt(),
      e + this.TimelineOffset);
    i > this.LastNotifyExecuteTime && (this.LastNotifyExecuteTime = i),
      this.ReportMoveDataReceiveInfo(s - e, t, o);
  }
  myt() {
    if (this.cyt.Size !== 0) {
      let e = this.cyt.Size - 1;
      let i = this.cyt.Get(e);
      let t = i[1] - i[0];
      let o = t;
      const r = i[0];
      let s = 0;
      for (; e > 0; e--) {
        s++;
        let [a, _] = this.cyt.Get(e);
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
        this.dyt(0);
    }
  }
  dyt(e = 0) {
    this.DesiredBuffer < this.Buffer
      ? (this.Buffer = Math.max(this.DesiredBuffer, this.Buffer - e))
      : this.RemainBufferTime > e
        ? (this.Buffer = Math.min(this.DesiredBuffer, this.Buffer + e))
        : (this.Buffer = this.DesiredBuffer);
  }
  OnTick(e) {
    this.dyt(e * TIME_OFFSET_LERP_RATE);
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
      (this.Cyt = 0),
      (this.CombatMessageBufferMap = new Map()),
      (this.CombatMessageBufferMapByEntity = new Map()),
      (this.NeedPushMove = !1),
      (this.MoveSyncSet = new Set()),
      (this.AnyEntityInFight = !1),
      (this.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.nXn.create()),
      (this.gyt = new Map());
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
    const e = BigInt(ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
    return BigInt(++this.Cyt) | (e << MathUtils_1.intBit);
  }
  SetLastMessageId(e) {
    const t = Number(e & MESSAGE_ID_MASK);
    const o = Number((e & ~MESSAGE_ID_MASK) >> MathUtils_1.intBit);
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
        (this.Cyt = 0))
      : (this.Cyt = t);
  }
  GetMessageBuffer(t) {
    if (t !== 0) {
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
    const o = this.GenMessageId();
    const s = Protocol_1.Aki.Protocol.CombatMessage.HGs.create();
    return (
      (s.v4n = Protocol_1.Aki.Protocol.v4n.create({
        vkn: e,
        M4n: t,
        S4n: MathUtils_1.MathUtils.BigIntToLong(o),
      })),
      this.SetCombatContext(o, s),
      o
    );
  }
  SetCombatContext(e, t) {
    e && this.gyt.set(e, t);
  }
  RemoveCombatContext(e) {
    this.gyt.delete(e);
  }
  GetCombatContext(e) {
    if (e) return this.gyt.get(e);
  }
  DebugCombatContext(e) {
    let t, o, s;
    e
      ? (t = this.gyt.get(e))
        ? t.pEs
          ? ((o = t.pEs.zMs),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                51,
                "Buff Context",
                ["BuffId", o],
                ["ContextId", t.pEs.S4n],
              ))
          : t.MEs
            ? ((o = t.MEs.E4n),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  51,
                  "Bullet Context",
                  ["BulletId", o?.y4n],
                  ["PlayerId", o?.aFn],
                  ["ContextId", t.MEs.S4n],
                ))
            : t.v4n
              ? ((o = t.v4n.vkn),
                (s = t.v4n.M4n),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    51,
                    "Montage Context",
                    ["SkillId", o],
                    ["MontageId", s],
                    ["ContextId", t.v4n.S4n],
                  ))
              : t.vEs
                ? ((o = t.vEs.vkn),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      51,
                      "Skill Context",
                      ["SkillId", o],
                      ["ContextId", t.vEs.S4n],
                    ))
                : t.fEs
                  ? ((s = t.fEs.ukn),
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
// # sourceMappingURL=CombatMessageModel.js.map
