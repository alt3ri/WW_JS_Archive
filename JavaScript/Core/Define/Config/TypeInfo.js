"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TypeInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TypeInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get Lock() {
    return this.lock();
  }
  get Deprecate() {
    return this.deprecate();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get ItemInfoDisplayType() {
    return this.iteminfodisplaytype();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsTypeInfo(t, e) {
    return (e || new TypeInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  typedescription(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  lock() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  deprecate() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  iteminfodisplaytype() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.TypeInfo = TypeInfo;
//# sourceMappingURL=TypeInfo.js.map
