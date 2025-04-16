"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSynergyType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResSynergyType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SynergyTypeName() {
    return this.synergytypename();
  }
  __init(e, t) {
    return (this.z7 = e), (this.J7 = t), this;
  }
  static getRootAsRogueResSynergyType(e, t) {
    return (t || new RogueResSynergyType()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  id() {
    var e = this.J7.__offset(this.z7, 4);
    return e ? this.J7.readInt32(this.z7 + e) : 0;
  }
  synergytypename(e) {
    var t = this.J7.__offset(this.z7, 6),
      t = t ? this.J7.__string(this.z7 + t, e) : null;
    return (
      "string" == typeof t &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(t),
      t
    );
  }
}
exports.RogueResSynergyType = RogueResSynergyType;
//# sourceMappingURL=RogueResSynergyType.js.map
