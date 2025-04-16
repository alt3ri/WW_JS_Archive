"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementDamage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ElementDamage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsElementDamage(t, e) {
    return (e || new ElementDamage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsElementDamage(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ElementDamage()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  defaultValue() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  physics() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  ice() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  fire() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  thunder() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  wind() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  light() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  dark() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startElementDamage(t) {
    t.startObject(8);
  }
  static addDefaultValue(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addPhysics(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIce(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addFire(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addThunder(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addWind(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addLight(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addDark(t, e) {
    t.addFieldInt32(7, e, 0);
  }
  static endElementDamage(t) {
    return t.endObject();
  }
  static createElementDamage(t, e, a, s, i, r, h, n, m) {
    return (
      ElementDamage.startElementDamage(t),
      ElementDamage.addDefaultValue(t, e),
      ElementDamage.addPhysics(t, a),
      ElementDamage.addIce(t, s),
      ElementDamage.addFire(t, i),
      ElementDamage.addThunder(t, r),
      ElementDamage.addWind(t, h),
      ElementDamage.addLight(t, n),
      ElementDamage.addDark(t, m),
      ElementDamage.endElementDamage(t)
    );
  }
}
exports.ElementDamage = ElementDamage;
//# sourceMappingURL=element-damage.js.map
