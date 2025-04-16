"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityFlipFixedPos = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityFlipFixedPos {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGravityFlipFixedPos(t, i) {
    return (i || new GravityFlipFixedPos()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGravityFlipFixedPos(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GravityFlipFixedPos()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  gravityAndPosEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startGravityFlipFixedPos(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addGravityAndPosEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endGravityFlipFixedPos(t) {
    return t.endObject();
  }
  static createGravityFlipFixedPos(t, i, s) {
    return (
      GravityFlipFixedPos.startGravityFlipFixedPos(t),
      GravityFlipFixedPos.addType(t, i),
      GravityFlipFixedPos.addGravityAndPosEntityId(t, s),
      GravityFlipFixedPos.endGravityFlipFixedPos(t)
    );
  }
}
exports.GravityFlipFixedPos = GravityFlipFixedPos;
//# sourceMappingURL=gravity-flip-fixed-pos.js.map
