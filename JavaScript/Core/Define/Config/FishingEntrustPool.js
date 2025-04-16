"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingEntrustPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingEntrustPool {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Priority() {
    return this.priority();
  }
  get NumLimit() {
    return this.numlimit();
  }
  get TotalCount() {
    return this.totalcount();
  }
  get TitleName() {
    return this.titlename();
  }
  get TitleSprite() {
    return this.titlesprite();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsFishingEntrustPool(t, i) {
    return (i || new FishingEntrustPool()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  numlimit() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  totalcount() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  titlename(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  titlesprite(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.FishingEntrustPool = FishingEntrustPool;
//# sourceMappingURL=FishingEntrustPool.js.map
