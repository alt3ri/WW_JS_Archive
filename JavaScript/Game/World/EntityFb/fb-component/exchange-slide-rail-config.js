"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeSlideRailConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  next_slide_rail_js_1 = require("../fb-component/next-slide-rail.js");
class ExchangeSlideRailConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, e) {
    return (this.bb_pos = i), (this.bb = e), this;
  }
  static getRootAsExchangeSlideRailConfig(i, e) {
    return (e || new ExchangeSlideRailConfig()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsExchangeSlideRailConfig(i, e) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExchangeSlideRailConfig()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  maxExchangeDistance() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  nextRails(i, e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (e || new next_slide_rail_js_1.NextSlideRail()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + 4 * i),
          this.bb,
        )
      : void 0;
  }
  nextRailsLength() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  static startExchangeSlideRailConfig(i) {
    i.startObject(2);
  }
  static addMaxExchangeDistance(i, e) {
    i.addFieldInt32(0, e, 0);
  }
  static addNextRails(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static createNextRailsVector(e, t) {
    e.startVector(4, t.length, 4);
    for (let i = t.length - 1; 0 <= i; i--) e.addOffset(t[i]);
    return e.endVector();
  }
  static startNextRailsVector(i, e) {
    i.startVector(4, e, 4);
  }
  static endExchangeSlideRailConfig(i) {
    return i.endObject();
  }
  static createExchangeSlideRailConfig(i, e, t) {
    return (
      ExchangeSlideRailConfig.startExchangeSlideRailConfig(i),
      ExchangeSlideRailConfig.addMaxExchangeDistance(i, e),
      ExchangeSlideRailConfig.addNextRails(i, t),
      ExchangeSlideRailConfig.endExchangeSlideRailConfig(i)
    );
  }
}
exports.ExchangeSlideRailConfig = ExchangeSlideRailConfig;
//# sourceMappingURL=exchange-slide-rail-config.js.map
