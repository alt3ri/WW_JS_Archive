"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityGravityConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js");
class EntityGravityConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityGravityConfig(t, i) {
    return (i || new EntityGravityConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityGravityConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityGravityConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  gravityDirectionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_gravity_direction_js_1.UnionGravityDirection.NONE;
  }
  gravityDirection(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  specifyGravityLoad() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  specifyGravityLock() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityGravityConfig(t) {
    t.startObject(4);
  }
  static addGravityDirectionType(t, i) {
    t.addFieldInt8(
      0,
      i,
      union_gravity_direction_js_1.UnionGravityDirection.NONE,
    );
  }
  static addGravityDirection(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSpecifyGravityLoad(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addSpecifyGravityLock(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endEntityGravityConfig(t) {
    return t.endObject();
  }
  static createEntityGravityConfig(t, i, r, n, a) {
    return (
      EntityGravityConfig.startEntityGravityConfig(t),
      EntityGravityConfig.addGravityDirectionType(t, i),
      EntityGravityConfig.addGravityDirection(t, r),
      EntityGravityConfig.addSpecifyGravityLoad(t, n),
      EntityGravityConfig.addSpecifyGravityLock(t, a),
      EntityGravityConfig.endEntityGravityConfig(t)
    );
  }
}
exports.EntityGravityConfig = EntityGravityConfig;
//# sourceMappingURL=entity-gravity-config.js.map
