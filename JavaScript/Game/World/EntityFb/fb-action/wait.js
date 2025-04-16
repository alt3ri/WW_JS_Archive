"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Wait = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Wait {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsWait(t, i) {
    return (i || new Wait()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWait(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new Wait()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  min() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  banInput() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startWait(t) {
    t.startObject(3);
  }
  static addMin(t, i) {
    t.addFieldFloat32(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addBanInput(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endWait(t) {
    return t.endObject();
  }
  static createWait(t, i, s, a) {
    return (
      Wait.startWait(t),
      Wait.addMin(t, i),
      Wait.addTime(t, s),
      Wait.addBanInput(t, a),
      Wait.endWait(t)
    );
  }
}
exports.Wait = Wait;
//# sourceMappingURL=wait.js.map
