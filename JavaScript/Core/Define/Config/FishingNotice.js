"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingNotice = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingNotice {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get AlertCondition() {
    return this.alertcondition();
  }
  get FinishCondition() {
    return this.finishcondition();
  }
  get AlertTip() {
    return this.alerttip();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingNotice(t, i) {
    return (i || new FishingNotice()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  alertcondition() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  finishcondition() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  alerttip(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.FishingNotice = FishingNotice;
//# sourceMappingURL=FishingNotice.js.map
