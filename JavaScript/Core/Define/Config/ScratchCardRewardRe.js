"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchCardRewardRe = void 0);
const IntPair_1 = require("./SubType/IntPair");
class ScratchCardRewardRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoundId() {
    return this.roundid();
  }
  get IsSpecial() {
    return this.isspecial();
  }
  get RewardItem() {
    return this.rewarditem();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsScratchCardRewardRe(t, r) {
    return (r || new ScratchCardRewardRe()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roundid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  isspecial() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  rewarditem(t) {
    var r = this.J7.__offset(this.z7, 10);
    return r
      ? (t || new IntPair_1.IntPair()).__init(
          this.J7.__indirect(this.z7 + r),
          this.J7,
        )
      : null;
  }
}
exports.ScratchCardRewardRe = ScratchCardRewardRe;
//# sourceMappingURL=ScratchCardRewardRe.js.map
