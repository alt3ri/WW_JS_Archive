"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConsumptiveActivity = void 0);
class ConsumptiveActivity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsConsumptiveActivity(t, i) {
    return (i || new ConsumptiveActivity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ConsumptiveActivity = ConsumptiveActivity;
//# sourceMappingURL=ConsumptiveActivity.js.map
