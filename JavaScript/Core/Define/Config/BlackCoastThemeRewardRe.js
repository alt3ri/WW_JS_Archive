"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackCoastThemeRewardRe = void 0);
class BlackCoastThemeRewardRe {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get ItemId() {
    return this.itemid();
  }
  get Active() {
    return this.active();
  }
  get DropId() {
    return this.dropid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsBlackCoastThemeRewardRe(t, e) {
    return (e || new BlackCoastThemeRewardRe()).__init(
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
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  active() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BlackCoastThemeRewardRe = BlackCoastThemeRewardRe;
//# sourceMappingURL=BlackCoastThemeRewardRe.js.map
