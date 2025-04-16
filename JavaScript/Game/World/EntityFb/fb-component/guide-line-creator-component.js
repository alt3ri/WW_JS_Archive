"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideLineCreatorComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  guide_line_creator_scan_option_js_1 = require("../fb-component/guide-line-creator-scan-option.js"),
  union_color_change_strategy_of_spline_effect_js_1 = require("../fb-component/union-color-change-strategy-of-spline-effect.js");
class GuideLineCreatorComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGuideLineCreatorComponent(t, e) {
    return (e || new GuideLineCreatorComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGuideLineCreatorComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GuideLineCreatorComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  colorChangeOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_color_change_strategy_of_spline_effect_js_1
          .UnionColorChangeStrategyOfSplineEffect.NONE;
  }
  colorChangeOption(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  scanOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (
          t ||
          new guide_line_creator_scan_option_js_1.GuideLineCreatorScanOption()
        ).__init(this.bb.__indirect(this.bb_pos + e), this.bb)
      : void 0;
  }
  static startGuideLineCreatorComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addColorChangeOptionType(t, e) {
    t.addFieldInt8(
      1,
      e,
      union_color_change_strategy_of_spline_effect_js_1
        .UnionColorChangeStrategyOfSplineEffect.NONE,
    );
  }
  static addColorChangeOption(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSplineEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addScanOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endGuideLineCreatorComponent(t) {
    return t.endObject();
  }
}
exports.GuideLineCreatorComponent = GuideLineCreatorComponent;
//# sourceMappingURL=guide-line-creator-component.js.map
