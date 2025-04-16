"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityLookAt = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class EntityLookAt {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityLookAt(t, i) {
    return (i || new EntityLookAt()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityLookAt(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityLookAt()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  pos(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  cameraMove() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityLookAt(t) {
    t.startObject(3);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addPos(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addCameraMove(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endEntityLookAt(t) {
    return t.endObject();
  }
}
exports.EntityLookAt = EntityLookAt;
//# sourceMappingURL=entity-look-at.js.map
