"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhysicsAssetConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhysicsAssetConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PhysicsAssetPath() {
    return this.physicsassetpath();
  }
  get BoneNames() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bonenamesLength(),
      this.bonenames,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsPhysicsAssetConfig(t, s) {
    return (s || new PhysicsAssetConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  physicsassetpath(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  GetBonenamesAt(t) {
    return this.bonenames(t);
  }
  bonenames(t, s) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  bonenamesLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.PhysicsAssetConfig = PhysicsAssetConfig;
//# sourceMappingURL=PhysicsAssetConfig.js.map
