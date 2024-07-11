"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiSkillData = exports.MultiSkillInfo = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MultiSkillInfo {
  constructor() {
    (this.FirstSkillId = 0),
      (this.CurSkillId = 0),
      (this.NextSkillId = void 0),
      (this.StartTime = -0),
      (this.RemainingStartTime = -0),
      (this.StopTime = -0),
      (this.RemainingStopTime = -0),
      (this.IsReset = !1),
      (this.IsResetOnChangeRole = !1);
  }
}
exports.MultiSkillInfo = MultiSkillInfo;
class MultiSkillData {
  constructor() {
    (this.MultiSkillInfoMap = new Map()),
      (this.MultiSkillInfos = []),
      (this.EntityId = 0),
      (this.VisionEntityId = 0);
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
                18,
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
                  18,
                  "多段技能还没到下一段技能可使用的时间",
                  ["技能Id", i],
                ),
              1)
            )
        : e.FirstSkillId === i ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              18,
              "多段技能必须从第一段技能开始",
              ["传入技能Id", i],
              ["第一段技能Id", e.FirstSkillId],
            ),
          !1)
      : t.SectionCount - t.SectionRemaining == 1 ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              18,
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
          (e.RemainingStartTime = e.StartTime),
          (e.StopTime = t.StopTime),
          (e.RemainingStopTime = e.StopTime),
          this.MultiSkillInfoMap.set(e.NextSkillId, e),
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
          var o = new MultiSkillInfo();
          (o.FirstSkillId = s),
            this.MultiSkillInfoMap.set(s, o),
            this.MultiSkillInfos.push(o);
          let t = l.NextSkillId,
            i = l.SectionCount - 1;
          for (; 0 < i; ) {
            i--;
            var n = e.get(t);
            if (!n) break;
            if (
              (this.MultiSkillInfoMap.set(t, o),
              !(t = n?.SkillInfo?.CooldownConfig.NextSkillId ?? 0))
            )
              break;
          }
        }
      }
    }
  }
  OnTick(t) {
    var i = t * TimeUtil_1.TimeUtil.Millisecond;
    for (const e of this.MultiSkillInfos)
      0 !== e.NextSkillId &&
        (0 < e.RemainingStartTime &&
          ((e.RemainingStartTime -= i), e.RemainingStartTime <= 0) &&
          this.Lzo(e),
        (e.RemainingStopTime -= i),
        e.RemainingStopTime <= 0) &&
        ((e.NextSkillId = 0), this.Tzo(e));
  }
  ResetMultiSkills(t, i = !1) {
    var e = this.MultiSkillInfoMap.get(t);
    e &&
      (e.IsReset || i) &&
      e.NextSkillId &&
      e.CurSkillId === t &&
      ((e.NextSkillId = 0),
      (e.RemainingStartTime = 0),
      (e.RemainingStopTime = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "多段技能被打断", ["技能Id", t]),
      this.Tzo(e));
  }
  ResetOnChangeRole() {
    for (const t of this.MultiSkillInfos)
      t.IsResetOnChangeRole &&
        ((t.NextSkillId = 0),
        (t.RemainingStartTime = 0),
        (t.RemainingStopTime = 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "换人时清理所有多段技能", [
            "vision",
            t.FirstSkillId,
          ]),
        this.Tzo(t));
  }
  ClearAllSkill() {
    for (const t of this.MultiSkillInfos)
      0 !== t.NextSkillId &&
        ((t.NextSkillId = 0),
        (t.RemainingStartTime = 0),
        (t.RemainingStopTime = 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "清理所有多段技能", [
            "vision",
            this.VisionEntityId,
          ]),
        this.Tzo(t));
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
        18,
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
        18,
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
