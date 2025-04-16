"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PointGroupByLayer = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  parkour_point_layer_config_js_1 = require("../fb-component/parkour-point-layer-config.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PointGroupByLayer {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsPointGroupByLayer(t, r) {
    return (r || new PointGroupByLayer()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPointGroupByLayer(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new PointGroupByLayer()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  space(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + r),
          this.bb,
        )
      : void 0;
  }
  layers(t, r) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (
          r || new parkour_point_layer_config_js_1.ParkourPointLayerConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  layersLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPointGroupByLayer(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addSpace(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addLayers(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createLayersVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startLayersVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endPointGroupByLayer(t) {
    return t.endObject();
  }
}
exports.PointGroupByLayer = PointGroupByLayer;
//# sourceMappingURL=point-group-by-layer.js.map
