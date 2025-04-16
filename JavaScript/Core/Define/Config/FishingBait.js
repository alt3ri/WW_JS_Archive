"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBait = void 0);
class FishingBait {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ExploreToolId() {
    return this.exploretoolid();
  }
  get AreaId() {
    return this.areaid();
  }
  get GamePlayId() {
    return this.gameplayid();
  }
  get ItemId() {
    return this.itemid();
  }
  get CountLimit() {
    return this.countlimit();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingBait(t, i) {
    return (i || new FishingBait()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  exploretoolid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gameplayid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  countlimit() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingBait = FishingBait;
//# sourceMappingURL=FishingBait.js.map
