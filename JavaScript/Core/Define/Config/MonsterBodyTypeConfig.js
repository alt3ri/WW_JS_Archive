"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterBodyTypeConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterBodyTypeConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get HandBookCameraId() {
    return this.handbookcameraid();
  }
  get MoveForwardDistance() {
    return this.moveforwarddistance();
  }
  get MoveForwardDuration() {
    return this.moveforwardduration();
  }
  get MoveForwardCurvePath() {
    return this.moveforwardcurvepath();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsMonsterBodyTypeConfig(t, r) {
    return (r || new MonsterBodyTypeConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  handbookcameraid(t) {
    var r = this.J7.__offset(this.z7, 6),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
  moveforwarddistance() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  moveforwardduration() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  moveforwardcurvepath(t) {
    var r = this.J7.__offset(this.z7, 12),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
}
exports.MonsterBodyTypeConfig = MonsterBodyTypeConfig;
//# sourceMappingURL=MonsterBodyTypeConfig.js.map
