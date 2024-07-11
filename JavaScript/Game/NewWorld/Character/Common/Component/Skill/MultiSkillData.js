"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiSkillData = exports.MultiSkillInfo = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
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
    return t.CooldownConfig.SectionCount > 1;
  }
  CanStartMultiSkill(t) {
    const i = t.SkillId;
    const e = this.MultiSkillInfoMap.get(i);
    var t = t.SkillInfo.CooldownConfig;
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
              e.RemainingStartTime > 0 &&
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
      e.NextSkillId === 0
        ? this.RJo(e)
        : ((e.StartTime = t.StartTime),
          (e.RemainingStartTime = e.StartTime),
          (e.StopTime = t.StopTime),
          (e.RemainingStopTime = e.StopTime),
          this.MultiSkillInfoMap.set(e.NextSkillId, e),
          this.RJo(e)),
      !0
    );
  }
  OnTick(t) {
    const i = t * TimeUtil_1.TimeUtil.Millisecond;
    for (const e of this.MultiSkillInfos)
      e.NextSkillId !== 0 &&
        (e.RemainingStartTime > 0 &&
          ((e.RemainingStartTime -= i), e.RemainingStartTime <= 0) &&
          this.UJo(e),
        (e.RemainingStopTime -= i),
        e.RemainingStopTime <= 0) &&
        ((e.NextSkillId = 0), this.RJo(e));
  }
  ResetMultiSkills(t, i = !1) {
    const e = this.MultiSkillInfoMap.get(t);
    e &&
      (e.IsReset || i) &&
      e.NextSkillId &&
      e.CurSkillId === t &&
      ((e.NextSkillId = 0),
      (e.RemainingStartTime = 0),
      (e.RemainingStopTime = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "多段技能被打断", ["技能Id", t]),
      this.RJo(e));
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
        this.RJo(t));
  }
  ClearAllSkill() {
    for (const t of this.MultiSkillInfos)
      t.NextSkillId !== 0 &&
        ((t.NextSkillId = 0),
        (t.RemainingStartTime = 0),
        (t.RemainingStopTime = 0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "清理所有多段技能", [
            "vision",
            this.VisionEntityId,
          ]),
        this.RJo(t));
  }
  GetNextMultiSkillId(t) {
    const i = this.MultiSkillInfoMap.get(t);
    return i ? i.NextSkillId || i.FirstSkillId : t;
  }
  GetMultiSkillInfo(t) {
    return this.MultiSkillInfoMap.get(t);
  }
  RJo(t) {
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
  UJo(t) {
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
// # sourceMappingURL=MultiSkillData.js.map
