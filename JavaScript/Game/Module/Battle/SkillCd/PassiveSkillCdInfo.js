"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PassiveSkillCdInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimeUtil_1 = require("../../../Common/TimeUtil");
class PassiveSkillCdInfo {
  constructor() {
    (this.SkillId = 0),
      (this.SkillCd = -0),
      (this.Threshold = 0),
      (this.IsShareAllCdSkill = !1),
      (this.EntityIds = new Set()),
      (this.CurMaxCd = 0),
      (this.SkillCdFinishStamp = 0);
  }
  get CurRemainingCd() {
    return 0 === this.SkillCdFinishStamp
      ? 0
      : (this.SkillCdFinishStamp - Time_1.Time.FlowTime) *
          TimeUtil_1.TimeUtil.Millisecond;
  }
  IsInCd() {
    return this.CurRemainingCd > Math.max(this.Threshold, 0);
  }
  StartCd(i, t = -1) {
    if (this.IsInCd()) return !1;
    let s = t;
    return (
      (s = -1 === s ? this.SkillCd : s) <= 0 ||
        ((this.CurMaxCd = s),
        (t =
          Time_1.Time.FlowTime > this.SkillCdFinishStamp
            ? Time_1.Time.FlowTime
            : this.SkillCdFinishStamp),
        (this.SkillCdFinishStamp =
          t + s * TimeUtil_1.TimeUtil.InverseMillisecond),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "被动技能CD开始",
            ["skillId", this.SkillId],
            ["cd", s],
          )),
      !0
    );
  }
  ResetAllCd() {
    (this.SkillCdFinishStamp = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "重置被动技能CD", [
          "skillId",
          this.SkillId,
        ]);
  }
  ModifyRemainingCd(i, t) {
    this.IsInCd() &&
      ((i = this.CurRemainingCd + i + this.CurMaxCd * t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "被动技能CD修改剩余CD",
          ["skillId", this.SkillId],
          ["cd", i],
        ),
      i <= 0
        ? (this.SkillCdFinishStamp = 0)
        : ((t =
            this.SkillCdFinishStamp -
            this.CurMaxCd * TimeUtil_1.TimeUtil.InverseMillisecond),
          (this.SkillCdFinishStamp = t + i)));
  }
}
exports.PassiveSkillCdInfo = PassiveSkillCdInfo;
//# sourceMappingURL=PassiveSkillCdInfo.js.map
