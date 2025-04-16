"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BubbleData = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BubbleData {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActionGuid() {
    return this.actionguid();
  }
  get Name() {
    return this.name();
  }
  get Async() {
    return this.async();
  }
  get Params() {
    return this.params();
  }
  get ActionId() {
    return this.actionid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsBubbleData(t, s) {
    return (s || new BubbleData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  actionguid(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  async() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  params(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  actionid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.BubbleData = BubbleData;
//# sourceMappingURL=BubbleData.js.map
