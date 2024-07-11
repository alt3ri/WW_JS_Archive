"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupSkillCdInfo = exports.SkillCdInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const DEFAULT_PROPORTTION_VALUE = 1e4;
class SkillCdInfo {
  constructor() {
    (this.SkillId = 0),
      (this.SkillCd = -0),
      (this.CdDelay = -0),
      (this.IsShareAllCdSkill = !1);
  }
}
exports.SkillCdInfo = SkillCdInfo;
class GroupSkillCdInfo {
  constructor() {
    (this.GroupId = 0),
      (this.MaxCount = 0),
      (this.LimitCount = 0),
      (this.RemainingCount = 0),
      (this.SkillCdInfoMap = new Map()),
      (this.EntityIds = new Set()),
      (this.SkillIdQueue = new Queue_1.Queue()),
      (this.CdQueue = new Queue_1.Queue()),
      (this.CurMaxCd = 0),
      (this.CurRemainingCd = 0),
      (this.CurSkillId = 0),
      (this.CurRemainingDelayCd = -0),
      (this.CurDelaySkillId = 0),
      (this.CurDelaySkillCd = 0);
  }
  IsInCd() {
    return this.CurRemainingCd > 0;
  }
  HasRemainingCount() {
    return this.RemainingCount > 0;
  }
  IsInDelay() {
    return this.CurRemainingDelayCd > 0;
  }
  StartCd(t, i, s = -1) {
    const e = this.SkillCdInfoMap.get(t);
    if (!e) return !1;
    if (this.RemainingCount <= 0) return !1;
    let h = s;
    return (
      h === -1 &&
        ((s =
          i.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_CdReduse) /
          DEFAULT_PROPORTTION_VALUE),
        (h = e.SkillCd * s)),
      this.IsInDelay()
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "技能CD延迟期间，不能再用一次技能，必须先打断前一次技能",
              ["skillId", t],
            ),
          !1)
        : ((i = e.CdDelay) > 0
            ? ((this.CurRemainingDelayCd = i),
              (this.CurDelaySkillId = t),
              (this.CurDelaySkillCd = h),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 18, "技能CD开始延迟CD", [
                  "skillId",
                  t,
                ]))
            : h <= 0 ||
              (this.IsInCd()
                ? (this.CdQueue.Push(h), this.SkillIdQueue.Push(t))
                : ((this.CurMaxCd = h),
                  (this.CurRemainingCd = h),
                  (this.CurSkillId = t)),
              this.RemainingCount--,
              this.jWe()),
          !0)
    );
  }
  Tick(t) {
    var t = t * TimeUtil_1.TimeUtil.Millisecond;
    const i = this.RemainingCount;
    let s = this.WWe(t);
    let e = i !== this.RemainingCount;
    (t = this.KWe(t)),
      (e = e || i !== this.RemainingCount),
      (s = Math.min(s, t));
    s > 0 && (this.WWe(s), (e = e || i !== this.RemainingCount)),
      e && this.jWe();
  }
  WWe(t) {
    if (!this.IsInCd()) return t;
    let i = t;
    for (; i > 0; ) {
      if (i < this.CurRemainingCd) return (this.CurRemainingCd -= i), 0;
      if (
        ((i -= this.CurRemainingCd),
        (this.CurRemainingCd = 0),
        this.RemainingCount++,
        this.RemainingCount > this.LimitCount &&
          ((this.RemainingCount = this.LimitCount), Log_1.Log.CheckError()) &&
          Log_1.Log.Error("Battle", 18, "技能CD结束，可用次数已达上限"),
        this.CdQueue.Size <= 0)
      )
        return i;
      (this.CurRemainingCd = this.CdQueue.Pop()),
        (this.CurSkillId = this.SkillIdQueue.Pop());
    }
    return 0;
  }
  KWe(t) {
    if (this.IsInDelay())
      if (t < this.CurRemainingDelayCd) this.CurRemainingDelayCd -= t;
      else if (
        ((t -= this.CurRemainingCd),
        (this.CurRemainingDelayCd = 0),
        this.RemainingCount <= 0)
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "技能CD延迟计时结束时，可用次数为0，不能进入CD",
          );
      else {
        const i = this.CurDelaySkillId;
        const s = this.CurDelaySkillCd;
        if (!this.IsInCd())
          return (
            (this.CurMaxCd = s),
            (this.CurRemainingCd = s),
            this.RemainingCount--,
            t
          );
        this.CdQueue.Push(s), this.SkillIdQueue.Push(i), this.RemainingCount--;
      }
    return 0;
  }
  SetLimitCount(t) {
    t = t || this.MaxCount;
    (this.LimitCount = t), this.ResetAllCd();
  }
  ResetAllCd() {
    (this.CurRemainingCd = 0),
      (this.CurRemainingDelayCd = 0),
      (this.RemainingCount = this.LimitCount),
      this.jWe();
  }
  ResetDelayCd() {
    return !(this.CurRemainingDelayCd <= 0 || (this.CurRemainingDelayCd = 0));
  }
  ModifyRemainingCd(t, i) {
    this.IsInCd() &&
      ((this.CurRemainingCd = this.CurRemainingCd + t + this.CurMaxCd * i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          18,
          "技能CD修改剩余CD",
          ["skillId", this.CurSkillId],
          ["cd", this.CurRemainingCd],
        ),
      this.CurRemainingCd <= 0
        ? ((this.CurRemainingCd = 0),
          this.RemainingCount++,
          this.RemainingCount > this.LimitCount
            ? ((this.RemainingCount = this.LimitCount),
              this.CdQueue.Clear(),
              this.SkillIdQueue.Clear(),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Battle", 18, "技能CD结束，可用次数已达上限"))
            : (this.CdQueue.Size > 0 &&
                ((this.CurRemainingCd = this.CdQueue.Pop()),
                (this.CurSkillId = this.SkillIdQueue.Pop())),
              this.jWe()))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharSkillRemainCdChanged,
            this,
          ));
  }
  jWe() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        18,
        "技能CD可用次数改变",
        ["skillId", this.CurSkillId],
        ["count", this.RemainingCount],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharSkillCountChanged,
        this,
      );
  }
  CheckConfigValid() {}
}
exports.GroupSkillCdInfo = GroupSkillCdInfo;
// # sourceMappingURL=GroupSkillCdInfo.js.map
