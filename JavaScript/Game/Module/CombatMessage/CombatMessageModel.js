"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatMessageModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  CombatMessageController_1 = require("./CombatMessageController"),
  BUFFER_TIME_RATE = 1.05,
  TIME_BUFFER_SIZE = 20,
  TIME_OFFSET_LERP_RATE = 0.1,
  FIX_BUFFER_TIME = 0.08,
  TIME_BUFFER_CHECK_COUNT_MIN = 5,
  TIME_BUFFER_CHECK_TIME_MAX = 3,
  MAX_FLUCTUATE = 0.5,
  RECORD_UDP_MESSAGE_INTERNAL = 0.2,
  MESSAGE_ID_MASK = 60n;
class CombatMessageBuffer {
  constructor(e) {
    (this.CreatureDataId = e),
      (this.TimelineOffsetBase = 0),
      (this.DesiredBuffer = 0),
      (this.Buffer = 0),
      (this.LastNotifyExecuteTime = 0),
      (this.lwl = 0),
      (this.yIt = new Queue_1.Queue());
  }
  get TimelineOffset() {
    return this.TimelineOffsetBase + this.Buffer;
  }
  get RemainBufferTime() {
    return this.LastNotifyExecuteTime - Time_1.Time.NowSeconds;
  }
  AddToQueue(e, t, s, i) {
    var r, o, a;
    t
      ? (r = t?.GetComponent(52))
        ? e
          ? (o = s.J8n)
            ? ((a = t?.GetComponent(0)),
              this.RecordMessageTime(o, a.GetPbDataId()),
              (a = o + this.TimelineOffset),
              r.AddToQueue(e, s, i, a))
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "MultiplayerCombat",
                  14,
                  "[CombatMessageModel.Push]失败, messageTime非法",
                  ["CreatureDataId", this.CreatureDataId],
                  ["id", e],
                  ["messageTime", o],
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
              14,
              "[CombatMessageModel.Push]失败, id非法",
              ["CreatureDataId", this.CreatureDataId],
              ["id", e],
            )
        : CombatMessageController_1.CombatMessageController.Process(e, t, i, s)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          19,
          "[CombatMessageModel.Push]失败, entity非法",
          ["CreatureDataId", this.CreatureDataId],
          ["id", e],
        );
  }
  RecordMessageTime(e, t, s = !1) {
    var i = Time_1.Time.NowSeconds,
      r =
        ((!s || i - this.lwl > RECORD_UDP_MESSAGE_INTERNAL) &&
          (this.yIt.Push([e, i]),
          this.yIt.Size >= TIME_BUFFER_SIZE && this.yIt.Pop(),
          (this.lwl = i)),
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
      var o = r[0];
      let i = 0;
      for (; 0 < e; e--) {
        i++;
        var [a, h] = this.yIt.Get(e);
        if (
          i > TIME_BUFFER_CHECK_TIME_MAX &&
          o - a > TIME_BUFFER_CHECK_COUNT_MIN
        )
          break;
        h = h - a;
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
const COUNT_CONTEXT_REMOVE_DELAY = 500;
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
      (this.zoh = 1),
      (this.LIt = 0n),
      (this.CombatMessageBufferMap = new Map()),
      (this.CombatMessageBufferMapByEntity = new Map()),
      (this.NeedPushMove = !1),
      (this.MoveSyncSet = new Set()),
      (this.AnyEntityInFight = !1),
      (this.AnyHateChange = !1),
      (this.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.sZn.create()),
      (this.Gul = !1),
      (this.go_ = new Map()),
      (this.po_ = new Map()),
      (this.fo_ = new Map()),
      (this.vo_ = new Map()),
      (this.SkillDirtySet = new Set()),
      (this.yo_ = new Map()),
      (this.So_ = new Map());
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
  SetCombatMessageSwitch(e) {
    this.Gul = e;
  }
  GenMessageId() {
    var e = ++this.LIt | (BigInt(this.zoh) << MESSAGE_ID_MASK);
    return (
      this.Gul &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("CombatInfo", 35, "[GenMessageId]Debug", [
          "messageId",
          e,
        ]),
      e
    );
  }
  SetLastPrefix(e) {
    this.zoh = e;
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
  TryClearSkillCount(e) {
    0 === (this.go_.get(e) ?? 0) &&
      (this.go_.delete(e), this.po_.delete(e), this.fo_.delete(e));
  }
  AddSkillRefCount(e) {
    var t;
    e &&
      0 < e &&
      ((t = this.go_.get(e) ?? 0), this.go_.set(e, t + 1), 0 === t) &&
      (this.po_.set(e, 0), this.fo_.set(e, 0));
  }
  RemoveSkillRefCount(e) {
    var t;
    e &&
      0 < e &&
      void 0 !== (t = this.go_.get(e)) &&
      (this.go_.set(e, --t), t <= 0) &&
      this.SkillDirtySet.add(e);
  }
  OnBulletAdded(e, t, s) {
    this.AddSkillRefCount(e), t && 0 < t && this.vo_.set(t, 0);
  }
  OnBulletRemoved(e, t) {
    this.RemoveSkillRefCount(e),
      t &&
        0 < t &&
        TimerSystem_1.TimerSystem.Delay(() => {
          this.vo_.delete(t);
        }, COUNT_CONTEXT_REMOVE_DELAY);
  }
  AddSkillHitCount(e) {
    if (e && !(e <= 0)) {
      var t = this.po_.get(e);
      if (void 0 !== t) return this.po_.set(e, t + 1), t + 1;
      CombatLog_1.CombatLog.Warn("Message", void 0, "技能命中计数器不存在", [
        "skillContextId",
        e,
      ]);
    }
  }
  AddSkillDamageCount(e) {
    if (e && !(e <= 0)) {
      var t = this.fo_.get(e);
      if (void 0 !== t) return this.fo_.set(e, t + 1), t + 1;
      CombatLog_1.CombatLog.Warn("Message", void 0, "技能伤害计数器不存在", [
        "skillContextId",
        e,
      ]);
    }
  }
  AddBulletDamageCount(e) {
    if (e && !(e <= 0)) {
      var t = this.vo_.get(e);
      if (void 0 !== t) return this.vo_.set(e, t + 1), t + 1;
      CombatLog_1.CombatLog.Warn("Message", void 0, "子弹命中计数器不存在", [
        "bulletContextId",
        e,
      ]);
    }
  }
}
exports.CombatMessageModel = CombatMessageModel;
//# sourceMappingURL=CombatMessageModel.js.map
