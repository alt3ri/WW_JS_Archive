"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingManualRefresh = void 0);
class FishingManualRefresh {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EntrustPoolType() {
    return this.entrustpooltype();
  }
  get Star() {
    return this.star();
  }
  get RefreshCost() {
    return this.refreshcost();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsFishingManualRefresh(t, s) {
    return (s || new FishingManualRefresh()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entrustpooltype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  star() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  refreshcost() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.FishingManualRefresh = FishingManualRefresh;
//# sourceMappingURL=FishingManualRefresh.js.map
