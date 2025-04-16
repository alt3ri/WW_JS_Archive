"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffArea = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  buff_area_state_config_js_1 = require("../fb-component/buff-area-state-config.js");
class BuffArea {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBuffArea(t, e) {
    return (e || new BuffArea()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBuffArea(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BuffArea()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  buffConfigs(t, e) {
    var f = this.bb.__offset(this.bb_pos, 6);
    return f
      ? (e || new buff_area_state_config_js_1.BuffAreaStateConfig()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + f) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  buffConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startBuffArea(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBuffConfigs(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createBuffConfigsVector(e, f) {
    e.startVector(4, f.length, 4);
    for (let t = f.length - 1; 0 <= t; t--) e.addOffset(f[t]);
    return e.endVector();
  }
  static startBuffConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endBuffArea(t) {
    return t.endObject();
  }
  static createBuffArea(t, e, f) {
    return (
      BuffArea.startBuffArea(t),
      BuffArea.addType(t, e),
      BuffArea.addBuffConfigs(t, f),
      BuffArea.endBuffArea(t)
    );
  }
}
exports.BuffArea = BuffArea;
//# sourceMappingURL=buff-area.js.map
