"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBomb = void 0);
class FishingBomb {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ItemId() {
    return this.itemid();
  }
  get ExploreToolId() {
    return this.exploretoolid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingBomb(t, i) {
    return (i || new FishingBomb()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  exploretoolid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingBomb = FishingBomb;
//# sourceMappingURL=FishingBomb.js.map
