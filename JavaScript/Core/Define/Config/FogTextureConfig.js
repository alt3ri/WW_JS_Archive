"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FogTextureConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FogTextureConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Block() {
    return this.block();
  }
  get MapId() {
    return this.mapid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get MapTilePath() {
    return this.maptilepath();
  }
  get MiniMapTilePath() {
    return this.minimaptilepath();
  }
  get HdMapTilePath() {
    return this.hdmaptilepath();
  }
  get FogTilePath() {
    return this.fogtilepath();
  }
  get MiniFogTilePath() {
    return this.minifogtilepath();
  }
  get SubMapGroupId() {
    return this.submapgroupid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFogTextureConfig(t, i) {
    return (i || new FogTextureConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  block(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 8;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  maptilepath(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  minimaptilepath(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  hdmaptilepath(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  fogtilepath(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  minifogtilepath(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  submapgroupid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FogTextureConfig = FogTextureConfig;
//# sourceMappingURL=FogTextureConfig.js.map
