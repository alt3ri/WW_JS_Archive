"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoSkillEffect = void 0);
class DangoSkillEffect {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TrigggerPerformance() {
    return this.trigggerperformance();
  }
  get TrigggerTiming() {
    return this.trigggertiming();
  }
  get ShowTime() {
    return this.showtime();
  }
  get ParamNum() {
    return this.paramnum();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDangoSkillEffect(t, i) {
    return (i || new DangoSkillEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  trigggerperformance() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  trigggertiming() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  showtime() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  paramnum() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DangoSkillEffect = DangoSkillEffect;
//# sourceMappingURL=DangoSkillEffect.js.map
