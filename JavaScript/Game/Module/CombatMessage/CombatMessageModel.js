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
  MESSAGE_ID_MASK = 60n;
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
  Push(e, t, s, i) {
    var r,
      a,
      o = t?.GetComponent(46);
    o
      ? e
        ? (r = s.J8n)
          ? ((a = t?.GetComponent(0)),
            this.RecordMessageTime(r, a.GetPbDataId()),
            (a = r + this.TimelineOffset),
            o.Push(e, s, i, a))
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "MultiplayerCombat",
                15,
                "[CombatMessageModel.Push]失败, messageTime非法",
                ["CreatureDataId", this.CreatureDataId],
                ["id", e],
                ["messageTime", r],
              ),
            CombatMessageController_1.CombatMessageController.Process(
              e,
              t,
              i,
              s,
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
            "[CombatMessageModel.Push]失败, id非法",
            ["CreatureDataId", this.CreatureDataId],
            ["id", e],
          )
      : CombatMessageController_1.CombatMessageController.Process(e, t, i, s);
  }
  RecordMessageTime(e, t, s = !1) {
    var i = Time_1.Time.NowSeconds,
      r =
        (s ||
          (this.yIt.Push([e, i]),
          this.yIt.Size >= TIME_BUFFER_SIZE && this.yIt.Pop()),
        this.IIt(),
        e + this.TimelineOffset);
    r > this.LastNotifyExecuteTime && (this.LastNotifyExecuteTime = r),
      this.ReportMoveDataReceiveInfo(i - e, t, s);
  }
  IIt() {
    if (0 !== this.yIt.Size) {
      let e = this.yIt.Size - 1;
      var r = this.yIt.Get(e);
      let t = r[1] - r[0],
        s = t;
      var a = r[0];
      let i = 0;
      for (; 0 < e; e--) {
        i++;
        var [o, h] = this.yIt.Get(e);
        if (
          i > TIME_BUFFER_CHECK_TIME_MAX &&
          a - o > TIME_BUFFER_CHECK_COUNT_MIN
        )
          break;
        h = h - o;
        t > h ? (t = h) : s < h && (s = h);
      }
      (r = s - t), (r = MathUtils_1.MathUtils.Clamp(r, r, MAX_FLUCTUATE));
      (this.TimelineOffsetBase = t),
        ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode
          ? (this.DesiredBuffer =
              r * BUFFER_TIME_RATE +
              ModelManager_1.ModelManager.CombatMessageModel
                .MoveSyncUdpSendInterval)
          : (this.DesiredBuffer = r * BUFFER_TIME_RATE + FIX_BUFFER_TIME),
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
  ReportMoveDataReceiveInfo(e, t, s) {
    (t = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataId,
      pb_data_id: t,
      offset: e,
      timeline_offset: this.TimelineOffsetBase,
      buffer: this.Buffer,
      desired_buffer: this.DesiredBuffer,
      remain_buffer: this.RemainBufferTime,
      udp_message: s,
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
      (this.EJa = 1),
      (this.LIt = 0n),
      (this.CombatMessageBufferMap = new Map()),
      (this.CombatMessageBufferMapByEntity = new Map()),
      (this.NeedPushMove = !1),
      (this.MoveSyncSet = new Set()),
      (this.AnyEntityInFight = !1),
      (this.AnyHateChange = !1),
      (this.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.sZn.create());
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
    return ++this.LIt | (BigInt(this.EJa) << MESSAGE_ID_MASK);
  }
  SetLastPrefix(e) {
    this.EJa = e;
  }
  SetLastMessageId(e) {
    this.LIt = e;
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
}
exports.CombatMessageModel = CombatMessageModel;
//# sourceMappingURL=CombatMessageModel.js.map
