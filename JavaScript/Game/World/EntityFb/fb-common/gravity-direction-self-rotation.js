"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityDirectionSelfRotation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionSelfRotation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGravityDirectionSelfRotation(t, i) {
    return (i || new GravityDirectionSelfRotation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGravityDirectionSelfRotation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GravityDirectionSelfRotation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startGravityDirectionSelfRotation(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endGravityDirectionSelfRotation(t) {
    return t.endObject();
  }
  static createGravityDirectionSelfRotation(t, i) {
    return (
      GravityDirectionSelfRotation.startGravityDirectionSelfRotation(t),
      GravityDirectionSelfRotation.addType(t, i),
      GravityDirectionSelfRotation.endGravityDirectionSelfRotation(t)
    );
  }
}
exports.GravityDirectionSelfRotation = GravityDirectionSelfRotation;
//# sourceMappingURL=gravity-direction-self-rotation.js.map
