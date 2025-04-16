"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyPropertyType = void 0);
class DangoMonopolyPropertyType {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get PropertyType() {
    return this.propertytype();
  }
  get TriggerType() {
    return this.triggertype();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsDangoMonopolyPropertyType(t, r) {
    return (r || new DangoMonopolyPropertyType()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  propertytype() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  triggertype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DangoMonopolyPropertyType = DangoMonopolyPropertyType;
//# sourceMappingURL=DangoMonopolyPropertyType.js.map
