"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTrialInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class RoleTrialInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get RoleStand2() {
    return this.rolestand2();
  }
  get RoleIcon() {
    return this.roleicon();
  }
  get UiConfigId() {
    return this.uiconfigid();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  get InstanceText() {
    return this.instancetext();
  }
  get Introduction() {
    return this.introduction();
  }
  get InstanceId() {
    return this.instanceid();
  }
  get RewardItem() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.rewarditemLength(),
      this.rewarditemKey,
      this.rewarditemValue,
      this,
    );
  }
  rewarditemKey(t) {
    return this.rewarditem(t)?.key();
  }
  rewarditemValue(t) {
    return this.rewarditem(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleTrialInfo(t, i) {
    return (i || new RoleTrialInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  rolestand2(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  roleicon(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  uiconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instancetext(t) {
    var i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetRewarditemAt(t, i) {
    return this.rewarditem(t);
  }
  rewarditem(t, i) {
    var r = this.J7.__offset(this.z7, 22);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  rewarditemLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RoleTrialInfo = RoleTrialInfo;
//# sourceMappingURL=RoleTrialInfo.js.map
