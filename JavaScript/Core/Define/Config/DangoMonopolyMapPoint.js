"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyMapPoint = void 0);
class DangoMonopolyMapPoint {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get SortId() {
    return this.sortid();
  }
  get EntityId() {
    return this.entityid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsDangoMonopolyMapPoint(t, i) {
    return (i || new DangoMonopolyMapPoint()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entityid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DangoMonopolyMapPoint = DangoMonopolyMapPoint;
//# sourceMappingURL=DangoMonopolyMapPoint.js.map
