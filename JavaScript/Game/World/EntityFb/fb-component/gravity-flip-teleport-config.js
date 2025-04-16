"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityFlipTeleportConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class GravityFlipTeleportConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsGravityFlipTeleportConfig(i, t) {
    return (t || new GravityFlipTeleportConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsGravityFlipTeleportConfig(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new GravityFlipTeleportConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  gravityDirectionType() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? this.bb.readUint8(this.bb_pos + i)
      : union_gravity_direction_js_1.UnionGravityDirection.NONE;
  }
  gravityDirection(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__union(i, this.bb_pos + t) : void 0;
  }
  safeLocation(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? (i || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + t),
          this.bb,
        )
      : void 0;
  }
  static startGravityFlipTeleportConfig(i) {
    i.startObject(3);
  }
  static addGravityDirectionType(i, t) {
    i.addFieldInt8(
      0,
      t,
      union_gravity_direction_js_1.UnionGravityDirection.NONE,
    );
  }
  static addGravityDirection(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addSafeLocation(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endGravityFlipTeleportConfig(i) {
    return i.endObject();
  }
}
exports.GravityFlipTeleportConfig = GravityFlipTeleportConfig;
//# sourceMappingURL=gravity-flip-teleport-config.js.map
