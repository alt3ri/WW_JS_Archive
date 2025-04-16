"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderSpecifiedRangeComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_render_specified_range_config_js_1 = require("../fb-component/union-render-specified-range-config.js"),
  condition_group_js_1 = require("../fb-condition/condition-group.js");
class RenderSpecifiedRangeComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsRenderSpecifiedRangeComponent(e, i) {
    return (i || new RenderSpecifiedRangeComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRenderSpecifiedRangeComponent(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new RenderSpecifiedRangeComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  condition(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (e || new condition_group_js_1.ConditionGroup()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  renderConfigType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_render_specified_range_config_js_1.UnionRenderSpecifiedRangeConfig
          .NONE;
  }
  renderConfig(e) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(e, this.bb_pos + i) : void 0;
  }
  static startRenderSpecifiedRangeComponent(e) {
    e.startObject(4);
  }
  static addDisabled(e, i) {
    e.addFieldInt8(0, +i, 0);
  }
  static addCondition(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static addRenderConfigType(e, i) {
    e.addFieldInt8(
      2,
      i,
      union_render_specified_range_config_js_1.UnionRenderSpecifiedRangeConfig
        .NONE,
    );
  }
  static addRenderConfig(e, i) {
    e.addFieldOffset(3, i, 0);
  }
  static endRenderSpecifiedRangeComponent(e) {
    return e.endObject();
  }
}
exports.RenderSpecifiedRangeComponent = RenderSpecifiedRangeComponent;
//# sourceMappingURL=render-specified-range-component.js.map
