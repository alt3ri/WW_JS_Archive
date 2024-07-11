"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapBorder = void 0);
class MapBorder {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get BorderId() {
    return this.borderid();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsMapBorder(t, r) {
    return (r || new MapBorder()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  borderid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  conditionid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  prefabpath(t) {
    const r = this.J7.__offset(this.z7, 8);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
}
exports.MapBorder = MapBorder;
// # sourceMappingURL=MapBorder.js.map
