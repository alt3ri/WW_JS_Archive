"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeEntityStateDirectly = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityStateDirectly {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeEntityStateDirectly(t, e) {
    return (e || new ChangeEntityStateDirectly()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeEntityStateDirectly(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeEntityStateDirectly()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  delayChange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startChangeEntityStateDirectly(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addDelayChange(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static endChangeEntityStateDirectly(t) {
    return t.endObject();
  }
  static createChangeEntityStateDirectly(t, e, i, a, r) {
    return (
      ChangeEntityStateDirectly.startChangeEntityStateDirectly(t),
      ChangeEntityStateDirectly.addType(t, e),
      ChangeEntityStateDirectly.addEntityId(t, i),
      ChangeEntityStateDirectly.addState(t, a),
      ChangeEntityStateDirectly.addDelayChange(t, r),
      ChangeEntityStateDirectly.endChangeEntityStateDirectly(t)
    );
  }
}
exports.ChangeEntityStateDirectly = ChangeEntityStateDirectly;
//# sourceMappingURL=change-entity-state-directly.js.map
