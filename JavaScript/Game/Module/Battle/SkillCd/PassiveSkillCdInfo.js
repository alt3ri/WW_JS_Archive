"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PassiveSkillCdInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimeUtil_1 = require("../../../Common/TimeUtil");
class PassiveSkillCdInfo {
  constructor() {
    (this.SkillId = 0n),
      (this.SkillCd = -0),
      (this.IsShareAllCdSkill = !1),
      (this.EntityIds = new Set()),
      (this.CurMaxCd = 0),
      (this.CurRemainingCd = 0);
  }
  IsInCd() {
    var i =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "PassiveSkillCdThreshold",
      ) ?? 0;
    return this.CurRemainingCd > i;
  }
  StartCd(i, t = -1) {
    if (this.IsInCd()) return !1;
    let s = t;
    return (
      (s = -1 === s ? this.SkillCd : s) <= 0 ||
        ((this.CurMaxCd = s),
        (this.CurRemainingCd =
          this.CurRemainingCd <= 0 ? s : s + this.CurRemainingCd),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "被动技能CD开始",
            ["skillId", this.SkillId],
            ["cd", s],
          )),
      !0
    );
  }
  Tick(i) {
    this.CurRemainingCd <= 0 ||
      ((i = i * TimeUtil_1.TimeUtil.Millisecond) < this.CurRemainingCd
        ? (this.CurRemainingCd -= i)
        : ((this.CurRemainingCd = 0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 18, "被动技能CD结束", [
              "skillId",
              this.SkillId,
            ])));
  }
  ResetAllCd() {
    (this.CurRemainingCd = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "重置被动技能CD", [
          "skillId",
          this.SkillId,
        ]);
  }
  ModifyRemainingCd(i, t) {
    this.IsInCd() &&
      ((this.CurRemainingCd = this.CurRemainingCd + i + this.CurMaxCd * t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          18,
          "被动技能CD修改剩余CD",
          ["skillId", this.SkillId],
          ["cd", this.CurRemainingCd],
        ),
      this.CurRemainingCd <= 0) &&
      (this.CurRemainingCd = 0);
  }
}
exports.PassiveSkillCdInfo = PassiveSkillCdInfo;
//# sourceMappingURL=PassiveSkillCdInfo.js.map
