"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuffDesc = void 0);
class BossRushBuffDesc {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SoundAreaInfoConfigId() {
    return this.soundareainfoconfigid();
  }
  __init(s, t) {
    return (this.z7 = s), (this.J7 = t), this;
  }
  static getRootAsBossRushBuffDesc(s, t) {
    return (t || new BossRushBuffDesc()).__init(
      s.readInt32(s.position()) + s.position(),
      s,
    );
  }
  id() {
    var s = this.J7.__offset(this.z7, 4);
    return s ? this.J7.readInt32(this.z7 + s) : 0;
  }
  soundareainfoconfigid() {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.z7 + s) : 0;
  }
}
exports.BossRushBuffDesc = BossRushBuffDesc;
//# sourceMappingURL=BossRushBuffDesc.js.map
