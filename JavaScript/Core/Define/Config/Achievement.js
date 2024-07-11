"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Achievement = void 0);
class Achievement {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get Level() {
    return this.level();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get IconPath() {
    return this.iconpath();
  }
  get OverrideDropId() {
    return this.overridedropid();
  }
  get Hidden() {
    return this.hidden();
  }
  get NextLink() {
    return this.nextlink();
  }
  get ClientTrigger() {
    return this.clienttrigger();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsAchievement(t, i) {
    return (i || new Achievement()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  groupid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  level() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  desc(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  iconpath(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  overridedropid() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hidden() {
    const t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  nextlink() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : -1;
  }
  clienttrigger() {
    const t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.Achievement = Achievement;
// # sourceMappingURL=Achievement.js.map
