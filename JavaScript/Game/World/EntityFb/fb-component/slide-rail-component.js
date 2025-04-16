"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SlideRailComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  exchange_slide_rail_config_js_1 = require("../fb-component/exchange-slide-rail-config.js");
class SlideRailComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsSlideRailComponent(i, t) {
    return (t || new SlideRailComponent()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsSlideRailComponent(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SlideRailComponent()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  disabled() {
    var i = this.bb.__offset(this.bb_pos, 4);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  slideSpeed() {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  railSplineEntityId() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.readInt32(this.bb_pos + i) : 0;
  }
  exchangeRailConfigs(i, t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (
          t || new exchange_slide_rail_config_js_1.ExchangeSlideRailConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * i),
          this.bb,
        )
      : void 0;
  }
  exchangeRailConfigsLength() {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
  }
  static startSlideRailComponent(i) {
    i.startObject(4);
  }
  static addDisabled(i, t) {
    i.addFieldInt8(0, +t, 0);
  }
  static addSlideSpeed(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addRailSplineEntityId(i, t) {
    i.addFieldInt32(2, t, 0);
  }
  static addExchangeRailConfigs(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static createExchangeRailConfigsVector(t, e) {
    t.startVector(4, e.length, 4);
    for (let i = e.length - 1; 0 <= i; i--) t.addOffset(e[i]);
    return t.endVector();
  }
  static startExchangeRailConfigsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endSlideRailComponent(i) {
    return i.endObject();
  }
  static createSlideRailComponent(i, t, e, n, s) {
    return (
      SlideRailComponent.startSlideRailComponent(i),
      SlideRailComponent.addDisabled(i, t),
      SlideRailComponent.addSlideSpeed(i, e),
      SlideRailComponent.addRailSplineEntityId(i, n),
      SlideRailComponent.addExchangeRailConfigs(i, s),
      SlideRailComponent.endSlideRailComponent(i)
    );
  }
}
exports.SlideRailComponent = SlideRailComponent;
//# sourceMappingURL=slide-rail-component.js.map
