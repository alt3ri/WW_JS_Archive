"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthDay = void 0);
class BirthDay {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get LimitYear() {
    return this.limityear();
  }
  get BirthDayCardItemId() {
    return this.birthdaycarditemid();
  }
  get BirthDayReward() {
    return this.birthdayreward();
  }
  get ValidDay() {
    return this.validday();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsBirthDay(t, i) {
    return (i || new BirthDay()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  limityear() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  birthdaycarditemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  birthdayreward() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  validday() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BirthDay = BirthDay;
//# sourceMappingURL=BirthDay.js.map
