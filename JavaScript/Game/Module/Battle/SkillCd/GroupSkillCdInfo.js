"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupSkillCdInfo = exports.SkillCdInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  DEFAULT_PROPORTTION_VALUE = 1e4;
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
      (this.CurDelaySkillCd = 0),
      (this.$zo = void 0),
      (this.CdTags = []),
      (this.Uqn = []);
  }
  IsInCd() {
    return 0 < this.CurRemainingCd;
  }
  HasRemainingCount() {
    return 0 < this.RemainingCount;
  }
  IsInDelay() {
    return 0 < this.CurRemainingDelayCd;
  }
  StartCd(t, i, s, h, e) {
    this.$zo = s;
    s = this.SkillCdInfoMap.get(t);
    return (
      !!s &&
      !(
        this.RemainingCount <= 0 ||
        ((i =
          i.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Proto_CdReduse) /
          DEFAULT_PROPORTTION_VALUE),
        (h = h.CalcExtraEffectCd(s.SkillCd, t, e) * i),
        this.IsInDelay()
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                18,
                "技能CD延迟期间，不能再用一次技能，必须先打断前一次技能",
                ["skillId", t],
              ),
            1)
          : (0 < (e = s.CdDelay)
              ? ((this.CurRemainingDelayCd = e),
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
                this.OnCountChanged()),
            0))
      )
    );
  }
  Tick(t) {
    var t = t * TimeUtil_1.TimeUtil.Millisecond,
      i = this.RemainingCount,
      s = this.oQe(t);
    let h = i !== this.RemainingCount;
    (t = this.rQe(t)),
      (h = h || i !== this.RemainingCount),
      (s = Math.min(s, t));
    0 < s && (this.oQe(s), (h = h || i !== this.RemainingCount)),
      h && this.OnCountChanged();
  }
  oQe(t) {
    if (!this.IsInCd()) return t;
    let i = t;
    for (; 0 < i; ) {
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
  rQe(t) {
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
        var i = this.CurDelaySkillId,
          s = this.CurDelaySkillCd;
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
      this.OnCountChanged();
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
            : (0 < this.CdQueue.Size &&
                ((this.CurRemainingCd = this.CdQueue.Pop()),
                (this.CurSkillId = this.SkillIdQueue.Pop())),
              this.OnCountChanged()))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharSkillRemainCdChanged,
            this,
          ));
  }
  OnCountChanged() {
    var t;
    this.RemainingCount <= 0
      ? ((t = this.$zo.AddTagWithReturnHandle(this.CdTags)), this.Uqn.push(t))
      : (this.Uqn.forEach((t) => {
          this.$zo.RemoveBuffByHandle(t, -1, "技能CD结束移除");
        }),
        (this.Uqn.length = 0)),
      this.iQe();
  }
  iQe() {
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
//# sourceMappingURL=GroupSkillCdInfo.js.map
