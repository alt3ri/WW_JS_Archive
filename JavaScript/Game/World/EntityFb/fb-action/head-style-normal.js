"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStyleNormal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleNormal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsHeadStyleNormal(t, e) {
    return (e || new HeadStyleNormal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsHeadStyleNormal(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new HeadStyleNormal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  whoId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startHeadStyleNormal(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addWhoId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endHeadStyleNormal(t) {
    return t.endObject();
  }
  static createHeadStyleNormal(t, e, a) {
    return (
      HeadStyleNormal.startHeadStyleNormal(t),
      HeadStyleNormal.addType(t, e),
      HeadStyleNormal.addWhoId(t, a),
      HeadStyleNormal.endHeadStyleNormal(t)
    );
  }
}
exports.HeadStyleNormal = HeadStyleNormal;
//# sourceMappingURL=head-style-normal.js.map
