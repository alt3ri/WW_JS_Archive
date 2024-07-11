"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.instanceLockColor =
    exports.INSTANCE_LOCK =
    exports.InstanceDetectionDynamicData =
    exports.InstanceDungeonData =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class InstanceDungeonData {
  constructor(t) {
    (this.Sai = 0), (this.yai = 0), (this.Iai = 0), (this.Sai = t);
    t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(
      this.Sai,
    );
    (this.yai = t?.EnterCount ?? 0), (this.Tai = t.EnterCountConsumeType);
  }
  get ChallengedTimes() {
    return this.Iai;
  }
  set ChallengedTimes(t) {
    void 0 !== t && (this.Iai = t);
  }
  get CostType() {
    return this.Tai;
  }
  get LimitChallengedTimes() {
    return this.yai;
  }
  get LeftChallengedTimes() {
    var t = this.LimitChallengedTimes - this.Iai;
    return 0 <= t ? t : 0;
  }
  get CanRepeatChallenge() {
    return this.LimitChallengedTimes <= 0;
  }
  get CanChallenge() {
    return (
      !!this.CanRepeatChallenge ||
      1 === this.Tai ||
      2 === this.Tai ||
      this.ChallengedTimes < this.LimitChallengedTimes
    );
  }
  get CanReward() {
    return (
      !!this.CanRepeatChallenge ||
      0 === this.Tai ||
      3 === this.Tai ||
      (1 === this.Tai
        ? this.ChallengedTimes <= this.LimitChallengedTimes
        : this.ChallengedTimes < this.LimitChallengedTimes)
    );
  }
}
exports.InstanceDungeonData = InstanceDungeonData;
class InstanceDetectionDynamicData {
  constructor() {
    (this.IsSelect = !1),
      (this.IsOnlyOneGrid = !1),
      (this.IsShow = !0),
      (this.InstanceSeriesTitle = 0),
      (this.InstanceGirdId = 0);
  }
}
(exports.InstanceDetectionDynamicData = InstanceDetectionDynamicData),
  (exports.INSTANCE_LOCK = "ADADAD"),
  (exports.instanceLockColor = UE.Color.FromHex(exports.INSTANCE_LOCK));
//# sourceMappingURL=InstanceDungeonData.js.map
