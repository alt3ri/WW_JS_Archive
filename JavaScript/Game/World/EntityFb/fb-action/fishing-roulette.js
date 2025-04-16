"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoulette = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FishingRoulette {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFishingRoulette(t, e) {
    return (e || new FishingRoulette()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFishingRoulette(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FishingRoulette()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startFishingRoulette(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endFishingRoulette(t) {
    return t.endObject();
  }
  static createFishingRoulette(t, e) {
    return (
      FishingRoulette.startFishingRoulette(t),
      FishingRoulette.addType(t, e),
      FishingRoulette.endFishingRoulette(t)
    );
  }
}
exports.FishingRoulette = FishingRoulette;
//# sourceMappingURL=fishing-roulette.js.map
