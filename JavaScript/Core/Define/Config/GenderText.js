"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenderText = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GenderText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MaleText() {
    return this.maletext();
  }
  get FemaleText() {
    return this.femaletext();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsGenderText(t, e) {
    return (e || new GenderText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  maletext(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  femaletext(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.GenderText = GenderText;
//# sourceMappingURL=GenderText.js.map
