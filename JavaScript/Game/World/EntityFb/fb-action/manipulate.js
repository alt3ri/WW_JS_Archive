"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Manipulate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Manipulate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsManipulate(t, e) {
    return (e || new Manipulate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsManipulate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new Manipulate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  targetEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startManipulate(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endManipulate(t) {
    return t.endObject();
  }
  static createManipulate(t, e, a) {
    return (
      Manipulate.startManipulate(t),
      Manipulate.addType(t, e),
      Manipulate.addTargetEntityId(t, a),
      Manipulate.endManipulate(t)
    );
  }
}
exports.Manipulate = Manipulate;
//# sourceMappingURL=manipulate.js.map
