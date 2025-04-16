"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapBorder = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MapBorder {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get BorderId() {
    return this.borderid();
  }
  get MapId() {
    return this.mapid();
  }
  get InstanceDungeonId() {
    return this.instancedungeonid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get instanceDungeonIdMapType() {
    return this.instancedungeonidmaptype();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMapBorder(t, i) {
    return (i || new MapBorder()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  borderid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instancedungeonid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  instancedungeonidmaptype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  prefabpath(t) {
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
exports.MapBorder = MapBorder;
//# sourceMappingURL=MapBorder.js.map
