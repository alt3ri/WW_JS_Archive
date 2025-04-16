"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploratoryTypeConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploratoryTypeConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Key() {
    return this.key();
  }
  get Name() {
    return this.name();
  }
  get BelongType() {
    return this.belongtype();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsExploratoryTypeConfig(t, e) {
    return (e || new ExploratoryTypeConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  key() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  belongtype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  desc(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.ExploratoryTypeConfig = ExploratoryTypeConfig;
//# sourceMappingURL=ExploratoryTypeConfig.js.map
