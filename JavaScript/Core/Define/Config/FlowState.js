"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowState = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FlowState {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get StateKey() {
    return this.statekey();
  }
  get Id() {
    return this.id();
  }
  get KeepBgm() {
    return this.keepbgm();
  }
  get Pos() {
    return this.pos();
  }
  get Actions() {
    return this.actions();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFlowState(t, s) {
    return (s || new FlowState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  statekey(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  keepbgm() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  pos(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  actions(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.FlowState = FlowState;
//# sourceMappingURL=FlowState.js.map
