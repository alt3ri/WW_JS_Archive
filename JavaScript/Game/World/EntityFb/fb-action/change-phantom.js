"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangePhantom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangePhantom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangePhantom(t, e) {
    return (e || new ChangePhantom()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangePhantom(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangePhantom()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startChangePhantom(t) {
    t.startObject(1);
  }
  static addId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangePhantom(t) {
    return t.endObject();
  }
  static createChangePhantom(t, e) {
    return (
      ChangePhantom.startChangePhantom(t),
      ChangePhantom.addId(t, e),
      ChangePhantom.endChangePhantom(t)
    );
  }
}
exports.ChangePhantom = ChangePhantom;
//# sourceMappingURL=change-phantom.js.map
