"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsBulletPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class RacingBetsBulletPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Threshold() {
    return this.threshold();
  }
  get BulletPool() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.bulletpoolLength(),
      this.bulletpoolKey,
      this.bulletpoolValue,
      this,
    );
  }
  bulletpoolKey(t) {
    return this.bulletpool(t)?.key();
  }
  bulletpoolValue(t) {
    return this.bulletpool(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRacingBetsBulletPool(t, i) {
    return (i || new RacingBetsBulletPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  threshold() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBulletpoolAt(t, i) {
    return this.bulletpool(t);
  }
  bulletpool(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    return e
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  bulletpoolLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RacingBetsBulletPool = RacingBetsBulletPool;
//# sourceMappingURL=RacingBetsBulletPool.js.map
