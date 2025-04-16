"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectAnimalPartsConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CollectAnimalPartsConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCollectAnimalPartsConfig(t, i) {
    return (i || new CollectAnimalPartsConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCollectAnimalPartsConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CollectAnimalPartsConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  slot() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  skeleton(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  collectEntity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCollectAnimalPartsConfig(t) {
    t.startObject(3);
  }
  static addSlot(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addSkeleton(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addCollectEntity(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCollectAnimalPartsConfig(t) {
    return t.endObject();
  }
  static createCollectAnimalPartsConfig(t, i, s, l) {
    return (
      CollectAnimalPartsConfig.startCollectAnimalPartsConfig(t),
      CollectAnimalPartsConfig.addSlot(t, i),
      CollectAnimalPartsConfig.addSkeleton(t, s),
      CollectAnimalPartsConfig.addCollectEntity(t, l),
      CollectAnimalPartsConfig.endCollectAnimalPartsConfig(t)
    );
  }
}
exports.CollectAnimalPartsConfig = CollectAnimalPartsConfig;
//# sourceMappingURL=collect-animal-parts-config.js.map
