"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiSkillData = exports.MultiSkillInfo = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MultiSkillInfo {
  constructor() {
    (this.FirstSkillId = 0),
      (this.CurSkillId = 0),
      (this.NextSkillId = void 0),
      (this.StartTime = -0),
      (this.MultiSkillStartStamp = 0),
      (this.StopTime = -0),
      (this.MultiSkillStopStamp = 0),
      (this.IsReset = !1),
      (this.IsResetOnChangeRole = !1);
  }
  get RemainingStartTime() {
    return 0 === this.MultiSkillStartStamp
      ? 0
      : (this.MultiSkillStartStamp - Time_1.Time.FlowTime) *
          TimeUtil_1.TimeUtil.Millisecond;
  }
  get RemainingStopTime() {
    return 0 === this.MultiSkillStopStamp
      ? 0
      : (this.MultiSkillStopStamp - Time_1.Time.FlowTime) *
          TimeUtil_1.TimeUtil.Millisecond;
  }
}
exports.MultiSkillInfo = MultiSkillInfo;
class MultiSkillData {
  constructor() {
    (this.MultiSkillInfoMap = new Map()),
      (this.MultiSkillInfos = []),
      (this.EntityId = 0),
      (this.VisionEntityId = 0),
      (this.MultiSkillStartTimer = void 0),
      (this.MultiSkillStopTimer = void 0);
  }
  Init(t, i = 0) {
    (this.EntityId = t), (this.VisionEntityId = i);
  }
  IsMultiSkill(t) {
    return 1 < t.CooldownConfig.SectionCount;
  }
  CanStartMultiSkill(t) {
    var i = t.SkillId,
      e = this.MultiSkillInfoMap.get(i),
      t = t.SkillInfo.CooldownConfig;
    return e
      ? e.NextSkillId
        ? e.NextSkillId !== i
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "多段技能使用的不是下一段技能",
                ["传入技能Id", i],
                ["下一段技能Id", e.NextSkillId],
              ),
            !1)
          : !(
              0 < e.RemainingStartTime &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  17,
                  "多段技能还没到下一段技能可使用的时间",
                  ["技能Id", i],
                ),
              1)
            )
        : e.FirstSkillId === i ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              17,
              "多段技能必须从第一段技能开始",
              ["传入技能Id", i],
              ["第一段技能Id", e.FirstSkillId],
            ),
          !1)
      : t.SectionCount - t.SectionRemaining == 1 ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              17,
              "多段技能必须从第一段技能开始",
              ["传入技能Id", i],
              ["段数", t.SectionCount - t.SectionRemaining],
            ),
          !1);
  }
  StartMultiSkill(t, i = !0) {
    if (i && !this.CanStartMultiSkill(t)) return !1;
    i = t.SkillId;
    let e = this.MultiSkillInfoMap.get(i);
    t = t.SkillInfo.CooldownConfig;
    return (
      e ||
        (((e = new MultiSkillInfo()).FirstSkillId = i),
        this.MultiSkillInfoMap.set(i, e),
        this.MultiSkillInfos.push(e)),
      (e.CurSkillId = i),
      (e.NextSkillId = t.NextSkillId),
      (e.IsReset = t.IsReset),
      (e.IsResetOnChangeRole = t.IsResetOnChangeRole),
      0 === e.NextSkillId
        ? this.Tzo(e)
        : ((e.StartTime = t.StartTime),
          (e.MultiSkillStartStamp =
            Time_1.Time.FlowTime +
            t.StartTime * TimeUtil_1.TimeUtil.InverseMillisecond),
          (e.StopTime = t.StopTime),
          (e.MultiSkillStopStamp =
            Time_1.Time.FlowTime +
            t.StopTime * TimeUtil_1.TimeUtil.InverseMillisecond),
          this.MultiSkillInfoMap.set(e.NextSkillId, e),
          this.V5_(e),
          this.Tzo(e)),
      !0
    );
  }
  InitMultiSkillInfo(e) {
    for (var [s, l] of e) {
      l = l.SkillInfo;
      if (l && !l.CooldownConfig.SectionCount) {
        l = l.CooldownConfig;
        if (l.SectionCount - l.SectionRemaining == 1) {
          var r = new MultiSkillInfo();
          (r.FirstSkillId = s),
            this.MultiSkillInfoMap.set(s, r),
            this.MultiSkillInfos.push(r);
          let t = l.NextSkillId,
            i = l.SectionCount - 1;
          for (; 0 < i; ) {
            i--;
            var h = e.get(t);
            if (!h) break;
            if (
              (this.MultiSkillInfoMap.set(t, r),
              !(t = h?.SkillInfo?.CooldownConfig.NextSkillId ?? 0))
            )
              break;
          }
        }
      }
    }
  }
  V5_(t) {
    this.MultiSkillStartTimer &&
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStartTimer),
      this.MultiSkillStopTimer &&
        TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStopTimer),
      0 < t.StartTime &&
        (this.MultiSkillStartTimer = TimerSystem_1.FlowTimeTimerSystem.Delay(
          () => {
            (t.MultiSkillStartStamp = 0),
              this.Lzo(t),
              (this.MultiSkillStartTimer = void 0);
          },
          t.StartTime * TimeUtil_1.TimeUtil.InverseMillisecond,
        )),
      0 < t.StopTime &&
        (this.MultiSkillStopTimer = TimerSystem_1.FlowTimeTimerSystem.Delay(
          () => {
            (t.MultiSkillStopStamp = 0),
              (t.NextSkillId = 0),
              this.Tzo(t),
              (this.MultiSkillStopTimer = void 0);
          },
          t.StopTime * TimeUtil_1.TimeUtil.InverseMillisecond,
        ));
  }
  j5_(t, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        17,
        "提前结束多段技能",
        ["技能Id", t.CurSkillId],
        ["reason", i],
        ["entity", this.EntityId],
        ["vision", this.VisionEntityId],
      ),
      (t.NextSkillId = 0),
      (t.MultiSkillStartStamp = 0),
      (t.MultiSkillStopStamp = 0),
      this.Tzo(t),
      this.MultiSkillStartTimer &&
        (TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStartTimer),
        (this.MultiSkillStartTimer = void 0)),
      this.MultiSkillStopTimer &&
        (TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStopTimer),
        (this.MultiSkillStopTimer = void 0));
  }
  ResetMultiSkills(t, i = !1) {
    var e = this.MultiSkillInfoMap.get(t);
    e &&
      (e.IsReset || i) &&
      e.NextSkillId &&
      e.CurSkillId === t &&
      this.j5_(e, "多段技能被打断");
  }
  ResetOnChangeRole() {
    for (const t of this.MultiSkillInfos)
      t.IsResetOnChangeRole && this.j5_(t, "换人时清理所有多段技能");
  }
  ClearAllSkill() {
    for (const t of this.MultiSkillInfos)
      0 !== t.NextSkillId && this.j5_(t, "清理所有多段技能");
  }
  GetNextMultiSkillId(t) {
    var i = this.MultiSkillInfoMap.get(t);
    return i ? i.NextSkillId || i.FirstSkillId : t;
  }
  GetMultiSkillInfo(t) {
    return this.MultiSkillInfoMap.get(t);
  }
  Tzo(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        17,
        "多段技能Id变化",
        ["当前技能Id", t.CurSkillId],
        ["下一段技能Id", t.NextSkillId],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMultiSkillIdChanged,
        this.EntityId,
        t,
        this.VisionEntityId,
      );
  }
  Lzo(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        17,
        "多段技能可用",
        ["当前技能Id", t.CurSkillId],
        ["下一段技能Id", t.NextSkillId],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMultiSkillEnable,
        this.EntityId,
        t,
        this.VisionEntityId,
      );
  }
}
exports.MultiSkillData = MultiSkillData;
//# sourceMappingURL=MultiSkillData.js.map
