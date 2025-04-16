"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAttribute = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class SceneItemAttribute {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Description() {
    return this.description();
  }
  get CreatorId() {
    return this.creatorid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsSceneItemAttribute(t, e) {
    return (e || new SceneItemAttribute()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  description(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.SceneItemAttribute = SceneItemAttribute;
//# sourceMappingURL=SceneItemAttribute.js.map
