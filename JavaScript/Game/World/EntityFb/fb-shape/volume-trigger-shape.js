"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VolumeTriggerShape = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VolumeTriggerShape {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsVolumeTriggerShape(e, r) {
    return (r || new VolumeTriggerShape()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsVolumeTriggerShape(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new VolumeTriggerShape()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  volumeKey(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  static startVolumeTriggerShape(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addVolumeKey(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static endVolumeTriggerShape(e) {
    return e.endObject();
  }
  static createVolumeTriggerShape(e, r, t) {
    return (
      VolumeTriggerShape.startVolumeTriggerShape(e),
      VolumeTriggerShape.addType(e, r),
      VolumeTriggerShape.addVolumeKey(e, t),
      VolumeTriggerShape.endVolumeTriggerShape(e)
    );
  }
}
exports.VolumeTriggerShape = VolumeTriggerShape;
//# sourceMappingURL=volume-trigger-shape.js.map
