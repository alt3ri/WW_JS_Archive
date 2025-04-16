"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueWeeklyBuffDesc = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueWeeklyBuffDesc {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffDsec() {
    return this.buffdsec();
  }
  get BuffDsecParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffdsecparamLength(),
      this.buffdsecparam,
      this,
    );
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueWeeklyBuffDesc(t, e) {
    return (e || new RogueWeeklyBuffDesc()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buffdsec(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetBuffdsecparamAt(t) {
    return this.buffdsecparam(t);
  }
  buffdsecparam(t, e) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  buffdsecparamLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RogueWeeklyBuffDesc = RogueWeeklyBuffDesc;
//# sourceMappingURL=RogueWeeklyBuffDesc.js.map
