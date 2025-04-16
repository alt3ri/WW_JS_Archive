"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourPointLayerConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ParkourPointLayerConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsParkourPointLayerConfig(t, r) {
    return (r || new ParkourPointLayerConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsParkourPointLayerConfig(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ParkourPointLayerConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  width() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  length() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startParkourPointLayerConfig(t) {
    t.startObject(2);
  }
  static addWidth(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addLength(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endParkourPointLayerConfig(t) {
    return t.endObject();
  }
  static createParkourPointLayerConfig(t, r, i) {
    return (
      ParkourPointLayerConfig.startParkourPointLayerConfig(t),
      ParkourPointLayerConfig.addWidth(t, r),
      ParkourPointLayerConfig.addLength(t, i),
      ParkourPointLayerConfig.endParkourPointLayerConfig(t)
    );
  }
}
exports.ParkourPointLayerConfig = ParkourPointLayerConfig;
//# sourceMappingURL=parkour-point-layer-config.js.map
