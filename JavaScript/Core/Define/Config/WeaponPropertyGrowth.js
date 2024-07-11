"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponPropertyGrowth = void 0);
class WeaponPropertyGrowth {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get CurveId() {
    return this.curveid();
  }
  get Level() {
    return this.level();
  }
  get BreachLevel() {
    return this.breachlevel();
  }
  get CurveValue() {
    return this.curvevalue();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsWeaponPropertyGrowth(t, r) {
    return (r || new WeaponPropertyGrowth()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  curveid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  breachlevel() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  curvevalue() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.WeaponPropertyGrowth = WeaponPropertyGrowth;
// # sourceMappingURL=WeaponPropertyGrowth.js.map
