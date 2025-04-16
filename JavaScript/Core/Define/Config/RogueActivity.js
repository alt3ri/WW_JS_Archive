"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueActivity {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FunctionType() {
    return this.functiontype();
  }
  get FunctionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.functionparamsLength(),
      this.functionparams,
      this,
    );
  }
  get ActivityResource() {
    return this.activityresource();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRogueActivity(t, i) {
    return (i || new RogueActivity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  functiontype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFunctionparamsAt(t) {
    return this.functionparams(t);
  }
  functionparams(t, i) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  functionparamsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  activityresource(t) {
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
exports.RogueActivity = RogueActivity;
//# sourceMappingURL=RogueActivity.js.map
