"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterPropertyGrowth = void 0);
class MonsterPropertyGrowth {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get LifeMaxRatio() {
    return this.lifemaxratio();
  }
  get AtkRatio() {
    return this.atkratio();
  }
  get DefRatio() {
    return this.defratio();
  }
  get HardnessMaxRatio() {
    return this.hardnessmaxratio();
  }
  get HardnessRatio() {
    return this.hardnessratio();
  }
  get HardnessRecoverRatio() {
    return this.hardnessrecoverratio();
  }
  get RageMaxRatio() {
    return this.ragemaxratio();
  }
  get RageRatio() {
    return this.rageratio();
  }
  get RageRecoverRatio() {
    return this.ragerecoverratio();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsMonsterPropertyGrowth(t, r) {
    return (r || new MonsterPropertyGrowth()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  lifemaxratio() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  atkratio() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  defratio() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hardnessmaxratio() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hardnessratio() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hardnessrecoverratio() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  ragemaxratio() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rageratio() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  ragerecoverratio() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.MonsterPropertyGrowth = MonsterPropertyGrowth;
// # sourceMappingURL=MonsterPropertyGrowth.js.map
