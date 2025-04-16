"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaViewTypeInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GachaViewTypeInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Type() {
    return this.type();
  }
  get TagText() {
    return this.tagtext();
  }
  get TagColor() {
    return this.tagcolor();
  }
  get TypeText() {
    return this.typetext();
  }
  get OptionalTitle() {
    return this.optionaltitle();
  }
  get OptionalDesc() {
    return this.optionaldesc();
  }
  get GachaButtonTip() {
    return this.gachabuttontip();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGachaViewTypeInfo(t, i) {
    return (i || new GachaViewTypeInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  type() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  tagtext(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  tagcolor(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  typetext(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  optionaltitle(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  optionaldesc(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  gachabuttontip(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.GachaViewTypeInfo = GachaViewTypeInfo;
//# sourceMappingURL=GachaViewTypeInfo.js.map
