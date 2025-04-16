"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityOwnerData = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityOwnerData {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Guid() {
    return this.guid();
  }
  get Owner() {
    return this.owner();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsEntityOwnerData(t, e) {
    return (e || new EntityOwnerData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  guid(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  owner(t) {
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
exports.EntityOwnerData = EntityOwnerData;
//# sourceMappingURL=EntityOwnerData.js.map
