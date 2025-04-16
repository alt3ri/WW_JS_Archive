"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotographConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsPhotographConfig(t, o) {
    return (o || new PhotographConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhotographConfig(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new PhotographConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  photoTargets(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.readInt32(this.bb.__vector(this.bb_pos + o) + 4 * t) : 0;
  }
  photoTargetsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  photoTargetsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startPhotographConfig(t) {
    t.startObject(1);
  }
  static addPhotoTargets(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static createPhotoTargetsVector(o, r) {
    o.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) o.addInt32(r[t]);
    return o.endVector();
  }
  static startPhotoTargetsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endPhotographConfig(t) {
    return t.endObject();
  }
  static createPhotographConfig(t, o) {
    return (
      PhotographConfig.startPhotographConfig(t),
      PhotographConfig.addPhotoTargets(t, o),
      PhotographConfig.endPhotographConfig(t)
    );
  }
}
exports.PhotographConfig = PhotographConfig;
//# sourceMappingURL=photograph-config.js.map
