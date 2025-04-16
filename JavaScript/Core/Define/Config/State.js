"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.State = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class State {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get StateId() {
    return this.stateid();
  }
  get StateName() {
    return this.statename();
  }
  get CountryId() {
    return this.countryid();
  }
  get AudioName() {
    return this.audioname();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsState(t, e) {
    return (e || new State()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  statename(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  countryid(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  audioname(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.State = State;
//# sourceMappingURL=State.js.map
