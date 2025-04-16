"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityDirectionByEntityGravity = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionByEntityGravity {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGravityDirectionByEntityGravity(t, i) {
    return (i || new GravityDirectionByEntityGravity()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGravityDirectionByEntityGravity(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GravityDirectionByEntityGravity()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startGravityDirectionByEntityGravity(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endGravityDirectionByEntityGravity(t) {
    return t.endObject();
  }
  static createGravityDirectionByEntityGravity(t, i, r) {
    return (
      GravityDirectionByEntityGravity.startGravityDirectionByEntityGravity(t),
      GravityDirectionByEntityGravity.addType(t, i),
      GravityDirectionByEntityGravity.addEntityId(t, r),
      GravityDirectionByEntityGravity.endGravityDirectionByEntityGravity(t)
    );
  }
}
exports.GravityDirectionByEntityGravity = GravityDirectionByEntityGravity;
//# sourceMappingURL=gravity-direction-by-entity-gravity.js.map
