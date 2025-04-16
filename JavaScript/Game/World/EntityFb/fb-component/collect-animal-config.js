"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectAnimalConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  collect_animal_parts_config_js_1 = require("../fb-component/collect-animal-parts-config.js");
class CollectAnimalConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCollectAnimalConfig(t, i) {
    return (i || new CollectAnimalConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCollectAnimalConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CollectAnimalConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  partsMap(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (
          i || new collect_animal_parts_config_js_1.CollectAnimalPartsConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  partsMapLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startCollectAnimalConfig(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPartsMap(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPartsMapVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startPartsMapVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCollectAnimalConfig(t) {
    return t.endObject();
  }
  static createCollectAnimalConfig(t, i, e) {
    return (
      CollectAnimalConfig.startCollectAnimalConfig(t),
      CollectAnimalConfig.addType(t, i),
      CollectAnimalConfig.addPartsMap(t, e),
      CollectAnimalConfig.endCollectAnimalConfig(t)
    );
  }
}
exports.CollectAnimalConfig = CollectAnimalConfig;
//# sourceMappingURL=collect-animal-config.js.map
