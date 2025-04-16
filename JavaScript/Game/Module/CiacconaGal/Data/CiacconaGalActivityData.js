"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalActivityData = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil");
class CiacconaGalActivityData {
  constructor(t) {
    (this.Lo = t),
      (this.Z3c = 0),
      (this.Dpi = void 0),
      (this.e4c = !1),
      (this.t4c = !1),
      (this.$dr = 0),
      (this.gE1 = 0),
      (this.CE1 = 0),
      (this.SXl = void 0);
  }
  get Id() {
    return this.Lo.Id;
  }
  get SlotIds() {
    return this.Lo.Slots;
  }
  get InspirationCount() {
    return this.Z3c;
  }
  get MaxInspirationCount() {
    return this.Lo.InspirationMaxValue;
  }
  get RefreshTime() {
    return this.Dpi?.low ?? 0;
  }
  get State2Unlock() {
    return this.e4c;
  }
  get State3Unlock() {
    return this.t4c;
  }
  get EndTime() {
    return this.$dr;
  }
  get RecommendQuestId() {
    return this.Lo.RecommendQuestId;
  }
  get RecommendQuestTipsTextId() {
    return this.Lo.RecommendQuestTips;
  }
  get RewardEndTime() {
    return this.gE1;
  }
  get RewardStartTime() {
    return this.CE1;
  }
  get IsInRewardTime() {
    return TimeUtil_1.TimeUtil.IsInTimeSpan(
      this.RewardStartTime,
      this.RewardEndTime,
    );
  }
  get RewardRemainTimeStr() {
    var t =
      this.RewardEndTime -
      TimeUtil_1.TimeUtil.GetServerTimeStamp() *
        TimeUtil_1.TimeUtil.Millisecond;
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t).CountDownText;
  }
  get State() {
    return this.State3Unlock ? 2 : this.State2Unlock ? 1 : 0;
  }
  get FinishedSubEndingCount() {
    let t = 0;
    if (this.SXl)
      for (const i of this.SXl.e3c) for (const e of i.a3c) e.a3_ && ++t;
    return t;
  }
  get TotalSubEndingCount() {
    let t = 1;
    if (this.SXl) for (const i of this.SXl.e3c) t += i.a3c.length;
    return t;
  }
  get RemainTimeToNextRefreshStr() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      t = Number(this.RefreshTime) - t * TimeUtil_1.TimeUtil.Millisecond;
    return (
      t < TimeUtil_1.TimeUtil.Hour
        ? TimeUtil_1.TimeUtil.GetRemainTimeDataFormat4(t)
        : TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t)
    ).CountDownText;
  }
  UpdateByServerData(t) {
    (this.SXl = t),
      this.UpdateInspirationData(t.r3c),
      (this.e4c = t.o3c),
      (this.t4c = t.n3c),
      (this.CE1 = Number(MathUtils_1.MathUtils.LongToBigInt(t._M_))),
      (this.gE1 = Number(MathUtils_1.MathUtils.LongToBigInt(t.cM_)));
  }
  UpdateInspirationData(t) {
    t && ((this.Z3c = t.f3c), (this.Dpi = t.eb_));
  }
  UpdateState(t) {
    (this.e4c = t.o3c), (this.t4c = t.n3c);
  }
  UpdateEndTime(t) {
    this.$dr = t;
  }
}
exports.CiacconaGalActivityData = CiacconaGalActivityData;
//# sourceMappingURL=CiacconaGalActivityData.js.map
