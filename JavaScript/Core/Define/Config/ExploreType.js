"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ExploreType() {
    return this.exploretype();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get DescBg() {
    return this.descbg();
  }
  get LockDescId() {
    return this.lockdescid();
  }
  get DescId() {
    return this.descid();
  }
  get CountMode() {
    return this.countmode();
  }
  get SortIndex() {
    return this.sortindex();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsExploreType(t, e) {
    return (e || new ExploreType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  exploretype() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  descbg(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  lockdescid(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  descid(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  countmode() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.ExploreType = ExploreType;
//# sourceMappingURL=ExploreType.js.map
